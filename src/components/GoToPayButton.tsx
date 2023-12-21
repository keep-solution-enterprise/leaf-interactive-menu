import React from "react";
import {createUseStyles} from "react-jss";
import {BasketItemDTO} from "../types/basket/BasketItemDTO";
import {calculatePrice} from "../utils/Extensions";

const useStyle = createUseStyles<string, { visible: boolean }>({
    index: {
        position: "sticky",
        bottom: "3vh",
        padding: "16px",
        border: 0,
        borderRadius: "100px",
        backgroundColor: "#229B80",
        color: "#fff",
    }
})


type GoToPayButtonProps = {
    basketItems: BasketItemDTO[],
    togglePage: ()=>void
}
const GoToPayButton: React.FC<GoToPayButtonProps> = ({basketItems,togglePage}) => {
    const classes = useStyle({visible: basketItems.length > 0})


    if (basketItems.length === 0)
        return <></>

    return (
        <button className={classes.index} onClick={togglePage}>К оплате: {calculatePrice(basketItems)}сум</button>
    )
}

export default GoToPayButton