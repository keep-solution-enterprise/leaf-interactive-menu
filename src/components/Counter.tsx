import {createUseStyles} from "react-jss";
import icRectPlus from "../assets/icons/ic_rect_plus.svg"
import icRectMinus from "../assets/icons/ic_rect_minus.svg"
import React from "react";

const useStyle = createUseStyles({
    index: {
        display: "flex",
        columnGap: "10px",
        alignItems: "center"
    },
    count: {
        margin: 0,
        lineHeight: "18px",
        fontWeight: 400,
        fontSize: "12px"
    }
})

type CounterProps = {
    count: number,
    increase: () => void
    decrease: () => void
}
const Counter: React.FC<CounterProps> = ({count,increase,decrease}) => {

    const classes = useStyle()

    return (
        <div className={classes.index}>
            <img onClick={decrease} src={icRectMinus.toString()} alt=""/>
            <p className={classes.count}>{count}</p>
            <img onClick={increase} src={icRectPlus.toString()} alt=""/>
        </div>
    )
}

export default Counter