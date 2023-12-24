import React, {useEffect} from "react";
import {useGetCategoriesQuery} from "../../store/api/CategoryApi";
import Loader from "../../components/loader/Loader";
import {userId} from "../../utils/Extensions";
import {useGetUserInfoQuery} from "../../store/api/UserApi";
import {useTranslation} from "react-i18next";

type AppDataProviderProps = {
    children?: React.ReactNode
}
const AppDataProvider: React.FC<AppDataProviderProps> = ({children}) => {

    const {i18n} = useTranslation()
    const {data: userInfo, isLoading: userLoading, isError: userError} = useGetUserInfoQuery(userId, {skip: !userId})

    const {
        isLoading: categoriesLoading,
        isError: categoriesError
    } = useGetCategoriesQuery(userId, {skip: !userId})

    useEffect(() => {
        if (userInfo?.data) {
            i18n.changeLanguage(userInfo.data.language.toLowerCase())
                .then(r => r)
        }
    }, [userInfo]);

    if (userLoading || categoriesLoading)
        return <Loader/>

    if (userError || categoriesError || !userId)
        return <></>


    return <>{children}</>

}

export default AppDataProvider