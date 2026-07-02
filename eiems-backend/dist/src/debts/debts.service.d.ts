import { PrismaService } from '../prisma/prisma.service';
export declare class DebtsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        totalAmount: number;
        customerId: string;
        dueDate?: Date;
    }): Promise<{
        id: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        remainingAmount: import("@prisma/client/runtime/library").Decimal;
        status: import("@prisma/client").$Enums.DebtStatus;
        dueDate: Date | null;
        note: string | null;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
    }>;
    findAll(): Promise<({
        customer: {
            id: string;
            createdAt: Date;
            name: string;
            phone: string;
            address: string | null;
        };
        payments: ({
            receivedBy: {
                id: string;
                fullName: string;
            };
        } & {
            id: string;
            note: string | null;
            createdAt: Date;
            amount: import("@prisma/client/runtime/library").Decimal;
            paymentDate: Date;
            debtId: string;
            receivedById: string;
        })[];
    } & {
        id: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        remainingAmount: import("@prisma/client/runtime/library").Decimal;
        status: import("@prisma/client").$Enums.DebtStatus;
        dueDate: Date | null;
        note: string | null;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
    })[]>;
    findOne(id: string): Promise<{
        customer: {
            id: string;
            createdAt: Date;
            name: string;
            phone: string;
            address: string | null;
        };
        payments: {
            id: string;
            note: string | null;
            createdAt: Date;
            amount: import("@prisma/client/runtime/library").Decimal;
            paymentDate: Date;
            receivedBy: {
                id: string;
                fullName: string;
            };
        }[];
    } & {
        id: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        remainingAmount: import("@prisma/client/runtime/library").Decimal;
        status: import("@prisma/client").$Enums.DebtStatus;
        dueDate: Date | null;
        note: string | null;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
    }>;
    getOverdueDebts(): Promise<{
        overdueDate: number;
        customer: {
            id: string;
            createdAt: Date;
            name: string;
            phone: string;
            address: string | null;
        };
        id: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        remainingAmount: import("@prisma/client/runtime/library").Decimal;
        status: import("@prisma/client").$Enums.DebtStatus;
        dueDate: Date | null;
        note: string | null;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
    }[]>;
    update(id: string, data: any): Promise<{
        id: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        remainingAmount: import("@prisma/client/runtime/library").Decimal;
        status: import("@prisma/client").$Enums.DebtStatus;
        dueDate: Date | null;
        note: string | null;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        totalAmount: import("@prisma/client/runtime/library").Decimal;
        remainingAmount: import("@prisma/client/runtime/library").Decimal;
        status: import("@prisma/client").$Enums.DebtStatus;
        dueDate: Date | null;
        note: string | null;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
    }>;
}
