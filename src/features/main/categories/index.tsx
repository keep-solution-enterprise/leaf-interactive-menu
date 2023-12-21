import {CategoryDTO} from "../../../types/category/CategoryDTO";
import {createUseStyles} from "react-jss";
import CategoryItem from "./CategoryItem";
import React, {Dispatch, SetStateAction} from "react";

const useStyle = createUseStyles({
    index: {
        display: "flex",
        columnGap: "6px",
        overflowX: "auto"
    },
})

type CategoriesProps = {
    categories: CategoryDTO[],
    active: CategoryDTO | undefined,
    setActive: Dispatch<SetStateAction<CategoryDTO | undefined>>
}
const Categories:React.FC<CategoriesProps> = ({categories,active,setActive}) => {

    const classes = useStyle()

    return (
        <div className={classes.index}>
            {
                categories
                    ?.map(item => (
                        <CategoryItem key={item.id}
                                      category={item}
                                      isActive={item.id === active?.id}
                                      onClick={() => setActive(item)}
                        />
                    ))
            }
        </div>
    )
}

export default Categories