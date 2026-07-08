import { DebtsService } from './debts.service';
export declare class DebtsController {
    private debtsService;
    constructor(debtsService: DebtsService);
    create(body: any): Promise<{
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
    update(id: string, body: any): Promise<{
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
