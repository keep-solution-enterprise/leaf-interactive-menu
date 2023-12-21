import {apiQuery} from "../utils/Extensions";
import {Response} from "../../types/Response";
import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {ProductDTO, ProductRequestDTO} from "../../types/product/ProductDTO";


export const productApi = createApi({
    reducerPath: "product",
    baseQuery: apiQuery,
    endpoints: builder => ({
        getProducts: builder.query<Response<ProductDTO[]>, Partial<ProductRequestDTO>>({
            query: ({user_id,category_id}) => `/users/${user_id}/products?category_id=${category_id}`
        })
    })
})

export const {
    useGetProductsQuery
} = productApi