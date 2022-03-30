import { BasketDetailDto } from "./BasketDetailDto";
import { ProductDto } from "./ProductDto";
import { UserDto } from "./UserDto";

export interface BasketDto {
    id: number;
    basketDetails: BasketDetailDto[];
}