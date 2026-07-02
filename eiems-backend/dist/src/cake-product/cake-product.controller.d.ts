import { CakeProductService } from './cake-product.service';
import { CreateCakeProductDto } from './dto/create-cake-product.dto';
import { CakeCategory } from '@prisma/client';
export declare class CakeProductController {
    private readonly cakeProductService;
    constructor(cakeProductService: CakeProductService);
    create(dto: CreateCakeProductDto): Promise<{
        prices: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            shape: import("@prisma/client").$Enums.CakeShape | null;
            size: import("@prisma/client").$Enums.CakeSize | null;
            price: import("@prisma/client/runtime/library").Decimal;
            cakeProductId: string;
        }[];
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        category: import("@prisma/client").$Enums.CakeCategory;
        shape: import("@prisma/client").$Enums.CakeShape | null;
        size: import("@prisma/client").$Enums.CakeSize | null;
        ageGroup: import("@prisma/client").$Enums.AgeGroup | null;
        setNumber: number | null;
        setQuantity: number | null;
        isPriceManual: boolean;
        description: string | null;
    }>;
    findAll(category?: CakeCategory): Promise<({
        prices: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            shape: import("@prisma/client").$Enums.CakeShape | null;
            size: import("@prisma/client").$Enums.CakeSize | null;
            price: import("@prisma/client/runtime/library").Decimal;
            cakeProductId: string;
        }[];
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        category: import("@prisma/client").$Enums.CakeCategory;
        shape: import("@prisma/client").$Enums.CakeShape | null;
        size: import("@prisma/client").$Enums.CakeSize | null;
        ageGroup: import("@prisma/client").$Enums.AgeGroup | null;
        setNumber: number | null;
        setQuantity: number | null;
        isPriceManual: boolean;
        description: string | null;
    })[]>;
    findOne(id: string): Promise<{
        prices: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            shape: import("@prisma/client").$Enums.CakeShape | null;
            size: import("@prisma/client").$Enums.CakeSize | null;
            price: import("@prisma/client/runtime/library").Decimal;
            cakeProductId: string;
        }[];
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        category: import("@prisma/client").$Enums.CakeCategory;
        shape: import("@prisma/client").$Enums.CakeShape | null;
        size: import("@prisma/client").$Enums.CakeSize | null;
        ageGroup: import("@prisma/client").$Enums.AgeGroup | null;
        setNumber: number | null;
        setQuantity: number | null;
        isPriceManual: boolean;
        description: string | null;
    }>;
    update(id: string, dto: Partial<CreateCakeProductDto>): Promise<{
        prices: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            shape: import("@prisma/client").$Enums.CakeShape | null;
            size: import("@prisma/client").$Enums.CakeSize | null;
            price: import("@prisma/client/runtime/library").Decimal;
            cakeProductId: string;
        }[];
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        category: import("@prisma/client").$Enums.CakeCategory;
        shape: import("@prisma/client").$Enums.CakeShape | null;
        size: import("@prisma/client").$Enums.CakeSize | null;
        ageGroup: import("@prisma/client").$Enums.AgeGroup | null;
        setNumber: number | null;
        setQuantity: number | null;
        isPriceManual: boolean;
        description: string | null;
    }>;
    toggleActive(id: string): Promise<{
        prices: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            shape: import("@prisma/client").$Enums.CakeShape | null;
            size: import("@prisma/client").$Enums.CakeSize | null;
            price: import("@prisma/client/runtime/library").Decimal;
            cakeProductId: string;
        }[];
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        category: import("@prisma/client").$Enums.CakeCategory;
        shape: import("@prisma/client").$Enums.CakeShape | null;
        size: import("@prisma/client").$Enums.CakeSize | null;
        ageGroup: import("@prisma/client").$Enums.AgeGroup | null;
        setNumber: number | null;
        setQuantity: number | null;
        isPriceManual: boolean;
        description: string | null;
    }>;
}
