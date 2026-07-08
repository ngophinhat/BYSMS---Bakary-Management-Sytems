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
exports.DebtsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const redis_service_1 = require("../redis/redis.service");
const LIST_CACHE_KEY = 'debts:list';
const LIST_CACHE_TTL = 60;
const DETAIL_CACHE_PREFIX = 'debts:detail:';
const DETAIL_CACHE_TTL = 60;
const OVERDUE_CACHE_KEY = 'debts:overdue';
const OVERDUE_CACHE_TTL = 30;
let DebtsService = class DebtsService {
    prisma;
    redis;
    constructor(prisma, redis) {
        this.prisma = prisma;
        this.redis = redis;
    }
    async invalidateCache(debtId) {
        await this.redis.del(LIST_CACHE_KEY);
        await this.redis.del(OVERDUE_CACHE_KEY);
        if (debtId) {
            await this.redis.del(`${DETAIL_CACHE_PREFIX}${debtId}`);
        }
    }
    async create(data) {
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
        if (cached)
            return cached;
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
            orderBy: [{ status: 'asc' }, { updatedAt: 'desc' }],
        });
        await this.redis.set(LIST_CACHE_KEY, debts, LIST_CACHE_TTL);
        return debts;
    }
    async findOne(id) {
        const cacheKey = `${DETAIL_CACHE_PREFIX}${id}`;
        const cached = await this.redis.get(cacheKey);
        if (cached)
            return cached;
        const debt = await this.prisma.debt.findUnique({
            where: { id },
            include: {
                customer: true,
                payments: {
                    select: {
                        id: true,
                        amount: true,
                        paymentDate: true,
                        note: true,
                        createdAt: true,
                        receivedBy: {
                            select: { id: true, fullName: true },
                        },
                    },
                    orderBy: { createdAt: 'desc' },
                },
            },
        });
        if (!debt)
            throw new common_1.NotFoundException('Không tìm thấy công nợ!');
        await this.redis.set(cacheKey, debt, DETAIL_CACHE_TTL);
        return debt;
    }
    async getOverdueDebts() {
        const cached = await this.redis.get(OVERDUE_CACHE_KEY);
        if (cached)
            return cached;
        const debts = await this.prisma.debt.findMany({
            where: {
                dueDate: { not: null, lt: new Date() },
                remainingAmount: { gt: 0 },
            },
            include: { customer: true },
        });
        const result = debts.map((debt) => {
            const overdueDate = Math.floor((new Date().getTime() - new Date(debt.dueDate).getTime()) /
                (1000 * 60 * 60 * 24));
            return { ...debt, overdueDate };
        });
        await this.redis.set(OVERDUE_CACHE_KEY, result, OVERDUE_CACHE_TTL);
        return result;
    }
    async update(id, data) {
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
    async remove(id) {
        const removed = await this.prisma.debt.delete({ where: { id } });
        await this.invalidateCache(id);
        return removed;
    }
};
exports.DebtsService = DebtsService;
exports.DebtsService = DebtsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService])
], DebtsService);
//# sourceMappingURL=debts.service.js.map