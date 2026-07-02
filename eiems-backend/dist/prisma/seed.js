"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const makeDate = (year, month, day, hour = 8) => new Date(year, month - 1, day, hour, 0, 0, 0);
async function seedUsers() {
    console.log('👤 Seeding users...');
    const password = await bcrypt.hash('123456', 10);
    const users = [
        {
            fullName: 'Nguyễn Thị Chủ',
            email: 'owner@tiembanh.vn',
            password,
            role: client_1.Role.OWNER,
        },
        {
            fullName: 'Trần Văn Admin',
            email: 'admin@tiembanh.vn',
            password,
            role: client_1.Role.ADMIN,
        },
        {
            fullName: 'Lê Thị Kế Toán',
            email: 'ketoan@tiembanh.vn',
            password,
            role: client_1.Role.ACCOUNTANT,
        },
        {
            fullName: 'Phạm Thị Nhân Viên',
            email: 'nhanvien1@tiembanh.vn',
            password,
            role: client_1.Role.STAFF,
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
async function seedCategories() {
    console.log('📂 Seeding categories...');
    const categories = [
        { name: 'Sinh nhật rau câu', type: client_1.CategoryType.INCOME, isSystem: true },
        { name: 'Bánh bò', type: client_1.CategoryType.INCOME, isSystem: true },
        { name: 'Bánh ăn', type: client_1.CategoryType.INCOME, isSystem: true },
        { name: 'Cúng ông Táo', type: client_1.CategoryType.INCOME, isSystem: true },
        { name: 'Tết', type: client_1.CategoryType.INCOME, isSystem: true },
        { name: 'Lễ', type: client_1.CategoryType.INCOME, isSystem: true },
        { name: 'Thôi nôi', type: client_1.CategoryType.INCOME, isSystem: true },
        { name: 'Plan', type: client_1.CategoryType.INCOME, isSystem: true },
        { name: 'Dừa', type: client_1.CategoryType.EXPENSE, isSystem: false },
        { name: 'Bí', type: client_1.CategoryType.EXPENSE, isSystem: false },
        { name: 'Nhãn', type: client_1.CategoryType.EXPENSE, isSystem: false },
        { name: 'Trứng', type: client_1.CategoryType.EXPENSE, isSystem: false },
        { name: 'Đường', type: client_1.CategoryType.EXPENSE, isSystem: false },
        { name: 'Sữa', type: client_1.CategoryType.EXPENSE, isSystem: false },
        { name: 'Màu', type: client_1.CategoryType.EXPENSE, isSystem: false },
        { name: 'Gas', type: client_1.CategoryType.EXPENSE, isSystem: false },
        { name: 'RCT', type: client_1.CategoryType.EXPENSE, isSystem: false },
        { name: 'ST', type: client_1.CategoryType.EXPENSE, isSystem: false },
        { name: 'Hộp', type: client_1.CategoryType.EXPENSE, isSystem: false },
        { name: 'Trang trí / Nến', type: client_1.CategoryType.EXPENSE, isSystem: false },
        { name: 'PK (Phụ kiện)', type: client_1.CategoryType.EXPENSE, isSystem: false },
        { name: 'Ship', type: client_1.CategoryType.EXPENSE, isSystem: false },
        { name: 'Lương nhân viên', type: client_1.CategoryType.EXPENSE, isSystem: false },
        { name: 'Điện nước', type: client_1.CategoryType.EXPENSE, isSystem: false },
    ];
    for (const cat of categories)
        await prisma.category.upsert({
            where: { name: cat.name },
            update: {},
            create: cat,
        });
    console.log(`  ✅ ${categories.length} categories`);
}
async function seedCakeProducts() {
    console.log('🎂 Seeding cake products...');
    await prisma.cakePrice.deleteMany();
    await prisma.cakeProduct.deleteMany();
    const birthdayPrices = {
        SQUARE: { SIZE_16: 180000, SIZE_20: 200000, SIZE_24: 220000 },
        ROUND: { SIZE_16: 140000, SIZE_20: 160000, SIZE_24: 180000 },
        HEART: { SIZE_16: 140000, SIZE_20: 160000, SIZE_24: 180000 },
    };
    const shapeLabel = {
        ROUND: 'Tròn',
        HEART: 'Tim',
        SQUARE: 'Vuông',
    };
    const sizeLabel = {
        SIZE_16: 'Size 16',
        SIZE_20: 'Size 20',
        SIZE_24: 'Size 24',
    };
    const ageLabel = {
        CHILD: 'Trẻ con',
        ADULT: 'Người lớn',
        ELDERLY: 'Người cao tuổi',
    };
    let bdCount = 0;
    for (const shape of [client_1.CakeShape.ROUND, client_1.CakeShape.HEART, client_1.CakeShape.SQUARE])
        for (const size of [client_1.CakeSize.SIZE_16, client_1.CakeSize.SIZE_20, client_1.CakeSize.SIZE_24])
            for (const ageGroup of [
                client_1.AgeGroup.CHILD,
                client_1.AgeGroup.ADULT,
                client_1.AgeGroup.ELDERLY,
            ]) {
                await prisma.cakeProduct.create({
                    data: {
                        category: client_1.CakeCategory.BIRTHDAY,
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
    ])
        await prisma.cakeProduct.create({
            data: {
                category: client_1.CakeCategory.ONG_TAO,
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
    ])
        await prisma.cakeProduct.create({
            data: {
                category: client_1.CakeCategory.TET,
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
    ])
        await prisma.cakeProduct.create({
            data: {
                category: client_1.CakeCategory.LE,
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
            category: client_1.CakeCategory.THOI_NOI,
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
            category: client_1.CakeCategory.PLAN,
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
            category: client_1.CakeCategory.BANH_BO,
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
    ])
        await prisma.cakeProduct.create({
            data: {
                category: client_1.CakeCategory.BANH_AN,
                name: n,
                isPriceManual: false,
                isActive: true,
                description: 'Giá tính theo cái',
                prices: { create: [{ price: p }] },
            },
        });
    console.log(`  ✅ Sinh nhật: ${bdCount} | Tổng: ${await prisma.cakeProduct.count()} sản phẩm`);
}
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
    await seedCategories();
    await seedCakeProducts();
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
//# sourceMappingURL=seed.js.map