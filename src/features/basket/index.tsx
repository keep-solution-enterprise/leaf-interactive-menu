import {BasketItemDTO} from "../../types/basket/BasketItemDTO";
import React from "react";
import {ProductDTO} from "../../types/product/ProductDTO";

type BasketProps = {
    basketItems: BasketItemDTO[],
    removeFromBasket: (item: BasketItemDTO) => void
    addToBasket: (item: ProductDTO) => void
}
const Basket: React.FC<BasketProps> = ({basketItems,removeFromBasket,addToBasket}) => {

    return (
        <div></div>
    )
}

export default Basket