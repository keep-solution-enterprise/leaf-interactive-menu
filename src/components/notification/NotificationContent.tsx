import {ProductDTO} from "../../types/product/ProductDTO";
import React from "react";
import {createUseStyles} from "react-jss";
import {pictureUrl} from "../../utils/Extensions";
import icChecked from "../../assets/icons/ic_checked.svg"



const useStyle = createUseStyles({
    notification: {
        position: "sticky",
        top: "10px",
        display: "flex",
        boxShadow: "0px 8px 8px -4px rgba(16, 24, 40, 0.03), 0px 20px 24px -4px rgba(16, 24, 40, 0.08)",
        borderRadius: "13px",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 10px"
    },

    icon: {
        height: "50px",
        width: "30px",
        margin: "12px"
    },
    notificationContent: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
    },
    notificationTitle: {
        lineHeight: "18px",
        fontWeight: 700,
        fontSize: "12px",
        margin: 0
    },
    notificationDescription: {
        color: "#1B1B1B",
        lineHeight: "12px",
        fontWeight: 400,
        fontSize: "8px",
        margin: 0
    },
    iconChecked: {
        width: "25px",
        height: "25px"
    }
})

type NotificationContentProps={
    product:ProductDTO
}

const NotificationContent:React.FC<NotificationContentProps>=({product})=>{


    const classes = useStyle()

    return (
        <div className={classes.notification}>
            <img className={classes.icon} src={pictureUrl(product.picture_url)} alt=""/>
            <div className={classes.notificationContent}>
                <p className={classes.notificationTitle}>Продукт добавлен в корзину</p>
                <p className={classes.notificationDescription}>Вы можете продолжить покупки или перейти к
                    оформлению заказа.</p>
            </div>
            <img className={classes.iconChecked} src={icChecked.toString()} alt=""/>
        </div>
    )

}

export default NotificationContent