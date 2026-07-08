import { NotificationService } from './notification.service';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    findAll(req: any, unread?: string): Promise<({
        order: {
            id: string;
            orderCode: string;
            customerName: string;
            totalPrice: import("@prisma/client/runtime/library").Decimal;
            orderStatus: import("@prisma/client").$Enums.OrderStatus;
            paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        } | null;
    } & {
        id: string;
        type: import("@prisma/client").$Enums.NotificationType;
        createdAt: Date;
        message: string;
        isRead: boolean;
        userId: string;
        orderId: string | null;
    })[]>;
    countUnread(req: any): Promise<number>;
    markAsRead(id: string, req: any): Promise<import("@prisma/client").Prisma.BatchPayload>;
    markAllAsRead(req: any): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
