import { Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    private redis;
    constructor(prisma: PrismaService, redis: RedisService);
    validate(payload: {
        sub: string;
        email: string;
    }): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        fullName: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
    } | {
        [key: string]: unknown;
        id: string;
        isActive: boolean;
    }>;
}
export {};
