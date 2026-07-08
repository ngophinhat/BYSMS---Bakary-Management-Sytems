/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';

const LIST_CACHE_KEY = 'debts:list';
const LIST_CACHE_TTL = 60; // giây
const DETAIL_CACHE_PREFIX = 'debts:detail:';
const DETAIL_CACHE_TTL = 60; // giây
const OVERDUE_CACHE_KEY = 'debts:overdue';
const OVERDUE_CACHE_TTL = 30; // giây — nhạy thời gian hơn nên TTL ngắn hơn

@Injectable()
export class DebtsService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}

  /** Xoá toàn bộ cache liên quan sau khi dữ liệu công nợ thay đổi. */
  private async invalidateCache(debtId?: string) {
    await this.redis.del(LIST_CACHE_KEY);
    await this.redis.del(OVERDUE_CACHE_KEY);
    if (debtId) {
      await this.redis.del(`${DETAIL_CACHE_PREFIX}${debtId}`);
    }
  }

  async create(data: {
    totalAmount: number;
    customerId: string;
    dueDate?: Date;
  }) {
    const debt = await this.prisma.debt.create({
      data: {
        totalAmount: data.totalAmount,
        remainingAmount: data.totalAmount,
        customerId: data.customerId,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
      },
    });

    await this.invalidateCache();
    return debt;
  }

  async findAll() {
    const cached = await this.redis.get(LIST_CACHE_KEY);
    if (cached) return cached;

    const debts = await this.prisma.debt.findMany({
      include: {
        customer: true,
        payments: {
          include: {
            receivedBy: {
              select: { id: true, fullName: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
      // Sort: UNPAID → PARTIAL lên đầu, trong mỗi nhóm sort theo updatedAt mới nhất
      orderBy: [{ status: 'asc' }, { updatedAt: 'desc' }],
    });

    await this.redis.set(LIST_CACHE_KEY, debts, LIST_CACHE_TTL);
    return debts;
  }

  async findOne(id: string) {
    const cacheKey = `${DETAIL_CACHE_PREFIX}${id}`;
    const cached = await this.redis.get(cacheKey);
    if (cached) return cached;

    const debt = await this.prisma.debt.findUnique({
      where: { id },
      include: {
        customer: true,
        payments: {
          select: {
            id: true,
            amount: true,
            paymentDate: true,
            note: true, // ← thêm note
            createdAt: true,
            receivedBy: {
              select: { id: true, fullName: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!debt) throw new NotFoundException('Không tìm thấy công nợ!');

    await this.redis.set(cacheKey, debt, DETAIL_CACHE_TTL);
    return debt;
  }

  async getOverdueDebts() {
    const cached = await this.redis.get(OVERDUE_CACHE_KEY);
    if (cached) return cached;

    const debts = await this.prisma.debt.findMany({
      where: {
        dueDate: { not: null, lt: new Date() },
        remainingAmount: { gt: 0 },
      },
      include: { customer: true },
    });
    const result = debts.map((debt) => {
      const overdueDate = Math.floor(
        (new Date().getTime() - new Date(debt.dueDate!).getTime()) /
          (1000 * 60 * 60 * 24),
      );
      return { ...debt, overdueDate };
    });

    await this.redis.set(OVERDUE_CACHE_KEY, result, OVERDUE_CACHE_TTL);
    return result;
  }

  async update(id: string, data: any) {
    if (data.dueDate) {
      data.dueDate = new Date(data.dueDate);
    }
    const updated = await this.prisma.debt.update({
      where: { id },
      data: data,
    });

    await this.invalidateCache(id);
    return updated;
  }

  async remove(id: string) {
    const removed = await this.prisma.debt.delete({ where: { id } });
    await this.invalidateCache(id);
    return removed;
  }
}
