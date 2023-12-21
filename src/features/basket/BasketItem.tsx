import React from "react";
import {BasketItemDTO} from "../../types/basket/BasketItemDTO";
import {createUseStyles} from "react-jss";
import icTemp from "../../assets/icons/ic_temp.png"
import {humanizePrice} from "../../utils/Extensions";
import Counter from "../../components/Counter";


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

    return (
        <div className={classes.index}>
            <img className={classes.icon} src={icTemp.toString()} alt=""/>
            <div className={classes.content}>
                <p className={classes.contentName}>{product.name}</p>
                <div className={classes.contentAmount}>
                    <p className={classes.contentPrice}>{humanizePrice(product.price)} сум</p>
                    <Counter count={count} increase={addToBasket} decrease={removeFromBasket}/>
                </div>
            </div>
        </div>
    )
}
export default BasketItem