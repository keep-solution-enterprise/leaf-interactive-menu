import {createUseStyles} from "react-jss";
import {HEADER_BOTTOM_TEXT, HEADER_TITLE_TEXT} from "../../../utils/Text";
import React from "react";

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
const Header= () => {

    const classes = useStyle()

    return (
        <div>
            <p className={classes.title}>{HEADER_TITLE_TEXT}</p>
            <p className={classes.bottom}>{HEADER_BOTTOM_TEXT}</p>
        </div>

    )
}

export default Header