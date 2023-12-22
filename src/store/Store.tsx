import {combineReducers, configureStore} from "@reduxjs/toolkit"
import {useDispatch as useStoreDispatch} from "react-redux"
import {categoryApi} from "./api/CategoryApi";
import authSlice from "./api/AuthSlice";
import {productApi} from "./api/ProductApi";
import {orderApi} from "./api/OrderApi";
import {branchApi} from "./api/BranchApi";

// List reducers
export const reducer = combineReducers({
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [branchApi.reducerPath]: branchApi.reducer,
    auth:authSlice
})

export type StoreState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch

export const useDispatch = () => useStoreDispatch<AppDispatch>()


export const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({immutableCheck: false})
            .concat(categoryApi.middleware)
            .concat(productApi.middleware)
            .concat(orderApi.middleware)
            .concat(branchApi.middleware)
})
