import {createUseStyles} from "react-jss";
import {HEADER_DESCRIPTION_TEXT, HEADER_TITLE_TEXT} from "../../../i18n/Constants";
import React from "react";
import {useTranslation} from "react-i18next";

const useStyle = createUseStyles({
    title: {
        color: "#1B1B1B",
        lineHeight: "25px",
        fontWeight: 700,
        fontSize: "20px",
        marginBottom: 6
    },
    bottom: {
        color: "#767676",
        lineHeight: "15px",
        fontWeight: 400,
        fontSize: "12px",
        margin: 0
    }
})
const Header = () => {

    const classes = useStyle()
    const {t} = useTranslation()

    return (
        <div>
            <p className={classes.title}>{t(HEADER_TITLE_TEXT)}</p>
            <p className={classes.bottom}>{t(HEADER_DESCRIPTION_TEXT)}</p>
        </div>

    )
}

export default Header