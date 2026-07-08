/**
 * Script backfill: tạo Transaction (INCOME) cho các DebtPayment đã tồn tại
 * TRƯỚC khi fix đồng bộ báo cáo doanh thu <-> công nợ được áp dụng.
 *
 * CHẠY 1 LẦN DUY NHẤT sau khi deploy fix, KHÔNG chạy lại nhiều lần
 * (sẽ bị tính doanh thu 2 lần / trùng lặp).
 *
 * Cách chạy:
 *   npx ts-node prisma/backfill-debt-payment-transactions.ts
 */
import { PrismaClient, CategoryType } from '@prisma/client';

const prisma = new PrismaClient();

const DEBT_COLLECTION_CATEGORY_NAME = 'Thu nợ';

async function main() {
  console.log('🔍 Đang tìm DebtPayment chưa có Transaction tương ứng...');

  const category = await prisma.category.upsert({
    where: { name: DEBT_COLLECTION_CATEGORY_NAME },
    update: {},
    create: {
      name: DEBT_COLLECTION_CATEGORY_NAME,
      type: CategoryType.INCOME,
      isSystem: true,
    },
  });

  const payments = await prisma.debtPayment.findMany({
    include: { debt: true },
  });

  // Lấy toàn bộ transaction của category "Thu nợ" để so khớp,
  // tránh backfill trùng nếu script bị chạy nhầm lần 2.
  const existingTx = await prisma.transaction.findMany({
    where: { categoryId: category.id },
    select: { amount: true, transactionDate: true, customerId: true },
  });

  const existingKey = (amount: number, date: Date, customerId: string | null) =>
    `${amount}|${date.toISOString()}|${customerId ?? ''}`;

  const existingSet = new Set(
    existingTx.map((t) =>
      existingKey(Number(t.amount), t.transactionDate, t.customerId),
    ),
  );

  let created = 0;
  let skipped = 0;

  for (const p of payments) {
    const key = existingKey(
      Number(p.amount),
      p.paymentDate,
      p.debt.customerId,
    );

    if (existingSet.has(key)) {
      skipped++;
      continue;
    }

    await prisma.transaction.create({
      data: {
        type: 'INCOME',
        amount: p.amount,
        note: p.note ? `Thu nợ (backfill): ${p.note}` : 'Thu nợ (backfill)',
        transactionDate: p.paymentDate,
        categoryId: category.id,
        createdById: p.receivedById,
        customerId: p.debt.customerId,
      },
    });
    created++;
  }

  console.log(`✅ Đã tạo ${created} transaction mới, bỏ qua ${skipped} (đã tồn tại).`);
}

main()
  .catch((e) => {
    console.error('❌ Backfill thất bại:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
