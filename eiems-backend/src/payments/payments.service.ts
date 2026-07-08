import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { DebtStatus, CategoryType } from '@prisma/client';

const DEBT_COLLECTION_CATEGORY_NAME = 'Thu nợ';

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}

  /**
   * Lấy (hoặc tạo nếu chưa có) category hệ thống "Thu nợ" dùng để
   * gắn vào Transaction mỗi khi khách trả nợ, để tiền này được
   * tính vào báo cáo doanh thu.
   */
  private async getOrCreateDebtCollectionCategory() {
    return this.prisma.category.upsert({
      where: { name: DEBT_COLLECTION_CATEGORY_NAME },
      update: {},
      create: {
        name: DEBT_COLLECTION_CATEGORY_NAME,
        type: CategoryType.INCOME,
        isSystem: true,
      },
    });
  }

  async createPayment(
    debtId: string,
    amount: number,
    receivedById: string,
    note?: string,
    paymentDate?: Date,
  ) {
    const debt = await this.prisma.debt.findUnique({
      where: { id: debtId },
    });

    if (!debt) {
      throw new NotFoundException('Không tìm thấy công nợ!');
    }

    if (debt.status === DebtStatus.PAID) {
      throw new BadRequestException('Công nợ này đã được tất toán!');
    }

    const remaining = Number(debt.remainingAmount);

    if (amount > remaining) {
      throw new BadRequestException(
        `Số tiền thanh toán (${amount}) vượt quá số nợ còn lại (${remaining})!`,
      );
    }

    const newRemaining = remaining - amount;
    const status: DebtStatus =
      newRemaining === 0 ? DebtStatus.PAID : DebtStatus.PARTIAL;
    const effectiveDate = paymentDate ?? new Date();

    const category = await this.getOrCreateDebtCollectionCategory();

    // Gộp 3 thao tác vào 1 transaction DB để đảm bảo toàn vẹn dữ liệu:
    // nếu 1 bước lỗi thì rollback hết, tránh trường hợp trừ nợ xong
    // mà báo cáo doanh thu lại thiếu (hoặc ngược lại).
    const [payment] = await this.prisma.$transaction([
      this.prisma.debtPayment.create({
        data: {
          amount,
          debtId,
          paymentDate: effectiveDate,
          receivedById,
          note,
        },
      }),
      this.prisma.debt.update({
        where: { id: debtId },
        data: {
          remainingAmount: newRemaining,
          status,
        },
      }),
      this.prisma.transaction.create({
        data: {
          type: 'INCOME',
          amount,
          note: note ? `Thu nợ: ${note}` : 'Thu nợ',
          transactionDate: effectiveDate,
          categoryId: category.id,
          createdById: receivedById,
          customerId: debt.customerId,
        },
      }),
    ]);

    // Trạng thái công nợ vừa đổi -> xoá cache liên quan để trang
    // "Công nợ" và "Khách hàng" hiển thị đúng ngay lần load kế tiếp.
    await this.redis.del('debts:list');
    await this.redis.del('debts:overdue');
    await this.redis.del(`debts:detail:${debtId}`);
    if (debt.customerId) {
      await this.redis.del(`customers:detail:${debt.customerId}`);
      await this.redis.del('customers:list');
    }

    return payment;
  }

  async getPaymentsByDebt(debtId: string) {
    return this.prisma.debtPayment.findMany({
      where: { debtId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
