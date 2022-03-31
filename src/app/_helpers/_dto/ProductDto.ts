import { BrandDto } from "./BrandDto";
import { CategoryDto } from "./CategoryDto";

export interface ProductDto {
    id: number;
    name: string;
    description: string;
    brand: BrandDto;
    price: number;
    specifications: string;
    category: CategoryDto;
    image: string;
    stock: number;
}