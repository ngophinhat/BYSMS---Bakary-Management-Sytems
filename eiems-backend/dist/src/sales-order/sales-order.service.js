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
exports.SalesOrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const cake_product_service_1 = require("../cake-product/cake-product.service");
const notification_service_1 = require("../notification/notification.service");
const redis_service_1 = require("../redis/redis.service");
const client_1 = require("@prisma/client");
const LIST_CACHE_PREFIX = 'sales-orders:list:';
const LIST_CACHE_PATTERN = 'sales-orders:list:*';
const LIST_CACHE_TTL = 120;
const DETAIL_CACHE_PREFIX = 'sales-orders:detail:';
const DETAIL_CACHE_TTL = 180;
let SalesOrderService = class SalesOrderService {
    prisma;
    cakeProductService;
    notificationService;
    redis;
    constructor(prisma, cakeProductService, notificationService, redis) {
        this.prisma = prisma;
        this.cakeProductService = cakeProductService;
        this.notificationService = notificationService;
        this.redis = redis;
    }
    async invalidateOrderCache(orderId) {
        await this.redis.delPattern(LIST_CACHE_PATTERN);
        if (orderId) {
            await this.redis.del(`${DETAIL_CACHE_PREFIX}${orderId}`);
        }
    }
    async create(dto, createdById) {
        const { basePrice, totalPrice } = await this.resolvePrice(dto);
        const orderCode = await this.generateOrderCode();
        const orderTime = new Date();
        const deliveryTime = dto.deliveryTime
            ? new Date(dto.deliveryTime)
            : new Date(orderTime.getTime() + 2 * 60 * 60 * 1000);
        const deliveryDate = new Date(deliveryTime);
        deliveryDate.setHours(0, 0, 0, 0);
        const order = await this.prisma.salesOrder.create({
            data: {
                orderCode,
                customerName: dto.customerName ?? '',
                customerPhone: dto.customerPhone ?? '',
                customerId: dto.customerId,
                cakeProductId: dto.cakeProductId,
                cakeName: dto.cakeName ?? '',
                quantity: dto.quantity ?? 1,
                basePrice,
                surcharge: dto.surcharge ?? 0,
                addonPrice: dto.addonPrice ?? 0,
                addonNote: dto.addonNote,
                totalPrice,
                orderTime,
                deliveryTime,
                deliveryDate,
                note: dto.note,
                imageUrl: dto.imageUrl,
                createdById,
                orderStatus: client_1.OrderStatus.PENDING,
                paymentStatus: client_1.PaymentStatus.UNPAID,
            },
            include: {
                cakeProduct: { include: { prices: true } },
                customer: true,
                createdBy: { select: { id: true, fullName: true, role: true } },
            },
        });
        await this.notificationService.notifyAdminAndAccountant(client_1.NotificationType.NEW_ORDER, `Đơn hàng mới ${orderCode} - ${dto.cakeName ?? ''} - KH: ${dto.customerName ?? ''}`, order.id);
        await this.invalidateOrderCache();
        return order;
    }
    async findAll(filters) {
        const cacheKey = `${LIST_CACHE_PREFIX}${JSON.stringify(filters)}`;
        const cached = await this.redis.get(cacheKey);
        if (cached)
            return cached;
        const orders = await this.prisma.salesOrder.findMany({
            where: {
                ...(filters.orderStatus && { orderStatus: filters.orderStatus }),
                ...(filters.paymentStatus && { paymentStatus: filters.paymentStatus }),
                ...(filters.createdById && { createdById: filters.createdById }),
                ...(filters.deliveryDate && {
                    deliveryDate: new Date(filters.deliveryDate),
                }),
            },
            include: {
                cakeProduct: true,
                customer: true,
                createdBy: { select: { id: true, fullName: true, role: true } },
                debt: true,
            },
            orderBy: { createdAt: 'desc' },
        });
        await this.redis.set(cacheKey, orders, LIST_CACHE_TTL);
        return orders;
    }
    async findOne(id) {
        const cacheKey = `${DETAIL_CACHE_PREFIX}${id}`;
        const cached = await this.redis.get(cacheKey);
        if (cached)
            return cached;
        const order = await this.fetchOrderById(id);
        await this.redis.set(cacheKey, order, DETAIL_CACHE_TTL);
        return order;
    }
    async fetchOrderById(id) {
        const order = await this.prisma.salesOrder.findUnique({
            where: { id },
            include: {
                cakeProduct: { include: { prices: true } },
                customer: true,
                createdBy: { select: { id: true, fullName: true, role: true } },
                debt: true,
                notifications: true,
            },
        });
        if (!order)
            throw new common_1.NotFoundException('Không tìm thấy đơn hàng');
        return order;
    }
    async updateOrderStatus(id, dto, _userId, userRole) {
        const order = await this.fetchOrderById(id);
        if (!dto.orderStatus) {
            throw new common_1.BadRequestException('Thiếu trạng thái đơn hàng');
        }
        this.validateStatusTransition(order.orderStatus, dto.orderStatus, userRole);
        const updated = await this.prisma.salesOrder.update({
            where: { id },
            data: {
                orderStatus: dto.orderStatus,
                ...(dto.cancelReason && { cancelReason: dto.cancelReason }),
            },
            include: { createdBy: true },
        });
        const typeMap = {
            [client_1.OrderStatus.CONFIRMED]: client_1.NotificationType.ORDER_CONFIRMED,
            [client_1.OrderStatus.DELIVERED]: client_1.NotificationType.ORDER_DELIVERED,
            [client_1.OrderStatus.CANCELLED_RESALE]: client_1.NotificationType.ORDER_CANCELLED,
            [client_1.OrderStatus.CANCELLED_LOSS]: client_1.NotificationType.ORDER_CANCELLED,
            [client_1.OrderStatus.CANCELLED_CUSTOMER]: client_1.NotificationType.ORDER_CANCELLED,
        };
        const notifType = typeMap[dto.orderStatus];
        if (notifType) {
            await this.notificationService.notifyUser(updated.createdById, notifType, `Đơn ${order.orderCode} đã được cập nhật: ${dto.orderStatus}`, id);
        }
        await this.invalidateOrderCache(id);
        return updated;
    }
    async updatePaymentStatus(id, dto, _userId) {
        const order = await this.fetchOrderById(id);
        if (order.orderStatus !== client_1.OrderStatus.DELIVERED) {
            throw new common_1.BadRequestException('Chỉ có thể cập nhật thanh toán khi đơn đã giao');
        }
        if (order.paymentStatus === client_1.PaymentStatus.PAID) {
            throw new common_1.BadRequestException('Đơn hàng đã được thanh toán');
        }
        const result = await this.prisma.$transaction(async (tx) => {
            if (dto.paymentStatus === client_1.PaymentStatus.DEBT) {
                const debt = await this.createDebtFromOrder(tx, order, dto.note, dto.dueDate);
                return tx.salesOrder.update({
                    where: { id },
                    data: {
                        paymentStatus: client_1.PaymentStatus.DEBT,
                        debtId: debt.id,
                    },
                });
            }
            if (dto.paymentStatus === client_1.PaymentStatus.PAID) {
                await this.notificationService.notifyAdminAndAccountant(client_1.NotificationType.ORDER_PAID, `Đơn ${order.orderCode} - KH ${order.customerName} chờ xác nhận thanh toán`, id);
                return tx.salesOrder.update({
                    where: { id },
                    data: {
                        paymentStatus: client_1.PaymentStatus.PENDING_CONFIRM,
                        paymentMethod: dto.paymentMethod,
                    },
                });
            }
            return tx.salesOrder.update({
                where: { id },
                data: { paymentStatus: dto.paymentStatus },
            });
        });
        await this.invalidateOrderCache(id);
        return result;
    }
    async createDebtFromOrder(tx, order, note, dueDate) {
        let customerId = order.customerId;
        if (!customerId) {
            const customer = await tx.customer.upsert({
                where: { phone: order.customerPhone },
                update: {},
                create: {
                    name: order.customerName,
                    phone: order.customerPhone,
                },
            });
            customerId = customer.id;
            await tx.salesOrder.update({
                where: { id: order.id },
                data: { customerId },
            });
        }
        const debt = await tx.debt.create({
            data: {
                totalAmount: order.totalPrice,
                remainingAmount: order.totalPrice,
                status: 'UNPAID',
                note: note ?? `Công nợ từ đơn hàng ${order.orderCode}`,
                customerId,
                ...(dueDate && { dueDate: new Date(dueDate) }),
            },
        });
        await this.notificationService.notifyAdminAndAccountant(client_1.NotificationType.DEBT_CREATED, `Công nợ mới: KH ${order.customerName} - ${Number(order.totalPrice).toLocaleString('vi-VN')}đ - Đơn ${order.orderCode}`, order.id);
        return debt;
    }
    async confirmPayment(id, dto, confirmedById) {
        const order = await this.prisma.salesOrder.findUnique({
            where: { id },
            include: {
                cakeProduct: { include: { prices: true } },
                customer: true,
                createdBy: { select: { id: true, fullName: true, role: true } },
                debt: true,
                notifications: true,
            },
        });
        if (!order)
            throw new common_1.NotFoundException('Không tìm thấy đơn hàng');
        if (order.orderStatus !== client_1.OrderStatus.DELIVERED) {
            throw new common_1.BadRequestException('Chỉ có thể xác nhận thanh toán khi đơn đã giao');
        }
        if (order.paymentStatus !== client_1.PaymentStatus.PENDING_CONFIRM) {
            throw new common_1.BadRequestException('Đơn hàng chưa được staff xác nhận thanh toán');
        }
        if (!order.paymentMethod) {
            throw new common_1.BadRequestException('Staff chưa cập nhật hình thức thanh toán');
        }
        const category = await this.prisma.category.findFirst({
            where: { type: 'INCOME', isSystem: true },
        });
        if (!category) {
            throw new common_1.BadRequestException('Không tìm thấy danh mục THU mặc định');
        }
        const result = await this.prisma.$transaction(async (tx) => {
            const transaction = await tx.transaction.create({
                data: {
                    type: 'INCOME',
                    amount: order.totalPrice,
                    note: dto.note ??
                        `Thu tiền đơn hàng ${order.orderCode} - KH: ${order.customerName}`,
                    transactionDate: new Date(),
                    categoryId: category.id,
                    createdById: confirmedById,
                    customerId: order.customerId ?? undefined,
                },
            });
            await tx.transactionLog.create({
                data: {
                    action: 'CREATE',
                    note: `Tự động tạo từ xác nhận thanh toán đơn ${order.orderCode}`,
                    transactionId: transaction.id,
                    performedById: confirmedById,
                },
            });
            const updated = await tx.salesOrder.update({
                where: { id },
                data: {
                    paymentStatus: client_1.PaymentStatus.PAID,
                    confirmedById,
                    confirmedAt: new Date(),
                    transactionId: transaction.id,
                },
            });
            await this.notificationService.notifyUser(order.createdById, client_1.NotificationType.ORDER_PAID, `Đơn ${order.orderCode} - KH ${order.customerName} đã được xác nhận thanh toán`, id);
            return updated;
        });
        await this.invalidateOrderCache(id);
        return result;
    }
    async resolvePrice(dto) {
        let basePrice = 0;
        if (dto.cakeProductId) {
            const product = await this.cakeProductService.findOne(dto.cakeProductId);
            if (product.isPriceManual) {
                if (dto.basePrice == null || dto.basePrice <= 0) {
                    throw new common_1.BadRequestException('Loại bánh này cần nhập giá thủ công (basePrice)');
                }
                basePrice = dto.basePrice;
            }
            else {
                basePrice = await this.cakeProductService.lookupPrice(dto.cakeProductId, dto.shape ?? product.shape ?? undefined, dto.size ?? product.size ?? undefined);
            }
        }
        else {
            if (dto.basePrice == null || dto.basePrice <= 0) {
                throw new common_1.BadRequestException('Cần nhập giá bánh (basePrice)');
            }
            basePrice = dto.basePrice;
        }
        const quantity = dto.quantity ?? 1;
        const surcharge = dto.surcharge ?? 0;
        const addonPrice = dto.addonPrice ?? 0;
        const totalPrice = (basePrice + surcharge + addonPrice) * quantity;
        return { basePrice, totalPrice };
    }
    async generateOrderCode() {
        const count = await this.prisma.salesOrder.count();
        return `DH${String(count + 1).padStart(3, '0')}`;
    }
    validateStatusTransition(current, next, role) {
        const staffAllowed = {
            [client_1.OrderStatus.CONFIRMED]: [
                client_1.OrderStatus.DELIVERED,
                client_1.OrderStatus.CANCELLED_RESALE,
                client_1.OrderStatus.CANCELLED_LOSS,
                client_1.OrderStatus.CANCELLED_CUSTOMER,
            ],
            [client_1.OrderStatus.PENDING]: [
                client_1.OrderStatus.CANCELLED_RESALE,
                client_1.OrderStatus.CANCELLED_LOSS,
                client_1.OrderStatus.CANCELLED_CUSTOMER,
            ],
        };
        const adminAllowed = {
            [client_1.OrderStatus.PENDING]: [
                client_1.OrderStatus.CONFIRMED,
                client_1.OrderStatus.CANCELLED_RESALE,
                client_1.OrderStatus.CANCELLED_LOSS,
                client_1.OrderStatus.CANCELLED_CUSTOMER,
            ],
            [client_1.OrderStatus.CONFIRMED]: [
                client_1.OrderStatus.DELIVERED,
                client_1.OrderStatus.CANCELLED_RESALE,
                client_1.OrderStatus.CANCELLED_LOSS,
                client_1.OrderStatus.CANCELLED_CUSTOMER,
            ],
            [client_1.OrderStatus.DELIVERED]: [],
        };
        const allowed = role === client_1.Role.STAFF ? staffAllowed : adminAllowed;
        const allowedNext = allowed[current] ?? [];
        if (!allowedNext.includes(next)) {
            if (role === client_1.Role.STAFF) {
                throw new common_1.ForbiddenException(`STAFF chỉ có thể chuyển sang: Đã giao, Hủy-Bán lại, Hủy-Mất trắng`);
            }
            throw new common_1.BadRequestException(`Không thể chuyển từ ${current} sang ${next}`);
        }
    }
};
exports.SalesOrderService = SalesOrderService;
exports.SalesOrderService = SalesOrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cake_product_service_1.CakeProductService,
        notification_service_1.NotificationService,
        redis_service_1.RedisService])
], SalesOrderService);
//# sourceMappingURL=sales-order.service.js.map