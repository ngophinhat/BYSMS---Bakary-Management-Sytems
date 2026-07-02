import { PrismaService } from '../prisma/prisma.service';
import { CakeProductService } from '../cake-product/cake-product.service';
import { NotificationService } from '../notification/notification.service';
import { RedisService } from '../redis/redis.service';
import { ConfirmPaymentDto, CreateSalesOrderDto, UpdateOrderStatusDto, UpdatePaymentStatusDto } from './dto/sales-order.dto';
import { OrderStatus, PaymentStatus, Role, Prisma } from '@prisma/client';
type OrderWithRelations = Prisma.SalesOrderGetPayload<{
    include: {
        cakeProduct: {
            include: {
                prices: true;
            };
        };
        customer: true;
        createdBy: {
            select: {
                id: true;
                fullName: true;
                role: true;
            };
        };
        debt: true;
        notifications: true;
    };
}>;
export declare class SalesOrderService {
    private prisma;
    private cakeProductService;
    private notificationService;
    private redis;
    constructor(prisma: PrismaService, cakeProductService: CakeProductService, notificationService: NotificationService, redis: RedisService);
    private invalidateOrderCache;
    create(dto: CreateSalesOrderDto, createdById: string): Promise<{
        cakeProduct: ({
            prices: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                shape: import("@prisma/client").$Enums.CakeShape | null;
                size: import("@prisma/client").$Enums.CakeSize | null;
                price: Prisma.Decimal;
                cakeProductId: string;
            }[];
        } & {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            category: import("@prisma/client").$Enums.CakeCategory;
            shape: import("@prisma/client").$Enums.CakeShape | null;
            size: import("@prisma/client").$Enums.CakeSize | null;
            ageGroup: import("@prisma/client").$Enums.AgeGroup | null;
            setNumber: number | null;
            setQuantity: number | null;
            isPriceManual: boolean;
            description: string | null;
        }) | null;
        customer: {
            id: string;
            createdAt: Date;
            name: string;
            phone: string;
            address: string | null;
        } | null;
        createdBy: {
            id: string;
            fullName: string;
            role: import("@prisma/client").$Enums.Role;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        note: string | null;
        createdById: string;
        customerId: string | null;
        transactionId: string | null;
        debtId: string | null;
        cakeProductId: string | null;
        orderCode: string;
        customerName: string;
        customerPhone: string;
        cakeName: string;
        quantity: number;
        basePrice: Prisma.Decimal;
        surcharge: Prisma.Decimal;
        addonPrice: Prisma.Decimal;
        addonNote: string | null;
        totalPrice: Prisma.Decimal;
        orderTime: Date;
        deliveryTime: Date;
        deliveryDate: Date;
        orderStatus: import("@prisma/client").$Enums.OrderStatus;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        paymentMethod: import("@prisma/client").$Enums.PaymentMethod | null;
        imageUrl: string | null;
        cancelReason: string | null;
        confirmedById: string | null;
        confirmedAt: Date | null;
    }>;
    findAll(filters: {
        orderStatus?: OrderStatus;
        paymentStatus?: PaymentStatus;
        deliveryDate?: string;
        createdById?: string;
    }): Promise<{}>;
    findOne(id: string): Promise<OrderWithRelations>;
    private fetchOrderById;
    updateOrderStatus(id: string, dto: UpdateOrderStatusDto, _userId: string, userRole: Role): Promise<{
        createdBy: {
            id: string;
            email: string;
            fullName: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        note: string | null;
        createdById: string;
        customerId: string | null;
        transactionId: string | null;
        debtId: string | null;
        cakeProductId: string | null;
        orderCode: string;
        customerName: string;
        customerPhone: string;
        cakeName: string;
        quantity: number;
        basePrice: Prisma.Decimal;
        surcharge: Prisma.Decimal;
        addonPrice: Prisma.Decimal;
        addonNote: string | null;
        totalPrice: Prisma.Decimal;
        orderTime: Date;
        deliveryTime: Date;
        deliveryDate: Date;
        orderStatus: import("@prisma/client").$Enums.OrderStatus;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        paymentMethod: import("@prisma/client").$Enums.PaymentMethod | null;
        imageUrl: string | null;
        cancelReason: string | null;
        confirmedById: string | null;
        confirmedAt: Date | null;
    }>;
    updatePaymentStatus(id: string, dto: UpdatePaymentStatusDto, _userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        note: string | null;
        createdById: string;
        customerId: string | null;
        transactionId: string | null;
        debtId: string | null;
        cakeProductId: string | null;
        orderCode: string;
        customerName: string;
        customerPhone: string;
        cakeName: string;
        quantity: number;
        basePrice: Prisma.Decimal;
        surcharge: Prisma.Decimal;
        addonPrice: Prisma.Decimal;
        addonNote: string | null;
        totalPrice: Prisma.Decimal;
        orderTime: Date;
        deliveryTime: Date;
        deliveryDate: Date;
        orderStatus: import("@prisma/client").$Enums.OrderStatus;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        paymentMethod: import("@prisma/client").$Enums.PaymentMethod | null;
        imageUrl: string | null;
        cancelReason: string | null;
        confirmedById: string | null;
        confirmedAt: Date | null;
    }>;
    private createDebtFromOrder;
    confirmPayment(id: string, dto: ConfirmPaymentDto, confirmedById: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        note: string | null;
        createdById: string;
        customerId: string | null;
        transactionId: string | null;
        debtId: string | null;
        cakeProductId: string | null;
        orderCode: string;
        customerName: string;
        customerPhone: string;
        cakeName: string;
        quantity: number;
        basePrice: Prisma.Decimal;
        surcharge: Prisma.Decimal;
        addonPrice: Prisma.Decimal;
        addonNote: string | null;
        totalPrice: Prisma.Decimal;
        orderTime: Date;
        deliveryTime: Date;
        deliveryDate: Date;
        orderStatus: import("@prisma/client").$Enums.OrderStatus;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        paymentMethod: import("@prisma/client").$Enums.PaymentMethod | null;
        imageUrl: string | null;
        cancelReason: string | null;
        confirmedById: string | null;
        confirmedAt: Date | null;
    }>;
    private resolvePrice;
    private generateOrderCode;
    private validateStatusTransition;
}
export {};
