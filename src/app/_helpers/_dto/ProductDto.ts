import { BrandDto } from "./BrandDto";

export interface ProductDto {
    id: number;
    name: string;
    description: string;
    brand: BrandDto;
    price: number;
    specifications: string;
    image: string;
    stock: number;
}