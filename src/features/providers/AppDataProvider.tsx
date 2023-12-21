import React from "react";
import {useGetCategoriesQuery} from "../../store/api/CategoryApi";
import Loader from "../../components/loader/Loader";
import {userId} from "../../utils/Extensions";

type AppDataProviderProps = {
    children?: React.ReactNode
}
const AppDataProvider: React.FC<AppDataProviderProps> = ({children}) => {


    const {
        isLoading,
        isError
    } = useGetCategoriesQuery(userId, {skip: !userId})

    if (isLoading)
        return <Loader/>

    if (isError || !userId)
        return <></>

    return <>{children}</>

}

export default AppDataProvider