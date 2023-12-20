import Header from "../../layouts/header";
import Categories from "./categories";
import Products from "./products";
import GoToPayButton from "../../components/GoToPayButton";
import {createUseStyles} from "react-jss";
import {CategoryDTO} from "../../types/category/CategoryDTO";
import React, {useState} from "react";
import {BasketItemDTO} from "../../types/basket/BasketItemDTO";
import {ProductDTO} from "../../types/product/ProductDTO";


const useStyle = createUseStyles({
    index: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        padding: "15px",
        rowGap: "15px",
    }
})

type MainProps = {
    basketItems: BasketItemDTO[],
    addToBasket: (product: ProductDTO) => void,
    togglePage: ()=>void
}
const Main: React.FC<MainProps> = ({basketItems, addToBasket,togglePage}) => {

    const classes = useStyle()

    const categories: { data: CategoryDTO[] } = {
        data: [
            {
                id: 1,
                name: "Кофе",
                picture_url: ""
            },
            {
                id: 2,
                name: "Напитки",
                picture_url: ""
            },
            {
                id: 3,
                name: "Чаи",
                picture_url: ""
            },
            {
                id: 4,
                name: "Напитки",
                picture_url: ""
            },
            {
                id: 5,
                name: "Чаи",
                picture_url: ""
            },
        ]
    }


    const [activeCategory, setActiveCategory] = useState(categories.data?.at(0))
    const [activeProduct, setActiveProduct] = useState<ProductDTO>()

    const addToBasketWithAction = (product: ProductDTO) => {
        setActiveProduct(product)
        addToBasket(product)
    }


    return (
        <div className={classes.index}>
            <Header product={activeProduct}/>
            <Categories categories={categories.data} active={activeCategory} setActive={setActiveCategory}/>
            <Products category={activeCategory} addToBasket={addToBasketWithAction}/>
            <GoToPayButton basketItems={basketItems} togglePage={togglePage}/>
        </div>
    )
}

export default Main