import { PrismaService } from '../prisma/prisma.service';
import { TransactionLogService } from '../transaction-log/transaction-log.service';
export declare class TransactionsService {
    private prisma;
    private logService;
    constructor(prisma: PrismaService, logService: TransactionLogService);
    create(data: {
        amount: number;
        type: 'INCOME' | 'EXPENSE';
        categoryId: string;
        createdById: string;
        note?: string;
        transactionDate: Date;
    }): Promise<{
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
    }>;
    findAll(): Promise<({
        category: {
            id: string;
            name: string;
            type: import("@prisma/client").$Enums.CategoryType;
            isSystem: boolean;
            isActive: boolean;
            createdAt: Date;
        };
        createdBy: {
            id: string;
            fullName: string;
            role: import("@prisma/client").$Enums.Role;
        };
        customer: {
            id: string;
            name: string;
            createdAt: Date;
            phone: string;
            address: string | null;
        } | null;
        updatedBy: {
            id: string;
            fullName: string;
            role: import("@prisma/client").$Enums.Role;
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
    findAllArchived(): Promise<({
        category: {
            id: string;
            name: string;
            type: import("@prisma/client").$Enums.CategoryType;
            isSystem: boolean;
            isActive: boolean;
            createdAt: Date;
        };
        createdBy: {
            id: string;
            fullName: string;
        };
        customer: {
            id: string;
            name: string;
            createdAt: Date;
            phone: string;
            address: string | null;
        } | null;
        updatedBy: {
            id: string;
            fullName: string;
        } | null;
        deletedBy: {
            id: string;
            fullName: string;
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
    findOne(id: string): Promise<{
        category: {
            id: string;
            name: string;
            type: import("@prisma/client").$Enums.CategoryType;
            isSystem: boolean;
            isActive: boolean;
            createdAt: Date;
        };
        logs: ({
            performedBy: {
                id: string;
                fullName: string;
                role: import("@prisma/client").$Enums.Role;
            };
        } & {
            id: string;
            createdAt: Date;
            note: string | null;
            action: import("@prisma/client").$Enums.TransactionAction;
            changedFields: import("@prisma/client/runtime/library").JsonValue | null;
            transactionId: string;
            performedById: string;
        })[];
        createdBy: {
            id: string;
            fullName: string;
            role: import("@prisma/client").$Enums.Role;
        };
        customer: {
            id: string;
            name: string;
            createdAt: Date;
            phone: string;
            address: string | null;
        } | null;
        updatedBy: {
            id: string;
            fullName: string;
            role: import("@prisma/client").$Enums.Role;
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
    }>;
    update(id: string, data: {
        type?: 'INCOME' | 'EXPENSE';
        amount?: number;
        note?: string;
        categoryId?: string;
        transactionDate?: Date | string;
    }, userId: string): Promise<{
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
    }>;
    softDelete(id: string, userId: string): Promise<{
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
    }>;
    getLogs(transactionId: string): Promise<({
        performedBy: {
            id: string;
            fullName: string;
            role: import("@prisma/client").$Enums.Role;
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
    unarchive(id: string, userId: string): Promise<{
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
    }>;
}
