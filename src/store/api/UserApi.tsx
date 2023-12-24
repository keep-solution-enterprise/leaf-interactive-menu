import {apiQuery} from "../utils/Extensions";
import {Response} from "../../types/Response";
import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {UserInfoDTO} from "../../types/user/UserInfoDTO";


export const userApi = createApi({
    reducerPath: "user",
    baseQuery: apiQuery,
    endpoints: builder => ({
        getUserInfo: builder.query<Response<UserInfoDTO>, Partial<number|undefined>>({
            query: (user_id) => `/users/${user_id}`
        })
    })
})

export const {
    useGetUserInfoQuery
} = userApi