import { UsersService } from './users.service';
import { Role } from '@prisma/client';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        _count: {
            createdTransactions: number;
        };
        email: string;
        fullName: string;
        role: import("@prisma/client").$Enums.Role;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        _count: {
            createdTransactions: number;
        };
        email: string;
        fullName: string;
        role: import("@prisma/client").$Enums.Role;
    }>;
    getUserTransactions(id: string): Promise<({
        category: {
            id: string;
            name: string;
            type: import("@prisma/client").$Enums.CategoryType;
            isSystem: boolean;
            isActive: boolean;
            createdAt: Date;
        };
        customer: {
            id: string;
            name: string;
        } | null;
    } & {
        id: string;
        type: import("@prisma/client").$Enums.TransactionType;
        createdAt: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        note: string | null;
        isArchived: boolean;
        transactionDate: Date;
        categoryId: string;
        createdById: string;
        customerId: string | null;
        updatedById: string | null;
        deletedById: string | null;
        updatedAt: Date;
        deletedAt: Date | null;
    })[]>;
    getUserLogs(id: string): Promise<({
        transaction: {
            id: string;
            type: import("@prisma/client").$Enums.TransactionType;
            amount: import("@prisma/client/runtime/library").Decimal;
            note: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        note: string | null;
        action: import("@prisma/client").$Enums.TransactionAction;
        changedFields: import("@prisma/client/runtime/library").JsonValue | null;
        transactionId: string;
        performedById: string;
    })[]>;
    create(body: any): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        fullName: string;
        role: import("@prisma/client").$Enums.Role;
    }>;
    toggleActive(id: string, req: {
        user: {
            id: string;
            role: Role;
        };
    }): Promise<{
        id: string;
        isActive: boolean;
        email: string;
        fullName: string;
        role: import("@prisma/client").$Enums.Role;
    }>;
}
