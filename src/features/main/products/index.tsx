import React from "react";
import {CategoryDTO} from "../../../types/category/CategoryDTO";
import {createUseStyles} from "react-jss";
import {ProductDTO} from "../../../types/product/ProductDTO";
import {Row} from "reactstrap";
import ProductItem from "./ProductItem";


const useStyle = createUseStyles({
    index: {},
    header: {
        display: "flex",
        justifyContent: "space-between"
    },
    headerName: {
        lineHeight: "23px",
        fontWeight: 700,
        fontSize: "18px",
        margin: 0
    },
    headerDescription: {
        color: "#9A9A9A",
        lineHeight: "23px",
        fontWeight: 400,
        fontSize: "12px",
        margin: 0
    }
})

type ProductsProps = {
    category: CategoryDTO | undefined,
    addToBasket: (product: ProductDTO) => void
}
const Products: React.FC<ProductsProps> = ({category, addToBasket}) => {

    const classes = useStyle()

    const products: { data: ProductDTO[] } = {
        data: [
            {
                id: 1,
                name: "Раф ванильный",
                picture_url: "",
                price: 1125000
            },
            {
                id: 2,
                name: "Латте",
                picture_url: "",
                price: 15000
            },
            {
                id: 3,
                name: "Раф ванильный",
                picture_url: "",
                price: 25000
            },
            {
                id: 4,
                name: "Латте",
                picture_url: "",
                price: 15000
            },
            {
                id: 9,
                name: "Раф ванильный",
                picture_url: "",
                price: 1125000
            },
            {
                id: 10,
                name: "Латте",
                picture_url: "",
                price: 15000
            },
            {
                id: 11,
                name: "Раф ванильный",
                picture_url: "",
                price: 25000
            },
            {
                id: 12,
                name: "Латте",
                picture_url: "",
                price: 15000
            },
            {
                id: 5,
                name: "Раф ванильный",
                picture_url: "",
                price: 1125000
            },
            {
                id: 6,
                name: "Латте",
                picture_url: "",
                price: 15000
            },
            {
                id: 7,
                name: "Раф ванильный",
                picture_url: "",
                price: 25000
            },
            {
                id: 8,
                name: "Латте",
                picture_url: "",
                price: 15000
            },
        ]
    }


    if (!category)
        return <></>

    return (
        <div className={classes.index}>
            <div className={classes.header}>
                <p className={classes.headerName}>{category.name}</p>
                <p className={classes.headerDescription}>{products.data?.length} видов</p>
            </div>
            <Row>
                {
                    products.data?.map(item => <ProductItem
                        key={item.id}
                        onAdd={() => addToBasket(item)}
                        product={item}/>)
                }
            </Row>
        </div>
    )
}

export default Products