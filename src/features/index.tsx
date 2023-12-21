import {useState} from "react";
import {BasketItemDTO} from "../types/basket/BasketItemDTO";
import {ProductDTO} from "../types/product/ProductDTO";
import Main from "./main";
import Basket from "./basket";

const Index = () => {

    const [basketItems, setBasketItems] = useState<BasketItemDTO[]>([])
    const [showMain, setMain] = useState(true)

    const addToBasket = (product: ProductDTO) => {
        setBasketItems(p => {
            const crtIndex = p.findIndex(item => item.product.id === product.id)
            if (crtIndex === -1) {
                p.push({product, count: 1})
                return [...p]
            }
            p[crtIndex].count++
            return [...p]
        })
    }

    const removeFromBasket = (basketItem: BasketItemDTO) => {
        setBasketItems(p => {
            basketItem.count--
            const newVersion = p.filter(item => item.product.id !== basketItem.product.id)
            if (basketItem.count > 0) {
                return [...newVersion, basketItem]
            }
            return [...newVersion]
        })
    }

    const togglePage = () => setMain(p => !p)


    // return <SuccessMenu price={145000}/>

    return (
        showMain
            ? <Main togglePage={togglePage} basketItems={basketItems} addToBasket={addToBasket}/>
            : <Basket basketItems={basketItems} removeFromBasket={removeFromBasket} addToBasket={addToBasket} togglePage={togglePage}/>
    )

}

export default Index