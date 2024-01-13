import {BasketItemDTO} from "../types/basket/BasketItemDTO";
import WebApp from "@twa-dev/sdk";
import {LoyaltyDTO} from "../types/user/UserInfoDTO";
import {CategoryDTO} from "../types/category/CategoryDTO";

export const humanizePrice = (price: number): string => {
    const priceTemp = price.toString()
    if (price <= 1000)
        return priceTemp.includes(".") ? priceTemp.substring(0, priceTemp.indexOf(".")) : priceTemp

    return humanizePrice(price / 1000) + "." + priceTemp.substring(priceTemp.length - 3)
}


export const isProductFree = (
    category: CategoryDTO,
    loyalty: LoyaltyDTO | undefined
) => loyalty && loyalty.rest === category.loyalty_count && !loyalty.free_given

export const calculatePrice = (basketItems: BasketItemDTO[], categories: CategoryDTO[] | undefined, loyalties: LoyaltyDTO[] | undefined): string => {

    const loyaltyCategories = categories?.filter(it => it.loyalty_count !== null && it.loyalty_count !== undefined)

    const priceWithDiscount = loyaltyCategories
        ?.map(category => {
            const items = basketItems.filter(item => item.product.category_id === category.id)
            const loyaltyCount = category.loyalty_count!!
            const loyalty = loyalties?.find(it => it.category_id === category.id)

            let freeCount = findFreeCount(category, items.map(it => it.count).reduce((acc, val) => acc + val, 0), loyalty, loyaltyCount)


            let tempCount = 0
            return items
                .sort(it => it.product.price)
                .map(item => {
                    if (item.count >= freeCount) {
                        tempCount = item.count - freeCount
                        freeCount = 0
                        return tempCount * item.product.price
                    }
                    freeCount -= item.count
                    return 0
                })
                .reduce((acc, val) => acc + val, 0)
        })
        .reduce((acc, val) => acc + val, 0) ?? 0

    const priceWithoutDiscount = basketItems
        .filter(item => !loyaltyCategories?.map(it => it.id)?.includes(item.product.category_id))
        .map(item => item.count * item.product.price)
        .reduce((acc, val) => acc + val, 0)

    return humanizePrice(priceWithDiscount + priceWithoutDiscount)
}

const findFreeCount = (category: CategoryDTO, fullCount: number, loyalty: LoyaltyDTO | undefined, loyaltyCount: number) => {
    if (loyalty) {
        let count = fullCount - (isProductFree(category, loyalty) ? 1 : 0)
        if (count > loyalty.rest) {
            count -= 1 + ~~((count - loyalty.rest - 1) / (loyaltyCount + 1))
        }
        return fullCount - count
    }
    return fullCount - Math.ceil(fullCount * loyaltyCount / (loyaltyCount + 1))
}

export const pictureUrl = (fileName: string | undefined) => fileName ? process.env.REACT_APP_API_BASE_URL + fileName : undefined

export const formatString = (template: string, ...args: any[]) => {
    return template.replace(/{([0-9]+)}/g, function (match, index) {
        return typeof args[index] === 'undefined' ? match : args[index];
    });
}

export const userId = WebApp.initDataUnsafe.user?.id ?? 280838813

