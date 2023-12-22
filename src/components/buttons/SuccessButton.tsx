import React from "react";
import {createUseStyles} from "react-jss";

const useStyle = createUseStyles<string,{width:string}>({
    index: ({width})=>({
        padding: "16px",
        border: 0,
        borderRadius: "100px",
        backgroundColor: "#229B80",
        color: "#fff",
        width:width
    })
})


type SuccessButtonProps = {
    content: string,
    onClick: ()=>void
    width?: string
}
const SuccessButton: React.FC<SuccessButtonProps> = ({content,onClick,width="100%"}) => {
    const classes = useStyle({width})


    return (
        <button className={classes.index} onClick={onClick}>{content}</button>
    )
}

export default SuccessButton