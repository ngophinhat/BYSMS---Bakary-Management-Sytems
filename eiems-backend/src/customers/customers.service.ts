import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';

const LIST_CACHE_KEY = 'customers:list';
const LIST_CACHE_TTL = 60; // giây — list khách hàng không đổi liên tục
const DETAIL_CACHE_PREFIX = 'customers:detail:';
const DETAIL_CACHE_TTL = 120; // giây

@Injectable()
export class CustomersService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}

  async create(data: { name: string; phone: string; address?: string }) {
    const customer = await this.prisma.customer.create({
      data: {
        name: data.name,
        phone: data.phone,
        address: data.address,
      },
    });

    // Danh sách vừa thay đổi -> xoá cache list để lần GET sau lấy data mới
    await this.redis.del(LIST_CACHE_KEY);

    return customer;
  }

  async findAll() {
    const cached = await this.redis.get(LIST_CACHE_KEY);
    if (cached) return cached;

    const customers = await this.prisma.customer.findMany({
      include: {
        _count: {
          select: { transactions: true, debts: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    await this.redis.set(LIST_CACHE_KEY, customers, LIST_CACHE_TTL);
    return customers;
  }

  async findOne(id: string) {
    const cacheKey = `${DETAIL_CACHE_PREFIX}${id}`;
    const cached = await this.redis.get(cacheKey);
    if (cached) return cached;

    const customer = await this.prisma.customer.findUnique({
      where: { id },
      include: {
        transactions: {
          where: { isArchived: false },
          include: {
            category: true,
            createdBy: {
              select: { id: true, fullName: true },
            },
          },
          orderBy: { transactionDate: 'desc' },
        },
        debts: {
          include: {
            payments: true,
          },
        },
        _count: {
          select: { transactions: true, debts: true },
        },
      },
    });

    if (!customer) {
      throw new NotFoundException(`Không tìm thấy khách hàng với id: ${id}`);
    }

    await this.redis.set(cacheKey, customer, DETAIL_CACHE_TTL);
    return customer;
  }

  async update(
    id: string,
    data: { name?: string; phone?: string; address?: string },
  ) {
    await this.findOne(id);
    const updated = await this.prisma.customer.update({
      where: { id },
      data,
    });

    // Dữ liệu khách hàng này vừa đổi -> xoá cache detail + list liên quan
    await this.redis.del(`${DETAIL_CACHE_PREFIX}${id}`);
    await this.redis.del(LIST_CACHE_KEY);

    return updated;
  }

  async getDebtSummary(customerId: string) {
    const debts = await this.prisma.debt.findMany({
      where: { customerId },
    });

    const totalDebt = debts.reduce((sum, d) => sum + Number(d.totalAmount), 0);
    const remainingDebt = debts.reduce(
      (sum, d) => sum + Number(d.remainingAmount),
      0,
    );
    const totalPaid = totalDebt - remainingDebt;

    return { totalDebt, totalPaid, remainingDebt };
  }
}
