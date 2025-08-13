import React from 'react';
import AppDataProvider from "./features/providers/AppDataProvider";
import Loader from "./components/loader/Loader";
import {Route, Routes} from "react-router";
import Basket from "./features/basket";
import SuccessMenu from "./features/basket/SuccessMenu";
import {useTestQuery} from "./store/api/UserApi";
import WebApp from "@twa-dev/sdk";


const Index = React.lazy(() => import("./features"))

function App() {

    useTestQuery(WebApp)
    useTestQuery(WebApp.initDataUnsafe)

    return (
        <AppDataProvider>
            <React.Suspense fallback={<Loader/>}>
                <Routes>
                    <Route index path={"/"} element={<Index/>}/>
                    <Route path={"/basket"} element={<Basket/>}/>
                    <Route path={"/success"} element={<SuccessMenu/>}/>
                </Routes>
            </React.Suspense>
        </AppDataProvider>
    );
}

export default App;
