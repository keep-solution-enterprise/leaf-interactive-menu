import {apiQuery} from "../utils/Extensions";
import {Response} from "../../types/Response";
import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {BranchDTO} from "../../types/branch/BranchDTO";


export const branchApi = createApi({
    reducerPath: "branch",
    baseQuery: apiQuery,
    endpoints: builder => ({
        getBranches: builder.query<Response<BranchDTO[]>, Partial<number|undefined>>({
            query: (user_id) => `/users/${user_id}/branches`
        })
    })
})

export const {
    useGetBranchesQuery
} = branchApi