import React, { useState } from "react";

import { LawFirmService } from "services/LawFirmService";

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
export default function LawFirmEdit(props) {
    const id = props.match.params.id;
    const classes = useStyles()
    const isCreate = id === undefined ? '新建': '编辑'
    const [data, setData] = useState({
        title: "",
        workingHour: "",
        contact: "",
        address: "",
        description: "",
        review: 0,
        services: 0,
        coverImage: "",
        icon: ""
      });
    const [isSubmitting, setSubmitting] = useState(false);
    const [hasError, setErrors] = useState(false);
    const [succeed, setSucceed] = useState(false);
    async function fetchData() {
        try {
          const res = await LawFirmService.getByID(id)
          setData(res.lawFirm)
        } catch(err) {
          setErrors(err)
          setTimeout(function() {
            setErrors(false);
          }, 6000);
        }
      }

    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.type === 'number' ? parseInt(event.target.value) : event.target.value });
    };

    const handleSubmit = () => {
        setSubmitting(true)
        id == undefined ? create() : udpate()
        setSubmitting(false)
    }

    async function udpate() {
        try {
            await LawFirmService.updateById(id, data)
            setSucceed(true)
            setTimeout(function() {
                props.history.goBack();
            }, 6000);
          } catch(err) {
            setErrors(err)
            setTimeout(function() {
                setErrors(false);
            }, 6000);
        }
    }

    async function create() {
        try {
            await LawFirmService.create(data)
            setSucceed(true)
            setTimeout(function() {
                props.history.goBack();
            }, 6000);
        } catch(err) {
            setErrors(err)
            setTimeout(function() {
                setErrors(false);
            }, 6000);
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
            <CardHeader color="success">
            <h4 className={classes.cardTitleWhite}>律所</h4>
            <p className={classes.cardCategoryWhite}>{isCreate}接入评级系统的律所信息</p>
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
                        labelText="标题"
                        id="title"
                        formControlProps={{
                        fullWidth: true
                        }}
                        inputProps={{
                            onChange: handleChange('title'),
                            value: data.title
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                    <CustomInput
                        labelText="服务数"
                        id="services"
                        formControlProps={{
                        fullWidth: true
                        }}
                        inputProps={{
                            type:"number",
                            onChange: handleChange('services'),
                            value: data.services
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                    <CustomInput
                        labelText="评级"
                        id="review"
                        formControlProps={{
                        fullWidth: true
                        }}
                        inputProps={{
                            type:"number",
                            onChange: handleChange('review'),
                            value: data.review,
                            placeholder: "请填写输入1-5，0为未评级"
                        }}
                    />
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                        labelText="工作时间"
                        id="workingHour"
                        formControlProps={{
                        fullWidth: true
                        }}
                        inputProps={{
                            onChange: handleChange('workingHour'),
                            value: data.workingHour
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                        labelText="联系电话"
                        id="contact"
                        formControlProps={{
                        fullWidth: true
                        }}
                        inputProps={{
                            onChange: handleChange('contact'),
                            value: data.contact
                        }}
                    />
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={9}>
                <CustomInput
                    labelText="地址"
                    id="address"
                    formControlProps={{
                    fullWidth: true
                    }}
                    inputProps={{
                        onChange: handleChange('address'),
                        value: data.address,
                        placeholder: "律所详细地址"
                    }}
                />
                <CustomInput
                    labelText="顶图链接"
                    id="coverImage"
                    formControlProps={{
                    fullWidth: true
                    }}
                    inputProps={{
                        onChange: handleChange('coverImage'),
                        value: data.coverImage,
                        placeholder: "填写外链图片地址，推荐图片大小550x230"
                    }}
                />
                </GridItem>
                {data.coverImage ?
                <GridItem xs={12} sm={12} md={3}>
                <InputLabel style={{ color: "#AAAAAA" }}>图片预览</InputLabel>
                    <img src={data.coverImage} className="display-image" alt="..." />
                </GridItem> : null}
                <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: "#AAAAAA" }}>简介</InputLabel>
                    <CustomInput
                        id="description"
                        formControlProps={{
                        fullWidth: true
                        }}
                        inputProps={{
                            multiline: true,
                            rows: 5,
                            onChange: handleChange('description'),
                            value: data.description,
                            placeholder: "填写300字左右简介"
                        }}
                    />
                </GridItem>
            </GridContainer>
            </CardBody>
            <CardFooter>
            <Button color="success" disabled={isSubmitting} onClick={handleSubmit}>{isCreate}</Button>
            </CardFooter>
        </Card>
        </GridItem>
    )
}