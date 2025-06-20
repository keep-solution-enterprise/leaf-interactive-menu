import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./store/Store";
import {BrowserRouter} from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import "./i18n"
import 'react-toastify/dist/ReactToastify.css';
import './assets/css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/font-face.css'
import './assets/css/globals.css'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
            <ToastContainer/>
        </BrowserRouter>
    </Provider>
);

reportWebVitals();
