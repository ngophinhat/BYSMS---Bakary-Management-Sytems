import { PrismaService } from '../prisma/prisma.service';
import { NotificationType } from '@prisma/client';
export declare class NotificationService {
    private prisma;
    constructor(prisma: PrismaService);
    notifyUser(userId: string, type: NotificationType, message: string, orderId?: string): Promise<{
        id: string;
        createdAt: Date;
        type: import("@prisma/client").$Enums.NotificationType;
        message: string;
        isRead: boolean;
        userId: string;
        orderId: string | null;
    }>;
    notifyAdminAndAccountant(type: NotificationType, message: string, orderId?: string): Promise<void>;
    findByUser(userId: string, onlyUnread?: boolean): Promise<({
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
        createdAt: Date;
        type: import("@prisma/client").$Enums.NotificationType;
        message: string;
        isRead: boolean;
        userId: string;
        orderId: string | null;
    })[]>;
    countUnread(userId: string): Promise<number>;
    markAsRead(notificationId: string, userId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
    markAllAsRead(userId: string): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
