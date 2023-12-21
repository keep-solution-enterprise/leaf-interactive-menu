import {createUseStyles} from "react-jss";
import React from "react";
import icChecked from "../../assets/icons/ic_checked.svg"
import SuccessButton from "../../components/SuccessButton";
import {calculatePrice, humanizePrice} from "../../utils/Extensions";
import {clearBasket, useGetBasketItems} from "../../store/api/AuthSlice";
import {useNavigate} from "react-router";
import {useDispatch} from "../../store/Store";

const useStyle = createUseStyles({
    index: {
        display: "flex",
        position: "relative",
        flexDirection: "column",
        padding: "15px",
        rowGap: "10px",
        height: "100vh"
    },
    body: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "0 20vw"
    },

    bodyTitle: {
        margin: 0,
        lineHeight: "23px",
        fontWeight: 400,
        fontSize: "15px",
        color: "#1B1B1B",
        textAlign: "center"
    },
    bodyDescription: {
        margin: 0,
        lineHeight: "15px",
        fontWeight: 400,
        fontSize: "10px",
        color: "#767676",
        textAlign: "center"
    },

    footer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0px -2.885px 33.654px 0px rgba(141, 141, 141, 0.25)",
        position: "absolute",
        bottom: 0,
        borderRadius: "25px 25px 0 0",
        padding: "26px",
        right: 0,
        left: 0,
        maxHeight: "30vh",
        overflowY: "auto"
    },
    footerPrice: {
        margin: 0,
        lineHeight: "normal",
        fontWeight: 700,
        fontSize: "17px",
    }
})


const SuccessMenu = () => {

    const classes = useStyle()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const basketItems = useGetBasketItems()


    const goMain = () => {
        dispatch(clearBasket())
        navigate("/")
    }


    return (
        <div className={classes.index}>

            <div className={classes.body}>
                <img src={icChecked.toString()} alt=""/>
                <p className={classes.bodyTitle}>Заказ успешно создан</p>
                <p className={classes.bodyDescription}>Ваш заказ успешно создан и будет готов в ближайшее время.</p>
            </div>

            <div className={classes.footer}>
                <p className={classes.footerPrice}>{calculatePrice(basketItems)} сум</p>
                <SuccessButton content={"В меню"} onClick={goMain} width={"50%"}/>
            </div>
        </div>
    )
}

export default SuccessMenu