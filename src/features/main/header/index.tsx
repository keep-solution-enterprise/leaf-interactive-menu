import {createUseStyles} from "react-jss";
import {
    HEADER_DESCRIPTION_TEXT,
    HEADER_LOYALTY_COUNTER_TEXT,
    HEADER_TITLE_FREE_PRODUCT_TEXT,
    HEADER_TITLE_TEXT
} from "../../../i18n/Constants";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {CategoryDTO} from "../../../types/category/CategoryDTO";
import {formatString, isProductFree, pictureUrl, userId} from "../../../utils/Extensions";
import {useGetBasketItems} from "../../../store/api/AuthSlice";
import {useGetUserInfoQuery} from "../../../store/api/UserApi";

const useStyle = createUseStyles({
    index: {
        display: "flex",
        flexGrow: 1,
        borderRadius: "25px",
        backgroundColor: "#229B80",
        padding: "21px 24px"
    },
    title: {
        color: "#fff",
        lineHeight: "normal",
        fontWeight: 700,
        fontSize: "15px",
        marginBottom: 6
    },
    bottom: {
        color: "rgba(255, 255, 255, 0.80)",
        lineHeight: "normal",
        fontWeight: 400,
        fontSize: "11px",
        margin: 0
    },
    loyaltyCounter: {
        display: "inline-flex",
        padding: "10px 20px",
        textAlign: "center",
        borderRadius: "30px",
        backgroundColor: "#fff",
        color: "#1B1B1B",
        lineHeight: "normal",
        fontWeight: 400,
        fontSize: "12px",
        marginTop: "5px"
    },
    icon: {
        marginLeft: "5px",
        maxWidth: "30vw",
        maxHeight: "12vh"
    },
})
type HeaderProps = {
    categories: CategoryDTO[] | null | undefined
    activeCategory: CategoryDTO | undefined
}
const Header: React.FC<HeaderProps> = ({categories, activeCategory}) => {

    const classes = useStyle()
    const {t} = useTranslation()
    const basketItems = useGetBasketItems()
    const {data: userInfo} = useGetUserInfoQuery(userId)

    const [headerCategory, setHeaderCategory] = useState<CategoryDTO>()
    const [count, setCount] = useState<number>(0)
    const [viewCount, setViewCount] = useState<number>(Number.MIN_VALUE - 1)

    const findLoyalty = (category: CategoryDTO) => userInfo?.data?.loyalties?.find(it => it.category_id === category.id)
    const findViewCount = (): number => {
        const loyaltyCount = headerCategory?.loyalty_count
        if (loyaltyCount) {
            const loyalty = findLoyalty(headerCategory)
            if (loyalty) {
                if (count < loyalty.rest) {
                    if (count < 0)
                        return Number.MIN_VALUE
                    return loyaltyCount - (loyalty.rest - count)
                }
                if (count === loyalty.rest) {
                    return Number.MIN_VALUE
                }
                if (count > loyalty.rest) {
                    const upCount = count - loyalty.rest - 1
                    if (upCount < loyaltyCount)
                        return upCount

                    if (Math.ceil(upCount * loyaltyCount / (loyaltyCount + 1)) % loyaltyCount === 0 && upCount % (loyaltyCount + 1) !== 0)
                        return Number.MIN_VALUE

                    if (upCount > loyaltyCount)
                        return upCount % (loyaltyCount + 1)
                }
            } else {
                if (Math.ceil(count * loyaltyCount / (loyaltyCount + 1)) % loyaltyCount === 0 && count % (loyaltyCount + 1) !== 0)
                    return Number.MIN_VALUE
                return count % (loyaltyCount + 1)
            }
        }
        return Number.MIN_VALUE - 1
    }

    useEffect(() => {
        const currentHeaderCategory = activeCategory?.loyalty_count ? activeCategory : categories?.find(it => it.loyalty_count)
        if (currentHeaderCategory) {
            setHeaderCategory(currentHeaderCategory)
            setCount(
                basketItems
                    .filter(item => item.product.category_id === currentHeaderCategory?.id)
                    .map(item => item.count)
                    .reduce((acc, item) => acc + item, 0) -
                (isProductFree(currentHeaderCategory, findLoyalty(currentHeaderCategory)) ? 1 : 0)
            )
            setViewCount(findViewCount())
        }
    }, [activeCategory, basketItems, categories, findLoyalty, findViewCount]);



    return (
        <div className={classes.index}>
            <div>
                <p className={classes.title}>{
                    formatString(t(viewCount === Number.MIN_VALUE ? HEADER_TITLE_FREE_PRODUCT_TEXT : HEADER_TITLE_TEXT), headerCategory?.name?.toLowerCase())
                }</p>
                {
                    viewCount !== Number.MIN_VALUE && (viewCount > 0 ?
                        <div className={classes.loyaltyCounter}>
                            {formatString(t(HEADER_LOYALTY_COUNTER_TEXT), viewCount, headerCategory?.loyalty_count)}
                        </div>
                        : headerCategory?.loyalty_count &&
                        <p className={classes.bottom}>{formatString(t(HEADER_DESCRIPTION_TEXT), headerCategory.loyalty_count, headerCategory?.name?.toLowerCase(), headerCategory.loyalty_count + 1)}</p>)
                }
            </div>
            <img className={classes.icon} src={pictureUrl(headerCategory?.picture_url)} alt=""/>
        </div>
    )
}

export default Header