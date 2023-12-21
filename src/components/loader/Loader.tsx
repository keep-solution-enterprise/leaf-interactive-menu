import icLoader from "../../assets/icons/ic_loader.svg"
import {createUseStyles} from "react-jss";

const useStyle=createUseStyles({
    index:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:"100vh",
        background:"transparent"
    },
    icon:{
        width:"30vw",
        height:"30vw"
    }
})

const Loader=()=>{
    const classes=useStyle()

    return (
        <div className={classes.index}>
            <img className={classes.icon} src={icLoader.toString()} alt=""/>
        </div>
    )
}

export default Loader