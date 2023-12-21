import {fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const apiQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL
})

export interface Param {
    name: string
    value: any
}

export const getUrl = (url: string, params: any) => {
    const data = Object.entries(params).map(([name, value]) => ({name, value}))
    return data
        ?.filter(item => !(!item.value))
        ?.length > 0
        ? joinToString(data, "&", url + "?", "", item => item.value ? `${item.name}=${item.value}` : '')
        : url
}

export function joinToString<T>(
    array: T[],
    separator = ',',
    prefix = '',
    suffix = '',
    transform: (item: T) => string
) {
    let res = prefix
    for (let i = 0; i < array.length; i++) {
        if (i !== 0 && transform(array[i]) !== '') {
            res += separator
        }
        res += transform(array[i])
    }
    res += suffix
    return res
}

