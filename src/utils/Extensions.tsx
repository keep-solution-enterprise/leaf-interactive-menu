export const humanizePrice = (price: number): string => {
    const priceTemp = price.toString()
    if (price <= 1000)
        return priceTemp.includes(".") ? priceTemp.substring(0, priceTemp.indexOf(".")) : priceTemp

    return humanizePrice(price / 1000) + "." + priceTemp.substring(priceTemp.length - 3)
}