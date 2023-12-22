import {apiQuery} from "../utils/Extensions";
import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {ProductRequestDTO} from "../../types/product/ProductDTO";


export const orderApi = createApi({
    reducerPath: "order",
    baseQuery: apiQuery,
    endpoints: builder => ({
        createOrder: builder.mutation<void, Partial<ProductRequestDTO>>({
            query: data => ({
                url: "/orders",
            })
        })
    })
})

export const {
    // useGetProductsQuery
} = orderApi