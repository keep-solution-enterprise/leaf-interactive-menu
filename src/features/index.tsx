import Header from "./main/header";
import Categories from "./main/categories";
import Products from "./main/products";
import GoToPayButton from "../components/buttons/GoToPayButton";
import {createUseStyles} from "react-jss";
import React, {useState} from "react";
import {ProductDTO} from "../types/product/ProductDTO";
import {addToBasket, useGetBasketItems} from "../store/api/AuthSlice";
import {useDispatch} from "../store/Store";
import {useGetCategoriesQuery} from "../store/api/CategoryApi";
import {userId} from "../utils/Extensions";


const useStyle = createUseStyles({
    index: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        padding: "15px",
        rowGap: "15px",
    }
})

const Main = () => {

    const classes = useStyle()
    const basketItems = useGetBasketItems()
    const {data:categories}=
        useGetCategoriesQuery(userId)


    const [activeCategory, setActiveCategory] = useState(categories?.data?.at(0))


    return (
        <div className={classes.index}>
            <Header/>
            <Categories categories={categories?.data!!} active={activeCategory} setActive={setActiveCategory}/>
            <Products category={activeCategory}/>
            <GoToPayButton basketItems={basketItems}/>
        </div>
    )
}

export default Main