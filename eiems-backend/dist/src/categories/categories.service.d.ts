import { PrismaService } from '../prisma/prisma.service';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        name: string;
        type: 'INCOME' | 'EXPENSE';
    }): Promise<{
        id: string;
        name: string;
        type: import("@prisma/client").$Enums.CategoryType;
        isSystem: boolean;
        isActive: boolean;
        createdAt: Date;
    }>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        type: import("@prisma/client").$Enums.CategoryType;
        isSystem: boolean;
        isActive: boolean;
        createdAt: Date;
    } | null>;
    findAll(): Promise<{
        id: string;
        name: string;
        type: import("@prisma/client").$Enums.CategoryType;
        isSystem: boolean;
        isActive: boolean;
        createdAt: Date;
    }[]>;
    update(id: string, data: any): Promise<{
        id: string;
        name: string;
        type: import("@prisma/client").$Enums.CategoryType;
        isSystem: boolean;
        isActive: boolean;
        createdAt: Date;
    }>;
}
