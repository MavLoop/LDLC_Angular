import { BrandDto } from "./BrandDto";

export interface PatchProductDto {
    id: number;
    name: string;
    brand: string;
    price: number;
    description: string;
    stock: number;
    specifications: any;
    category: string;
    image: string;
}