import Header from "./main/header";
import Categories from "./main/categories";
import Products from "./main/products";
import GoToPayButton from "../components/buttons/GoToPayButton";
import {createUseStyles} from "react-jss";
import React, {useState} from "react";
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
    const {data:categories}=
        useGetCategoriesQuery(userId)


    const [activeCategory, setActiveCategory] = useState(categories?.data?.at(0))


    return (
        <div className={classes.index}>
            <Header categories={categories?.data} activeCategory={activeCategory}/>
            <Categories categories={categories?.data!!} active={activeCategory} setActive={setActiveCategory}/>
            <Products category={activeCategory}/>
            <GoToPayButton/>
        </div>
    )
}

export default Main