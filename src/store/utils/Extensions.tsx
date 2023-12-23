import {fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const apiQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL
})

