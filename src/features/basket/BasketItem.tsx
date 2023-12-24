import React from "react";
import {BasketItemDTO} from "../../types/basket/BasketItemDTO";
import {createUseStyles} from "react-jss";
import {humanizePrice, pictureUrl} from "../../utils/Extensions";
import Counter from "../../components/Counter";
import {useTranslation} from "react-i18next";
import {SOM_TEXT} from "../../i18n/Constants";


const useStyle = createUseStyles({
    index: {
        display:"flex",
        padding:"10.5px 10.5px 14px 10.5px",
        columnGap:"20px",
        borderBottom:"1px solid #EEEFEF"
    },
    icon:{
        width: "40px",
        height:"65px"
    },
    content:{
        display: "flex",
        flexDirection:"column",
        rowGap:"10px",
        width:"100%"
    },
    contentName:{
        margin:0,
        lineHeight: "23px",
        fontWeight: 600,
        fontSize: "18px",
        color:"#1B1B1B"
    },
    contentAmount:{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
    },
    contentPrice:{
        margin:0,
        lineHeight: "normal",
        fontWeight: 700,
        fontSize: "15px",
        color:"#1B1B1B"
    }
})

type BasketItemProps={
    item: BasketItemDTO,
    removeFromBasket: () => void
    addToBasket: () => void,
}
const BasketItem:React.FC<BasketItemProps>=({item:{product,count},removeFromBasket,addToBasket})=>{


    const classes = useStyle()
    const {t}=useTranslation()

    return (
        <div className={classes.index}>
            <img className={classes.icon} src={pictureUrl(product.picture_url)} alt=""/>
            <div className={classes.content}>
                <p className={classes.contentName}>{product.name}</p>
                <div className={classes.contentAmount}>
                    <p className={classes.contentPrice}>{humanizePrice(product.price)+t(SOM_TEXT)}</p>
                    <Counter count={count} increase={addToBasket} decrease={removeFromBasket}/>
                </div>
            </div>
        </div>
    )
}
export default BasketItem