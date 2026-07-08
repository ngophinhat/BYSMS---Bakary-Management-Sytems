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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let NotificationService = class NotificationService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async notifyUser(userId, type, message, orderId) {
        return this.prisma.notification.create({
            data: { userId, type, message, orderId },
        });
    }
    async notifyAdminAndAccountant(type, message, orderId) {
        const recipients = await this.prisma.user.findMany({
            where: {
                role: { in: [client_1.Role.ADMIN, client_1.Role.ACCOUNTANT] },
                isActive: true,
            },
            select: { id: true },
        });
        if (recipients.length === 0)
            return;
        await this.prisma.notification.createMany({
            data: recipients.map((u) => ({
                userId: u.id,
                type,
                message,
                orderId: orderId ?? null,
            })),
        });
    }
    async findByUser(userId, onlyUnread = false) {
        return this.prisma.notification.findMany({
            where: {
                userId,
                ...(onlyUnread && { isRead: false }),
            },
            include: {
                order: {
                    select: {
                        id: true,
                        orderCode: true,
                        orderStatus: true,
                        paymentStatus: true,
                        customerName: true,
                        totalPrice: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
            take: 50,
        });
    }
    async countUnread(userId) {
        return this.prisma.notification.count({
            where: { userId, isRead: false },
        });
    }
    async markAsRead(notificationId, userId) {
        return this.prisma.notification.updateMany({
            where: { id: notificationId, userId },
            data: { isRead: true },
        });
    }
    async markAllAsRead(userId) {
        return this.prisma.notification.updateMany({
            where: { userId, isRead: false },
            data: { isRead: true },
        });
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationService);
//# sourceMappingURL=notification.service.js.map