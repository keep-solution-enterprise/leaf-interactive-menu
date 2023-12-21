import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {useSelector} from "react-redux"
import {StoreState} from "../Store"
import {BasketItemDTO} from "../../types/basket/BasketItemDTO";
import {ProductDTO} from "../../types/product/ProductDTO";

export interface StateProps {
    basketItems: BasketItemDTO[]
}

const initialState: StateProps = {
    basketItems: []
}


const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        addToBasket: (state, action: PayloadAction<ProductDTO>) => {

            const crtIndex = state.basketItems.findIndex(item => item.product.id === action.payload.id)

            if (crtIndex === -1) {
                state.basketItems.push({product: action.payload, count: 1})
            } else {
                state.basketItems[crtIndex].count++
            }
        },
        removeFromBasket: (state, action: PayloadAction<BasketItemDTO>) => {
            const {product, count} = action.payload
            state.basketItems = state.basketItems.filter(item => item.product.id !== product.id)
            if (count - 1 > 0) {
                state.basketItems.push({product, count: count - 1})
            }
        },
        clearBasket: (state) => {
            state.basketItems = []
        }
    }
})

export default authSlice.reducer
// Обновить токен
export const {addToBasket, removeFromBasket,clearBasket} = authSlice.actions
// Получить токен
export const useGetBasketItems = () => useSelector((state: StoreState) => state.auth.basketItems)
