import { CakeCategory, CakeShape, CakeSize, AgeGroup } from '@prisma/client';
export declare class CreateCakePriceDto {
    shape?: CakeShape;
    size?: CakeSize;
    price: number;
}
export declare class CreateCakeProductDto {
    category: CakeCategory;
    name: string;
    shape?: CakeShape;
    size?: CakeSize;
    ageGroup?: AgeGroup;
    setNumber?: number;
    setQuantity?: number;
    isPriceManual?: boolean;
    description?: string;
    isActive?: boolean;
    prices: CreateCakePriceDto[];
}
