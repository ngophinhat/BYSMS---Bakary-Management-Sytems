"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CakeProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let CakeProductService = class CakeProductService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        this.validateCakeProduct(dto);
        return this.prisma.cakeProduct.create({
            data: {
                category: dto.category,
                name: dto.name,
                shape: dto.shape,
                size: dto.size,
                ageGroup: dto.ageGroup,
                setNumber: dto.setNumber,
                setQuantity: dto.setQuantity,
                isPriceManual: dto.isPriceManual ?? false,
                description: dto.description,
                isActive: dto.isActive ?? true,
                prices: {
                    create: dto.prices.map((p) => ({
                        shape: p.shape,
                        size: p.size,
                        price: p.price,
                    })),
                },
            },
            include: { prices: true },
        });
    }
    async findAll(category) {
        return this.prisma.cakeProduct.findMany({
            where: {
                isActive: true,
                ...(category && { category }),
            },
            include: { prices: true },
            orderBy: { createdAt: 'asc' },
        });
    }
    async findOne(id) {
        const product = await this.prisma.cakeProduct.findUnique({
            where: { id },
            include: { prices: true },
        });
        if (!product)
            throw new common_1.NotFoundException('Không tìm thấy sản phẩm bánh');
        return product;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.$transaction(async (tx) => {
            if (dto.prices && dto.prices.length > 0) {
                await tx.cakePrice.deleteMany({ where: { cakeProductId: id } });
                await tx.cakePrice.createMany({
                    data: dto.prices.map((p) => ({
                        cakeProductId: id,
                        shape: p.shape,
                        size: p.size,
                        price: p.price,
                    })),
                });
            }
            return tx.cakeProduct.update({
                where: { id },
                data: {
                    name: dto.name,
                    shape: dto.shape,
                    size: dto.size,
                    ageGroup: dto.ageGroup,
                    setNumber: dto.setNumber,
                    setQuantity: dto.setQuantity,
                    isPriceManual: dto.isPriceManual,
                    description: dto.description,
                    isActive: dto.isActive,
                },
                include: { prices: true },
            });
        });
    }
    async toggleActive(id) {
        const product = await this.findOne(id);
        return this.prisma.cakeProduct.update({
            where: { id },
            data: { isActive: !product.isActive },
            include: { prices: true },
        });
    }
    async lookupPrice(cakeProductId, shape, size) {
        const priceRecord = await this.prisma.cakePrice.findFirst({
            where: {
                cakeProductId,
                shape: shape ?? null,
                size: size ?? null,
            },
        });
        if (!priceRecord) {
            throw new common_1.BadRequestException('Không tìm thấy giá cho loại bánh này. Vui lòng kiểm tra shape/size.');
        }
        return Number(priceRecord.price);
    }
    validateCakeProduct(dto) {
        const isBirthday = dto.category === client_1.CakeCategory.BIRTHDAY;
        const isManual = dto.category === client_1.CakeCategory.BANH_BO ||
            dto.category === client_1.CakeCategory.BANH_AN;
        const isSet = [
            client_1.CakeCategory.ONG_TAO,
            client_1.CakeCategory.LE,
            client_1.CakeCategory.THOI_NOI,
            client_1.CakeCategory.TET,
            client_1.CakeCategory.PLAN,
        ].includes(dto.category);
        if (isBirthday) {
            if (!dto.shape)
                throw new common_1.BadRequestException('Bánh sinh nhật cần có hình dạng (shape)');
            if (!dto.size)
                throw new common_1.BadRequestException('Bánh sinh nhật cần có kích cỡ (size)');
            if (dto.prices.length === 0)
                throw new common_1.BadRequestException('Bánh sinh nhật cần có bảng giá');
        }
        if (isSet) {
            if (!dto.setNumber)
                throw new common_1.BadRequestException('Bánh set cần có số set');
            if (dto.prices.length !== 1)
                throw new common_1.BadRequestException('Bánh set chỉ có 1 mức giá cố định');
        }
        if (isManual) {
            if (dto.prices.length > 0)
                throw new common_1.BadRequestException('Bánh bò/bánh ăn không cần bảng giá, giá sẽ nhập tay khi tạo đơn');
        }
    }
};
exports.CakeProductService = CakeProductService;
exports.CakeProductService = CakeProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CakeProductService);
//# sourceMappingURL=cake-product.service.js.map