import { BrandDto } from "./BrandDto";

export interface SaveProductDto {
    name: string;
    brand: string;
    price: number;
    description: string;
    stock: number;
    specifications: any;
    category: string;
    image: string;
}