import loader from "../../assets/icons/loader/ic_circle_loading.svg"
import {createUseStyles} from "react-jss";
import React from "react";
import {Col, Row} from "reactstrap";


const useStyle = createUseStyles<string, { size: string }>({
    wrapper: {
        display: "flex",
        height: '100%',
        justifyContent: "center",
        alignItems: "center"
    },
    spinner: ({size}) => ({
        height: size,
        width: size
    }),
    loadingText: {
        display: "flex",
        alignItems: "center"
    }
})

type LoadingBlockProps = {
    size?: string,
    showText?: boolean
}
const LoadingBlock: React.FC<LoadingBlockProps> = ({size = "5vh", showText = true}) => {

    const classes = useStyle({size})

    return <div className={classes.wrapper}>
        <Row>
            <Col><img className={classes.spinner} src={loader.toString()} alt="Loader..."/></Col>
            {showText &&
                <Col className={classes.loadingText}><h6 className={classes.loadingText}>Загрузка...</h6></Col>}
        </Row>
    </div>
}

export default LoadingBlock