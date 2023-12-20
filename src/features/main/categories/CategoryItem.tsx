import {CategoryDTO} from "../../../types/category/CategoryDTO";
import React from "react";
import {createUseStyles} from "react-jss";
import icTemp from "../../../assets/icons/ic_temp.svg"

const useStyle = createUseStyles<string,{isActive:boolean}>({
    index: ({isActive})=>({
        display: "flex",
        alignItems: "center",
        padding: "14px 19px",
        backgroundColor: isActive ? "#229B80" : "#F0F1F1",
        color: isActive? "#fff" : "#000",
        borderRadius: "30px"
    }),
    icon: {
        width: "20px",
        height: "20px",
    },
    name: {
        margin: 0
    }
})

type CategoryItemProps = {
    category: CategoryDTO,
    isActive: boolean,
    onClick: ()=> void
}

const CategoryItem: React.FC<CategoryItemProps> = ({category,isActive,onClick}) => {

    const classes = useStyle({isActive})


    return (
        <div className={classes.index} onClick={onClick}>
            <img className={classes.icon} src={icTemp.toString()} alt=""/>
            <p className={classes.name}>{category.name}</p>
        </div>
    )
}

export default CategoryItem