import {
  PrismaClient,
  CakeCategory,
  CakeShape,
  CakeSize,
  AgeGroup,
  Role,
  CategoryType,
  // OrderStatus,
  // PaymentStatus,
  // PaymentMethod,
  // TransactionType,
  // DebtStatus,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const makeDate = (year: number, month: number, day: number, hour = 8) =>
  new Date(year, month - 1, day, hour, 0, 0, 0);

// ─── USERS ────────────────────────────────────────────────────────────────────
async function seedUsers() {
  console.log('👤 Seeding users...');
  const password = await bcrypt.hash('123456', 10);
  const users = [
    {
      fullName: 'Nguyễn Thị Chủ',
      email: 'owner@tiembanh.vn',
      password,
      role: Role.OWNER,
    },
    {
      fullName: 'Trần Văn Admin',
      email: 'admin@tiembanh.vn',
      password,
      role: Role.ADMIN,
    },
    {
      fullName: 'Lê Thị Kế Toán',
      email: 'ketoan@tiembanh.vn',
      password,
      role: Role.ACCOUNTANT,
    },
    {
      fullName: 'Phạm Thị Nhân Viên',
      email: 'nhanvien1@tiembanh.vn',
      password,
      role: Role.STAFF,
    },
  ];
  for (const u of users)
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: u,
    });
  console.log(`  ✅ ${users.length} users`);
}

// ─── CATEGORIES ───────────────────────────────────────────────────────────────
async function seedCategories() {
  console.log('📂 Seeding categories...');
  const categories: { name: string; type: CategoryType; isSystem: boolean }[] =
    [
      { name: 'Sinh nhật rau câu', type: CategoryType.INCOME, isSystem: true },
      { name: 'Bánh bò', type: CategoryType.INCOME, isSystem: true },
      { name: 'Bánh ăn', type: CategoryType.INCOME, isSystem: true },
      { name: 'Cúng ông Táo', type: CategoryType.INCOME, isSystem: true },
      { name: 'Tết', type: CategoryType.INCOME, isSystem: true },
      { name: 'Lễ', type: CategoryType.INCOME, isSystem: true },
      { name: 'Thôi nôi', type: CategoryType.INCOME, isSystem: true },
      { name: 'Plan', type: CategoryType.INCOME, isSystem: true },
      { name: 'Dừa', type: CategoryType.EXPENSE, isSystem: false },
      { name: 'Bí', type: CategoryType.EXPENSE, isSystem: false },
      { name: 'Nhãn', type: CategoryType.EXPENSE, isSystem: false },
      { name: 'Trứng', type: CategoryType.EXPENSE, isSystem: false },
      { name: 'Đường', type: CategoryType.EXPENSE, isSystem: false },
      { name: 'Sữa', type: CategoryType.EXPENSE, isSystem: false },
      { name: 'Màu', type: CategoryType.EXPENSE, isSystem: false },
      { name: 'Gas', type: CategoryType.EXPENSE, isSystem: false },
      { name: 'RCT', type: CategoryType.EXPENSE, isSystem: false },
      { name: 'ST', type: CategoryType.EXPENSE, isSystem: false },
      { name: 'Hộp', type: CategoryType.EXPENSE, isSystem: false },
      { name: 'Trang trí / Nến', type: CategoryType.EXPENSE, isSystem: false },
      { name: 'PK (Phụ kiện)', type: CategoryType.EXPENSE, isSystem: false },
      { name: 'Ship', type: CategoryType.EXPENSE, isSystem: false },
      { name: 'Lương nhân viên', type: CategoryType.EXPENSE, isSystem: false },
      { name: 'Điện nước', type: CategoryType.EXPENSE, isSystem: false },
    ];
  for (const cat of categories)
    await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    });
  console.log(`  ✅ ${categories.length} categories`);
}

// ─── CAKE PRODUCTS ────────────────────────────────────────────────────────────
async function seedCakeProducts() {
  console.log('🎂 Seeding cake products...');
  await prisma.cakePrice.deleteMany();
  await prisma.cakeProduct.deleteMany();

  const birthdayPrices: Record<string, Record<string, number>> = {
    SQUARE: { SIZE_16: 180000, SIZE_20: 200000, SIZE_24: 220000 },
    ROUND: { SIZE_16: 140000, SIZE_20: 160000, SIZE_24: 180000 },
    HEART: { SIZE_16: 140000, SIZE_20: 160000, SIZE_24: 180000 },
  };
  const shapeLabel: Record<string, string> = {
    ROUND: 'Tròn',
    HEART: 'Tim',
    SQUARE: 'Vuông',
  };
  const sizeLabel: Record<string, string> = {
    SIZE_16: 'Size 16',
    SIZE_20: 'Size 20',
    SIZE_24: 'Size 24',
  };
  const ageLabel: Record<string, string> = {
    CHILD: 'Trẻ con',
    ADULT: 'Người lớn',
    ELDERLY: 'Người cao tuổi',
  };

  let bdCount = 0;
  for (const shape of [CakeShape.ROUND, CakeShape.HEART, CakeShape.SQUARE])
    for (const size of [CakeSize.SIZE_16, CakeSize.SIZE_20, CakeSize.SIZE_24])
      for (const ageGroup of [
        AgeGroup.CHILD,
        AgeGroup.ADULT,
        AgeGroup.ELDERLY,
      ]) {
        await prisma.cakeProduct.create({
          data: {
            category: CakeCategory.BIRTHDAY,
            name: `Sinh nhật rau câu ${shapeLabel[shape]} ${sizeLabel[size]} - ${ageLabel[ageGroup]}`,
            shape,
            size,
            ageGroup,
            isPriceManual: false,
            isActive: true,
            prices: {
              create: [{ shape, size, price: birthdayPrices[shape][size] }],
            },
          },
        });
        bdCount++;
      }

  for (const [sn, p, d] of [
    [1, 90000, 'Set cúng ông Táo cơ bản'],
    [2, 110000, 'Set cúng ông Táo đầy đủ'],
  ] as [number, number, string][])
    await prisma.cakeProduct.create({
      data: {
        category: CakeCategory.ONG_TAO,
        name: `Cúng ông Táo - Set ${sn}`,
        setNumber: sn,
        isPriceManual: false,
        isActive: true,
        description: d,
        prices: { create: [{ price: p }] },
      },
    });
  for (const [sn, p, d] of [
    [1, 85000, 'Set bánh Tết cơ bản'],
    [2, 95000, 'Set bánh Tết đầy đủ'],
  ] as [number, number, string][])
    await prisma.cakeProduct.create({
      data: {
        category: CakeCategory.TET,
        name: `Tết - Set ${sn}`,
        setNumber: sn,
        isPriceManual: false,
        isActive: true,
        description: d,
        prices: { create: [{ price: p }] },
      },
    });
  for (const [sn, p, d] of [
    [1, 130000, 'Bánh sinh nhật rau câu dùng cho lễ'],
    [2, 75000, 'Set bánh lễ nhỏ'],
  ] as [number, number, string][])
    await prisma.cakeProduct.create({
      data: {
        category: CakeCategory.LE,
        name: `Lễ - Set ${sn}`,
        setNumber: sn,
        isPriceManual: false,
        isActive: true,
        description: d,
        prices: { create: [{ price: p }] },
      },
    });
  await prisma.cakeProduct.create({
    data: {
      category: CakeCategory.THOI_NOI,
      name: 'Thôi nôi - 12 cái',
      setNumber: 1,
      setQuantity: 12,
      isPriceManual: false,
      isActive: true,
      description: 'Set bánh thôi nôi 12 cái',
      prices: { create: [{ price: 85000 }] },
    },
  });
  await prisma.cakeProduct.create({
    data: {
      category: CakeCategory.PLAN,
      name: 'Plan - 10 cái',
      setNumber: 1,
      setQuantity: 10,
      isPriceManual: false,
      isActive: true,
      description: 'Set bánh plan 10 cái',
      prices: { create: [{ price: 70000 }] },
    },
  });
  await prisma.cakeProduct.create({
    data: {
      category: CakeCategory.BANH_BO,
      name: 'Bánh bò',
      isPriceManual: false,
      isActive: true,
      description: 'theo cái',
      prices: { create: [{ price: 70000 }] },
    },
  });
  for (const [n, p] of [
    ['Bánh ăn loại 1', 50000],
    ['Bánh ăn loại 2', 60000],
    ['Bánh ăn loại 3', 70000],
  ] as [string, number][])
    await prisma.cakeProduct.create({
      data: {
        category: CakeCategory.BANH_AN,
        name: n,
        isPriceManual: false,
        isActive: true,
        description: 'Giá tính theo cái',
        prices: { create: [{ price: p }] },
      },
    });

  console.log(
    `  ✅ Sinh nhật: ${bdCount} | Tổng: ${await prisma.cakeProduct.count()} sản phẩm`,
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n🚀 Bắt đầu seed EIEMS Bakery...\n');
  console.log('🗑️  Clearing old data...');
  await prisma.notification.deleteMany();
  await prisma.salesOrder.deleteMany();
  await prisma.debtPayment.deleteMany();
  await prisma.debt.deleteMany();
  await prisma.transactionLog.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.cakePrice.deleteMany();
  await prisma.cakeProduct.deleteMany();
  await prisma.category.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.user.deleteMany();

  await seedUsers();
  // await seedCustomers();
  await seedCategories();
  await seedCakeProducts();
  // await seedYearData();

  console.log('\n🎉 Seed hoàn tất!\n');
  console.log('📋 Tài khoản (password: 123456):');
  console.log('   OWNER      → owner@tiembanh.vn');
  console.log('   ADMIN      → admin@tiembanh.vn');
  console.log('   ACCOUNTANT → ketoan@tiembanh.vn');
  console.log('   STAFF      → nhanvien1@tiembanh.vn / nhanvien2@tiembanh.vn');
}

main()
  .catch((e) => {
    console.error('❌ Seed thất bại:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
