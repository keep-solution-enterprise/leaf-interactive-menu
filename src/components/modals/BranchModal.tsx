import React, {useEffect, useState} from "react";
import {Button, FormGroup, Input, Label, Modal} from "reactstrap";
import {createUseStyles} from "react-jss";

import iconClose from "../../assets/icons/ic_close.svg"
import {useGetBranchesQuery} from "../../store/api/BranchApi";
import {userId} from "../../utils/Extensions";
import {useCreateOrderMutation} from "../../store/api/OrderApi";
import LoadingBlock from "../loader/LoadingBlock";
import {useGetBasketItems} from "../../store/api/AuthSlice";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";
import {
    CHOOSE_BRANCH_DESCRIPTION_TEXT,
    CHOOSE_BRANCH_TITLE_TEXT,
    ERROR_TEXT,
    MAKE_ORDER_TEXT
} from "../../i18n/Constants";

const useStyle = createUseStyles({
    body: {
        display: "flex",
        flexDirection: "column",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        padding: "28px"
    },
    title: {
        fontSize: "16px",
        fontWeight: 600,
        lineHeight: "24px",
        marginBottom: 0
    },
    closeButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        borderRadius: "20px",
        fontSize: "25px",
        right: "16px",
        top: "16px",
        padding: "4px",
        backgroundColor: "#EF3A44"
    },
    description: {
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
        fontSize: "12px",
        fontWeight: 400,
        lineHeight: "15px",
        color: "#8D8D8D",
    },
    select: {
        marginTop: "10px",
        width: "65%",
        backgroundColor: "#fff",
        border: 0,
        padding: "11px 16px",
        borderRadius: "15px",
        color: "#767676",
        fontSize: "12px",
    },
    selectOption: {
        fontSize: "16px",
        fontWeight: 600,
        lineHeight: "15px"
    },
    assignFormGroup: {
        margin: "10px 0 0 0!important",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    assignButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "65%",
        borderRadius: "15px",
        padding: "10px 0.375rem",
        fontSize: "16px",
        fontWeight: 600,
        borderColor: "#A6F4C5",
        color: "#039855",
        "&:hover": {
            backgroundColor: "#039855"
        }
    },
    assignButtonLabel: {
        fontSize: "10px",
        color: "#EF3A44",
        margin: "5px",
        textAlign: "center"
    }
})

type BranchModalProps = {
    open: boolean
    toggle: () => void,
}
const BranchModal: React.FC<BranchModalProps> = ({open, toggle}) => {

    const classes = useStyle()
    const {t} = useTranslation()
    const navigate = useNavigate()
    const [branchId, setBranchId] = useState<number>(-1)
    const {data: branches} = useGetBranchesQuery(userId, {skip: !userId})
    const [createOrder, {isLoading, isError, isSuccess}] = useCreateOrderMutation()
    const basketItems = useGetBasketItems()


    const onSelectClicked = () => {
        if (userId && branchId && basketItems.length > 0) {
            createOrder({
                user_telegram_id: userId,
                branch_id: branchId,
                items: basketItems.map(({product, count}) => ({product_id: product.id, count}))
            })
        }
    }


    useEffect(() => {
        if (isSuccess) {
            navigate("/success")
        }
    }, [isSuccess]);

    return (
        <Modal isOpen={open} toggle={toggle} centered>
            <div className={classes.body}>
                <p className={classes.title}>{t(CHOOSE_BRANCH_TITLE_TEXT)}</p>
                <Button className={classes.closeButton} color={"danger"} onClick={toggle}>
                    <img src={iconClose.toString()} alt="&times;"/>
                </Button>
                <p className={classes.description}>{t(CHOOSE_BRANCH_DESCRIPTION_TEXT)}</p>
                <Input
                    type={"select"}
                    className={classes.select}
                    value={branchId}
                    onChange={(e) => setBranchId(parseInt(e.target.value))}>
                    <option className={classes.selectOption} value={-1}
                            disabled={true}>{t(CHOOSE_BRANCH_TITLE_TEXT)}
                    </option>
                    {
                        branches
                            ?.data
                            ?.map(item => <option key={item.id}
                                                  className={classes.selectOption}
                                                  value={item.id}>{item.name}
                            </option>)
                    }
                </Input>
                {
                    branchId !== -1 && <FormGroup className={classes.assignFormGroup}>
                        <Button onClick={onSelectClicked}
                                color={isError ? "danger" : "success"} outline
                                className={classes.assignButton}>
                            {isLoading && <LoadingBlock showText={false} size={"4vh"}/>}
                            {t(MAKE_ORDER_TEXT)}
                        </Button>
                        <Label hidden={!isError} className={classes.assignButtonLabel}>{t(ERROR_TEXT)}</Label>
                    </FormGroup>
                }
            </div>
        </Modal>
    )
}

export default BranchModal