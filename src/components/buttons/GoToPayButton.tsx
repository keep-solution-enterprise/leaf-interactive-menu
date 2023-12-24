import React from "react";
import {createUseStyles} from "react-jss";
import {BasketItemDTO} from "../../types/basket/BasketItemDTO";
import {calculatePrice} from "../../utils/Extensions";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";
import {GOT_PAYMENT_TEXT, SOM_TEXT} from "../../i18n/Constants";

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
    const navigate = useNavigate()
    const classes = useStyle({visible: basketItems.length > 0})
    const {t} = useTranslation()

    if (basketItems.length === 0)
        return <></>

    const navigateToBasket = () => navigate("/basket")

    return (
        <button className={classes.index}
                onClick={navigateToBasket}>{t(GOT_PAYMENT_TEXT) + calculatePrice(basketItems) + t(SOM_TEXT)}</button>
    )
}

export default GoToPayButton