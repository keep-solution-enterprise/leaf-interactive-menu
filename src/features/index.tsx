import Header from "../layouts/header";
import Categories from "./main/categories";
import Products from "./main/products";
import GoToPayButton from "../components/GoToPayButton";
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
    const dispatch=useDispatch()
    const basketItems = useGetBasketItems()
    const {data:categories}=
        useGetCategoriesQuery(userId)


    const [activeCategory, setActiveCategory] = useState(categories?.data?.at(0))
    const [activeProduct, setActiveProduct] = useState<ProductDTO | undefined>(basketItems.length > 0
        ? basketItems.at(basketItems.length - 1)?.product : undefined)

    const addToBasketWithAction = (product: ProductDTO) => {
        setActiveProduct(product)
        dispatch(addToBasket(product))
    }

    return (
        <div className={classes.index}>
            <Header product={activeProduct}/>
            <Categories categories={categories?.data!!} active={activeCategory} setActive={setActiveCategory}/>
            <Products category={activeCategory} addToBasket={addToBasketWithAction}/>
            <GoToPayButton basketItems={basketItems}/>
        </div>
    )
}

export default Main