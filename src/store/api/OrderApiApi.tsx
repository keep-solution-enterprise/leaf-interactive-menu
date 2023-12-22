import {apiQuery} from "../utils/Extensions";
import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {OrderCreateRequestDTO} from "../../types/order/OrderDTO";


export const orderApi = createApi({
    reducerPath: "order",
    baseQuery: apiQuery,
    endpoints: builder => ({
        createOrder: builder.mutation<void, Partial<OrderCreateRequestDTO>>({
            query: data => ({
                url: "/orders",
                method: "POST",
                body: data
            })
        })
    })
})

export const {
    useCreateOrderMutation
} = orderApi