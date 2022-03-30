import { ProductDto } from "./ProductDto";
import { UserDto } from "./UserDto";

export interface BasketDetailDto {
    id: number;
    product: ProductDto;
    quantity: number;
}