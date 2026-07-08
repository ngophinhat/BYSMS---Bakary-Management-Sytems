import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private categoriesService;
    constructor(categoriesService: CategoriesService);
    create(body: any): Promise<{
        id: string;
        name: string;
        type: import("@prisma/client").$Enums.CategoryType;
        isSystem: boolean;
        isActive: boolean;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        type: import("@prisma/client").$Enums.CategoryType;
        isSystem: boolean;
        isActive: boolean;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        type: import("@prisma/client").$Enums.CategoryType;
        isSystem: boolean;
        isActive: boolean;
        createdAt: Date;
    } | null>;
    update(id: string, body: any): Promise<{
        id: string;
        name: string;
        type: import("@prisma/client").$Enums.CategoryType;
        isSystem: boolean;
        isActive: boolean;
        createdAt: Date;
    }>;
}
