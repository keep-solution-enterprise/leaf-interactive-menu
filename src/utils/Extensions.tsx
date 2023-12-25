import {BasketItemDTO} from "../types/basket/BasketItemDTO";
import WebApp from "@twa-dev/sdk";
import {ProductDTO} from "../types/product/ProductDTO";
import {ProductLoyaltyDTO} from "../types/user/UserInfoDTO";

export const humanizePrice = (price: number): string => {
    const priceTemp = price.toString()
    if (price <= 1000)
        return priceTemp.includes(".") ? priceTemp.substring(0, priceTemp.indexOf(".")) : priceTemp

    return humanizePrice(price / 1000) + "." + priceTemp.substring(priceTemp.length - 3)
}


export const isProductFree = (
    product: ProductDTO,
    loyalty: ProductLoyaltyDTO | undefined
) => loyalty && loyalty.rest === product.loyalty_count && !loyalty.free_given

export const calculatePrice = (basketItems: BasketItemDTO[], loyalties: ProductLoyaltyDTO[] | undefined): string => humanizePrice(
    basketItems
        .map(item => {
            const loyaltyCount = item.product.loyalty_count
            if (loyaltyCount) {
                const loyalty = loyalties?.find(it => it.product_id === item.product.id)
                if (loyalty) {
                    let count = item.count
                    count -= isProductFree(item.product, loyalty) ? 1 : 0
                    if (count > loyalty.rest) {
                        count -= 1 + ~~((count - loyalty.rest-1) / (loyaltyCount + 1))
                    }
                    return count * item.product.price
                } else {
                    return Math.ceil(item.count * loyaltyCount / (loyaltyCount + 1)) * item.product.price
                }
            }
            return item.count * item.product.price
        })
        .reduce((acc, val) => acc + val, 0)
)

export const pictureUrl = (fileName: string | undefined) => fileName ? process.env.REACT_APP_API_BASE_URL + fileName : undefined

export const formatString = (template: string, ...args: any[]) => {
    return template.replace(/{([0-9]+)}/g, function (match, index) {
        return typeof args[index] === 'undefined' ? match : args[index];
    });
}

export const userId = WebApp.initDataUnsafe.user?.id ?? 280838813

