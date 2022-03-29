import { ProductDto } from "./ProductDto";
import { UserDto } from "./UserDto";

export interface BasketDto {
    id: number;
    products: ProductDto[];
}