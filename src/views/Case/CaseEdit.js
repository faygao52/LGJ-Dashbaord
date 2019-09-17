import React, { useState } from "react";

import { CaseService } from "services/CaseService";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel } from "@material-ui/core";

import Done from '@material-ui/icons/Done';
import Error from '@material-ui/icons/ErrorOutline';

// core components
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Snackbar from "components/Snackbar/Snackbar";

const useStyles = makeStyles(styles);
export default function CaseEdit(props) {
    const id = props.match.params.id;
    const classes = useStyles()
    const isCreate = id === undefined ? '新建': '编辑'
    const [data, setData] = useState({
        catalog: "",
        question: "",
        answer: "",
        contact: "",
        lawyer: ""
      });
    const [isSubmitting, setSubmitting] = useState(false);
    const [hasError, setErrors] = useState(false);
    const [succeed, setSucceed] = useState(false);
    async function fetchData() {
        try {
          const res = await CaseService.getByID(id)
          setData(res.userCase)
        } catch(err) {
          setErrors(err)
          setTimeout(function() {
            setErrors(false);
          }, 3000);
        }
      }

    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.type === 'number' ? Number(event.target.value) : event.target.value });
    };

    const handleSubmit = () => {
        setSubmitting(true)
        id == undefined ? create() : udpate()
        setSubmitting(false)
    }

    async function udpate() {
        try {
            await CaseService.updateById(id, data)
            setSucceed(true)
            setTimeout(function() {
                props.history.goBack();
            }, 3000);
          } catch(err) {
            setErrors(err)
            setTimeout(function() {
                setErrors(false);
            }, 3000);
        }
    }

    async function create() {
        try {
            await CaseService.create(data)
            setSucceed(true)
            setTimeout(function() {
                props.history.goBack();
            }, 3000);
        } catch(err) {
            setErrors(err)
            setTimeout(function() {
                setErrors(false);
            }, 3000);
        }
    }
    React.useEffect(() => {
        if (id !== undefined) {
            fetchData()
        }
      }, []);

      
    return (
        <GridItem xs={12} sm={12} md={12}>
            <Card>
            <CardHeader color="danger">
            <h4 className={classes.cardTitleWhite}>案例</h4>
            <p className={classes.cardCategoryWhite}>{isCreate}法律咨询</p>
            </CardHeader>
            <CardBody>
            <Snackbar
                place="tr"
                fullWidth
                closeNotification={() => setErrors(false)}
                message={ '数据读取失败 - ' + hasError}
                open={!!hasError}
                icon={Error}
                color="danger"
                close
            />
            <Snackbar
                place="tr"
                fullWidth
                closeNotification={() => setSucceed(false)}
                message={ isCreate + '成功' }
                color="success"
                icon={Done}
                open={!!succeed}
                close
            />
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                        labelText="问题分类"
                        id="catalog"
                        formControlProps={{
                        fullWidth: true
                        }}
                        inputProps={{
                            onChange: handleChange('catalog'),
                            value: data.catalog
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                    <CustomInput
                        labelText="联系方式"
                        id="contact"
                        formControlProps={{
                        fullWidth: true
                        }}
                        inputProps={{
                            onChange: handleChange('contact'),
                            value: data.contact,
                            placeholder: "律师联系方式"
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                    <CustomInput
                        labelText="解答律师"
                        id="lawyer"
                        formControlProps={{
                        fullWidth: true
                        }}
                        inputProps={{
                            onChange: handleChange('lawyer'),
                            value: data.lawyer,
                            placeholder: "格式：律所名称 律师名 律师"
                        }}
                    />
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: "#AAAAAA" }}>问题</InputLabel>
                    <CustomInput
                        id="question"
                        formControlProps={{
                        fullWidth: true
                        }}
                        inputProps={{
                            multiline: true,
                            rows: 5,
                            onChange: handleChange('question'),
                            value: data.question,
                            placeholder: "填写100字左右问题"
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: "#AAAAAA" }}>回答</InputLabel>
                    <CustomInput
                        id="answer"
                        formControlProps={{
                        fullWidth: true
                        }}
                        inputProps={{
                            multiline: true,
                            rows: 5,
                            onChange: handleChange('answer'),
                            value: data.answer,
                            placeholder: "填写300字左右解答"
                        }}
                    />
                </GridItem>
            </GridContainer>
            </CardBody>
            <CardFooter>
            <Button color="danger" disabled={isSubmitting} onClick={handleSubmit}>{isCreate}</Button>
            </CardFooter>
        </Card>
        </GridItem>
    )
}