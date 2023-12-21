import {apiQuery} from "../utils/Extensions";
import {Response} from "../../types/Response";
import {CategoryDTO} from "../../types/category/CategoryDTO";
import {createApi} from "@reduxjs/toolkit/dist/query/react";


export const categoryApi = createApi({
    reducerPath: "category",
    baseQuery: apiQuery,
    endpoints: builder => ({
        getCategories: builder.query<Response<CategoryDTO[]>, Partial<number | undefined>>({
            query: user_id => `/users/${user_id}/categories`
        })
    })
})

export const {
    useGetCategoriesQuery
} = categoryApi