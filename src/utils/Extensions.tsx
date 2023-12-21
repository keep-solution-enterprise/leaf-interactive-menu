import {BasketItemDTO} from "../types/basket/BasketItemDTO";

export const humanizePrice = (price: number): string => {
    const priceTemp = price.toString()
    if (price <= 1000)
        return priceTemp.includes(".") ? priceTemp.substring(0, priceTemp.indexOf(".")) : priceTemp

    return humanizePrice(price / 1000) + "." + priceTemp.substring(priceTemp.length - 3)
}


export const calculatePrice = (basketItems:BasketItemDTO[]): string => humanizePrice(
    basketItems.map(item => item.count * item.product.price).reduce((acc, val) => acc + val, 0)
)