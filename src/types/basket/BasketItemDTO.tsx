import {ProductDTO} from "../product/ProductDTO";

export interface BasketItemDTO {
    product: ProductDTO,
    count: number
}