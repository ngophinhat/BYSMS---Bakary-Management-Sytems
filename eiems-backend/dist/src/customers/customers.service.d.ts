import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
export declare class CustomersService {
    private prisma;
    private redis;
    constructor(prisma: PrismaService, redis: RedisService);
    create(data: {
        name: string;
        phone: string;
        address?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        phone: string;
        address: string | null;
    }>;
    findAll(): Promise<{}>;
    findOne(id: string): Promise<{}>;
    update(id: string, data: {
        name?: string;
        phone?: string;
        address?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        phone: string;
        address: string | null;
    }>;
    getDebtSummary(customerId: string): Promise<{
        totalDebt: number;
        totalPaid: number;
        remainingDebt: number;
    }>;
}
