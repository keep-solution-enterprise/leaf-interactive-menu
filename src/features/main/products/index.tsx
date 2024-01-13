import React from "react";
import {CategoryDTO} from "../../../types/category/CategoryDTO";
import {createUseStyles} from "react-jss";
import {ProductDTO} from "../../../types/product/ProductDTO";
import {Row} from "reactstrap";
import ProductItem from "./ProductItem";
import {useGetProductsQuery} from "../../../store/api/ProductApi";
import {userId} from "../../../utils/Extensions";
import Loader from "../../../components/loader/Loader";
import {useDispatch} from "../../../store/Store";
import {addToBasket} from "../../../store/api/AuthSlice";
import {toast} from "react-toastify";
import NotificationContent from "../../../components/notification/NotificationContent";
import {toastOptions} from "../../../utils/Constants";
import {TYPES_TEXT} from "../../../i18n/Constants";
import {useTranslation} from "react-i18next";

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
    category: CategoryDTO | undefined
}
const Products: React.FC<ProductsProps> = ({category}) => {

    const classes = useStyle()
    const {t} = useTranslation()
    const dispatch = useDispatch()

    const {data: products, isFetching} =
        useGetProductsQuery({user_id: userId, category_id: category?.id})

    if (!category)
        return <></>

    const onAdd = (product: ProductDTO) => {
        toast(<NotificationContent product={product}/>, toastOptions)
        dispatch(addToBasket(product))
    }

    return (
        <div className={classes.index}>
            <div className={classes.header}>
                <p className={classes.headerName}>{category.name}</p>
                <p className={classes.headerDescription}>{products?.data?.length + t(TYPES_TEXT)}</p>
            </div>
            <Row>
                {
                    products
                        ?.data
                        ?.map(item => <ProductItem
                            key={item.id}
                            onAdd={() => onAdd(item)}
                            product={item}
                        />)
                }
            </Row>
            {isFetching && <Loader/>}
        </div>
    )
}

export default Products