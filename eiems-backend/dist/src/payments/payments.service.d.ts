import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
export declare class PaymentsService {
    private prisma;
    private redis;
    constructor(prisma: PrismaService, redis: RedisService);
    private getOrCreateDebtCollectionCategory;
    createPayment(debtId: string, amount: number, receivedById: string, note?: string, paymentDate?: Date): Promise<{
        id: string;
        createdAt: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        paymentDate: Date;
        note: string | null;
        debtId: string;
        receivedById: string;
    }>;
    getPaymentsByDebt(debtId: string): Promise<{
        id: string;
        createdAt: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        paymentDate: Date;
        note: string | null;
        debtId: string;
        receivedById: string;
    }[]>;
}
