"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const DEBT_COLLECTION_CATEGORY_NAME = 'Thu nợ';
async function main() {
    console.log('🔍 Đang tìm DebtPayment chưa có Transaction tương ứng...');
    const category = await prisma.category.upsert({
        where: { name: DEBT_COLLECTION_CATEGORY_NAME },
        update: {},
        create: {
            name: DEBT_COLLECTION_CATEGORY_NAME,
            type: client_1.CategoryType.INCOME,
            isSystem: true,
        },
    });
    const payments = await prisma.debtPayment.findMany({
        include: { debt: true },
    });
    const existingTx = await prisma.transaction.findMany({
        where: { categoryId: category.id },
        select: { amount: true, transactionDate: true, customerId: true },
    });
    const existingKey = (amount, date, customerId) => `${amount}|${date.toISOString()}|${customerId ?? ''}`;
    const existingSet = new Set(existingTx.map((t) => existingKey(Number(t.amount), t.transactionDate, t.customerId)));
    let created = 0;
    let skipped = 0;
    for (const p of payments) {
        const key = existingKey(Number(p.amount), p.paymentDate, p.debt.customerId);
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
//# sourceMappingURL=backfill-debt-payment-transactions.js.map