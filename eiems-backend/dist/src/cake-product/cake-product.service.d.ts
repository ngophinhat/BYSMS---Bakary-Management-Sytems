import { PrismaService } from '../prisma/prisma.service';
import { CreateCakeProductDto } from './dto/create-cake-product.dto';
import { CakeCategory, CakeShape, CakeSize } from '@prisma/client';
export declare class CakeProductService {
    private prisma;
    constructor(prisma: PrismaService);
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
        name: string;
        isActive: boolean;
        createdAt: Date;
        category: import("@prisma/client").$Enums.CakeCategory;
        updatedAt: Date;
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
        name: string;
        isActive: boolean;
        createdAt: Date;
        category: import("@prisma/client").$Enums.CakeCategory;
        updatedAt: Date;
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
        name: string;
        isActive: boolean;
        createdAt: Date;
        category: import("@prisma/client").$Enums.CakeCategory;
        updatedAt: Date;
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
        name: string;
        isActive: boolean;
        createdAt: Date;
        category: import("@prisma/client").$Enums.CakeCategory;
        updatedAt: Date;
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
        name: string;
        isActive: boolean;
        createdAt: Date;
        category: import("@prisma/client").$Enums.CakeCategory;
        updatedAt: Date;
        shape: import("@prisma/client").$Enums.CakeShape | null;
        size: import("@prisma/client").$Enums.CakeSize | null;
        ageGroup: import("@prisma/client").$Enums.AgeGroup | null;
        setNumber: number | null;
        setQuantity: number | null;
        isPriceManual: boolean;
        description: string | null;
    }>;
    lookupPrice(cakeProductId: string, shape?: CakeShape, size?: CakeSize): Promise<number>;
    private validateCakeProduct;
}
