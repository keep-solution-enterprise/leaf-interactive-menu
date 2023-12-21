import React from "react";
import {createUseStyles} from "react-jss";
import {BasketItemDTO} from "../types/basket/BasketItemDTO";
import {calculatePrice} from "../utils/Extensions";
import {useNavigate} from "react-router";

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
}
const GoToPayButton: React.FC<GoToPayButtonProps> = ({basketItems}) => {
    const navigate=useNavigate()
    const classes = useStyle({visible: basketItems.length > 0})

    if (basketItems.length === 0)
        return <></>

    const navigateToBasket=()=>navigate("/basket")

    return (
        <button className={classes.index} onClick={navigateToBasket}>К оплате: {calculatePrice(basketItems)}сум</button>
    )
}

export default GoToPayButton