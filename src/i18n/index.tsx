import i18next from "i18next";
import {initReactI18next} from "react-i18next";

import translationRussian from "./resources/ru.json"
import translationUzbek from "./resources/uz.json"

const resources={
    ru:{
        translation: translationRussian
    },
    uz:{
        translation: translationUzbek
    }
}

i18next
.use(initReactI18next)
.init({
    resources,
    lng: "ru"
})

export default i18next