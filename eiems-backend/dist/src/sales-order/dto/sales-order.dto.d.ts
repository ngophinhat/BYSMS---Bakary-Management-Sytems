import { CakeShape, CakeSize, AgeGroup, OrderStatus, PaymentStatus } from '@prisma/client';
export declare class CreateSalesOrderDto {
    customerId?: string;
    customerName: string | undefined;
    customerPhone: string | undefined;
    cakeProductId?: string;
    cakeName: string | undefined;
    quantity?: number;
    basePrice?: number;
    surcharge?: number;
    addonPrice?: number;
    addonNote?: string;
    deliveryTime?: string;
    note?: string;
    imageUrl?: string;
    shape?: CakeShape;
    size?: CakeSize;
    ageGroup?: AgeGroup;
}
export declare class UpdateOrderStatusDto {
    orderStatus: OrderStatus | undefined;
    cancelReason?: string;
}
export declare class UpdatePaymentStatusDto {
    paymentStatus: PaymentStatus | undefined;
    note?: string;
    dueDate?: string;
    paymentMethod?: 'CASH' | 'BANK_TRANSFER';
}
export declare class ConfirmPaymentDto {
    note?: string;
}
