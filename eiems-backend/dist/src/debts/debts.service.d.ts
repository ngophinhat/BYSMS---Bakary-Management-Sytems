import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
export declare class DebtsService {
    private prisma;
    private redis;
    constructor(prisma: PrismaService, redis: RedisService);
    private invalidateCache;
    create(data: {
        totalAmount: number;
        customerId: string;
        dueDate?: Date;
    }): Promise<{
        id: string;
        createdAt: Date;
        note: string | null;
        customerId: string;
        updatedAt: Date;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        remainingAmount: import("@prisma/client/runtime/library").Decimal;
        status: import("@prisma/client").$Enums.DebtStatus;
        dueDate: Date | null;
    }>;
    findAll(): Promise<{}>;
    findOne(id: string): Promise<{}>;
    getOverdueDebts(): Promise<{}>;
    update(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        note: string | null;
        customerId: string;
        updatedAt: Date;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        remainingAmount: import("@prisma/client/runtime/library").Decimal;
        status: import("@prisma/client").$Enums.DebtStatus;
        dueDate: Date | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        note: string | null;
        customerId: string;
        updatedAt: Date;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        remainingAmount: import("@prisma/client/runtime/library").Decimal;
        status: import("@prisma/client").$Enums.DebtStatus;
        dueDate: Date | null;
    }>;
}
