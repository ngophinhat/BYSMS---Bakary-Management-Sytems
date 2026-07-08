import { PrismaService } from '../prisma/prisma.service';
import { QueryTaxDto } from './tax.dto';
export declare class TaxService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(query: QueryTaxDto): Promise<{
        id: string;
        name: string;
        type: import("@prisma/client").$Enums.TaxType;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        rate: import("@prisma/client/runtime/library").Decimal;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        type: import("@prisma/client").$Enums.TaxType;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        rate: import("@prisma/client/runtime/library").Decimal;
    }>;
    getActiveTaxes(): Promise<{
        id: string;
        name: string;
        type: import("@prisma/client").$Enums.TaxType;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        rate: import("@prisma/client/runtime/library").Decimal;
    }[]>;
    applyTax(income: number, expense: number, vatRate: number, tndnRate: number): {
        incomeBeforeTax: number;
        vatAmount: number;
        tndnAmount: number;
        totalTax: number;
        incomeAfterTax: number;
    };
}
