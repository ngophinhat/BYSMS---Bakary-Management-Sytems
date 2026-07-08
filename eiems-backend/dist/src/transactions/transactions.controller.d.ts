import { TransactionsService } from './transactions.service';
export declare class TransactionsController {
    private transactionsService;
    constructor(transactionsService: TransactionsService);
    create(body: {
        amount: number;
        type: 'INCOME' | 'EXPENSE';
        categoryId: string;
        note?: string;
        transactionDate: string;
        materialId?: string;
    }, req: {
        user: {
            id: string;
        };
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
    getLogs(id: string): Promise<({
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
    update(id: string, body: {
        type?: 'INCOME' | 'EXPENSE';
        amount?: number;
        note?: string;
        categoryId?: string;
        materialId?: string;
        transactionDate?: string;
    }, req: {
        user: {
            id: string;
        };
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
    archive(id: string, req: {
        user: {
            id: string;
        };
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
    unarchive(id: string, req: {
        user: {
            id: string;
        };
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
}
