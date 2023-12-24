import {ProductDTO} from "../../../types/product/ProductDTO";
import React from "react";
import {Col} from "reactstrap";
import {createUseStyles} from "react-jss";
import icPlus from "../../../assets/icons/ic_plus.svg"
import {formatString, humanizePrice, pictureUrl} from "../../../utils/Extensions";
import {useTranslation} from "react-i18next";
import {LOYALTY_TEXT, NEXT_FREE_TEXT, SOM_TEXT} from "../../../i18n/Constants";
import {ProductLoyaltyDTO} from "../../../types/user/UserInfoDTO";

const useStyle = createUseStyles({
    index: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#F6F6F6",
        borderRadius: "20px",
        padding: "22px 23px 16px 23px",
        margin: "5px 0"
    },
    icon: {
        width: "90px",
        height: "140px"
    },
    body: {
        width: "100%",
        marginTop: "19px"
    },
    productName: {
        lineHeight: "23px",
        fontWeight: 400,
        fontSize: "12px",
        marginBottom: 0
    },
    productPriceWrapper: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    productPrice: {
        margin: 0,
        lineHeight: "23px",
        fontWeight: 700,
        fontSize: "15px",
    },
    plusButton: {
        border: 0,
        background: "transparent",
        marginTop:"4px"
    },
    loyaltyText: {
        margin: 0,
        lineHeight: "normal",
        fontWeight: 400,
        fontSize: "8px",
        color: "#fff",
        backgroundColor: "#229B80",
        padding: "2px 1px",
        borderRadius: "5px",
        textAlign: "center"
    }
})

type ProductItemProps = {
    product: ProductDTO,
    onAdd: () => void,
    loyalty: ProductLoyaltyDTO | undefined | null
}
const ProductItem: React.FC<ProductItemProps> = ({product, onAdd, loyalty}) => {

    const classes = useStyle()
    const {t} = useTranslation()

    return (
        <Col xs={6} sm={6} md={6} lg={6}>
            <div className={classes.index} onClick={onAdd}>
                <img className={classes.icon} src={pictureUrl(product.picture_url)} alt=""/>
                <div className={classes.body}>
                    <p className={classes.productName}>{product.name}</p>
                    {
                        product.loyalty_count
                        && <p className={classes.loyaltyText}>
                            {
                                ((loyalty && loyalty.rest === product.loyalty_count && !loyalty.free_given)
                                    ? t(NEXT_FREE_TEXT)
                                    : formatString(t(LOYALTY_TEXT), loyalty ? loyalty.rest : product.loyalty_count))

                            }
                        </p>}
                    <div className={classes.productPriceWrapper}>
                        <p className={classes.productPrice}>{humanizePrice(product.price) + t(SOM_TEXT)}</p>
                        <button className={classes.plusButton}><img src={icPlus.toString()} alt=""/></button>
                    </div>
                </div>
            </div>
        </Col>
    )
}

export default ProductItem