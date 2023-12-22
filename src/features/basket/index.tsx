import {BasketItemDTO} from "../../types/basket/BasketItemDTO";
import React, {useState} from "react";
import {createUseStyles} from "react-jss";
import icArrowLeft from "../../assets/icons/arrow/ic_arrow_left.svg"
import BasketItem from "./BasketItem";
import {calculatePrice, humanizePrice} from "../../utils/Extensions";
import SuccessButton from "../../components/buttons/SuccessButton";
import {useNavigate} from "react-router";
import {addToBasket, removeFromBasket, useGetBasketItems} from "../../store/api/AuthSlice";
import {useDispatch} from "../../store/Store";
const BranchModal = React.lazy(()=>import("../../components/modals/BranchModal"));



const useStyle = createUseStyles({
    index: {
        display: "flex",
        position: "relative",
        flexDirection: "column",
        padding: "15px",
        rowGap: "10px",
        height: "100vh"
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        position: "absolute",
        top: "10px",
        left: "15px"
    },
    headerText: {
        margin: 0,
        lineHeight: "23px",
        fontWeight: 700,
        fontSize: "16px"
    },
    body: {
        overflowY: "auto",
        maxHeight: "63vh"
    },
    footer: {
        position: "absolute",
        bottom: 0,
        backgroundColor: "#F6F6F6",
        borderRadius: "25px 25px 0 0",
        padding: "26px",
        right: 0,
        left: 0,
        maxHeight: "30vh",
        overflowY: "auto"
    },
    totalListItem: {
        display: "flex",
        justifyContent: "space-between",
        padding: "6px 0"
    },
    totalListItemName: {
        margin: 0,
        lineHeight: "normal",
        fontWeight: 400,
        fontSize: "12px",
        color: "#1B1B1B",
        opacity: .5
    },
    totalListItemPrice: {
        margin: 0,
        lineHeight: "normal",
        fontWeight: 700,
        fontSize: "12px",
        color: "#1B1B1B"
    },
    totalListSum: {
        display: "flex",
        justifyContent: "space-between",
        borderTop: "1px solid #B7B7B7",
        padding: "6px 0",
        marginBottom: "14px"
    },
    totalListSumName: {
        margin: 0,
        lineHeight: "normal",
        fontWeight: 400,
        fontSize: "16px",
        color: "#1B1B1B",
        opacity: .5
    },
    totalListSumPrice: {
        margin: 0,
        lineHeight: "normal",
        fontWeight: 700,
        fontSize: "16px",
        color: "#1B1B1B"
    },
})

const Basket = () => {

    const classes = useStyle()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const basketItems = useGetBasketItems()
    const [branchModalOpen,setBranchModalOpen]=useState(false)


    const navigateToMain = () => navigate("/")

    const toggleBranchModal=()=> setBranchModalOpen(p=>!p)

    const addItemToBasket = (item: BasketItemDTO) => {
        dispatch(addToBasket(item.product))
    }
    const removeItemFromBasket = (item: BasketItemDTO) => {
        dispatch(removeFromBasket(item))
    }


    return (
        <div className={classes.index}>
            <div className={classes.header}>
                <img onClick={navigateToMain} className={classes.icon} src={icArrowLeft.toString()} alt=""/>
                <p className={classes.headerText}>Корзина</p>
            </div>
            <div className={classes.body}>
                {
                    [...basketItems]
                        .sort((it1, it2) => it1.product.id - it2.product.id)
                        .map(item => <BasketItem
                            key={item.product.id}
                            item={item}
                            removeFromBasket={() => removeItemFromBasket(item)}
                            addToBasket={() => addItemToBasket(item)}
                        />)
                }
            </div>
            {
                basketItems.length > 0 && <div className={classes.footer}>
                    {
                        [...basketItems]
                            .sort((it1, it2) => it1.product.id - it2.product.id)
                            .map(item => (
                            <div key={item.product.id} className={classes.totalListItem}>
                                <p className={classes.totalListItemName}>{item.product.name}</p>
                                <p className={classes.totalListItemPrice}>{humanizePrice(item.product.price * item.count)}сум</p>
                            </div>
                        ))
                    }
                    <div className={classes.totalListSum}>
                        <p className={classes.totalListSumName}>Итого:</p>
                        <p className={classes.totalListSumPrice}>{calculatePrice(basketItems)}сум</p>
                    </div>
                    <SuccessButton content={"Выбрать филиал"} onClick={toggleBranchModal}/>
                </div>
            }
            <BranchModal open={branchModalOpen} toggle={toggleBranchModal}/>
        </div>
    )
}

export default Basket