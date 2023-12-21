import {CategoryDTO} from "../../../types/category/CategoryDTO";
import React from "react";
import {createUseStyles} from "react-jss";
import {pictureUrl} from "../../../utils/Extensions";

const useStyle = createUseStyles<string,{isActive:boolean}>({
    index: ({isActive})=>({
        display: "flex",
        alignItems: "center",
        columnGap:"5px",
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
            {category.picture_url && <img className={classes.icon} src={pictureUrl(category.picture_url)} alt=""/>}
            <p className={classes.name}>{category.name}</p>
        </div>
    )
}

export default CategoryItem