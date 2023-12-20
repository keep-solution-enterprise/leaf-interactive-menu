import {ProductDTO} from "../../../types/product/ProductDTO";
import React from "react";
import {Col} from "reactstrap";
import {createUseStyles} from "react-jss";
import icTemp from "../../../assets/icons/ic_temp.svg"
import icPlus from "../../../assets/icons/ic_plus.svg"
import {humanizePrice} from "../../../utils/Extensions";

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
        marginBottom:"4px"
    },
    productPriceWrapper: {
        display: "flex",
        justifyContent: "space-between",
        alignItems:"center"
    },
    productPrice: {
        margin:0,
        lineHeight: "23px",
        fontWeight: 700,
        fontSize: "15px",
    },
    plusButton:{
        border:0,
        background:"transparent"
    }
})

type ProductItemProps = {
    product: ProductDTO,
    onAdd: ()=>void
}
const ProductItem: React.FC<ProductItemProps> = ({product,onAdd}) => {

    const classes = useStyle()

    return (
        <Col xs={6} sm={6} md={6} lg={6}>
            <div className={classes.index}>
                <img className={classes.icon} src={icTemp.toString()} alt=""/>
                <div className={classes.body}>
                    <p className={classes.productName}>{product.name}</p>
                    <div className={classes.productPriceWrapper}>
                        <p className={classes.productPrice}>{humanizePrice(product.price)}сум</p>
                        <button className={classes.plusButton} onClick={onAdd}><img src={icPlus.toString()} alt=""/></button>
                    </div>
                </div>
            </div>
        </Col>
    )
}

export default ProductItem