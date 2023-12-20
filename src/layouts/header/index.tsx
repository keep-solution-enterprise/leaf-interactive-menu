import {createUseStyles} from "react-jss";
import {HEADER_BOTTOM_TEXT, HEADER_TITLE_TEXT} from "../../utils/Text";
import {ProductDTO} from "../../types/product/ProductDTO";
import React from "react";
import icTemp from "../../assets/icons/ic_temp.svg"

const useStyle = createUseStyles({
    notification: {
        position:"sticky",
        top:"10px",
        display: "flex",
        boxShadow:"0px 8px 8px -4px rgba(16, 24, 40, 0.03), 0px 20px 24px -4px rgba(16, 24, 40, 0.08)",
        borderRadius:"13px",
        backgroundColor:"#fff"
    },

    icon: {
        height: "50px",
        width: "30px",
        margin:"12px"
    },
    notificationContent: {
        display:"flex",
        justifyContent:"center",
        flexDirection:"column"
    },
    notificationTitle: {
        lineHeight: "18px",
        fontWeight: 700,
        fontSize: "12px",
        margin: 0
    },
    notificationDescription: {
        color:"#1B1B1B",
        lineHeight: "12px",
        fontWeight: 400,
        fontSize: "8px",
        margin: 0
    },
    title: {
        color: "#1B1B1B",
        lineHeight: "25px",
        fontWeight: 700,
        fontSize: "20px",
        marginBottom: 6
    },
    bottom: {
        color: "#767676",
        lineHeight: "15px",
        fontWeight: 400,
        fontSize: "12px",
        margin: 0
    }
})
type HeaderProps = {
    product: ProductDTO | undefined
}
const Header: React.FC<HeaderProps> = ({product}) => {

    const classes = useStyle()

    return (

                product
                    ? <div className={classes.notification}>
                        <img className={classes.icon} src={icTemp.toString()} alt={icTemp.toString()}/>
                        <div className={classes.notificationContent}>
                            <p className={classes.notificationTitle}>Продукт добавлен в корзину</p>
                            <p className={classes.notificationDescription}>Вы можете продолжить покупки или перейти к
                                оформлению заказа.</p>
                        </div>
                    </div>
                    : <div>
                        <p className={classes.title}>{HEADER_TITLE_TEXT}</p>
                        <p className={classes.bottom}>{HEADER_BOTTOM_TEXT}</p>
                    </div>

    )
}

export default Header