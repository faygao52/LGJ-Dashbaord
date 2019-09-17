import React, { useState } from "react";

import { ServiceCenterService } from "services/ServiceCenterService";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import { Link } from '@material-ui/core';

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
export default function ServiceCenterEdit(props) {
    const id = props.match.params.id;
    const classes = useStyles()
    const isCreate = id === undefined ? '新建': '编辑'
    const [data, setData] = useState({
        name: "",
        workingHour: "",
        contact: "",
        address: "",
        longitude: 0,
        latitude: 0
      });
    const [isSubmitting, setSubmitting] = useState(false);
    const [hasError, setErrors] = useState(false);
    const [succeed, setSucceed] = useState(false);
    async function fetchData() {
        try {
          const res = await ServiceCenterService.getByID(id)
          setData(res.serviceCenter)
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
            await ServiceCenterService.updateById(id, data)
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
            await ServiceCenterService.create(data)
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
            <CardHeader color="warning">
            <h4 className={classes.cardTitleWhite}>法律服务站</h4>
            <p className={classes.cardCategoryWhite}>{isCreate}服务站信息</p>
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
                        labelText="服务站名称"
                        id="name"
                        formControlProps={{
                        fullWidth: true
                        }}
                        inputProps={{
                            onChange: handleChange('name'),
                            value: data.name
                        }}
                    />
                </GridItem>
                <GridItem xs={6} sm={6} md={3}>
                    <CustomInput
                        labelText="经度"
                        id="longitude"
                        formControlProps={{
                        fullWidth: true
                        }}
                        inputProps={{
                            type: "number",
                            onChange: handleChange('longitude'),
                            value: data.longitude,
                            placeholder: '填写腾讯地图纬度'
                        }}
                    />
                </GridItem>
                <GridItem xs={6} sm={6} md={3}>
                    <CustomInput
                        labelText="纬度"
                        id="latitude"
                        formControlProps={{
                        fullWidth: true
                        }}
                        inputProps={{
                            type: "number",
                            onChange: handleChange('latitude'),
                            value: data.latitude,
                            placeholder: '填写腾讯地图经度'
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
                <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                    labelText="地址"
                    id="address"
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        onChange: handleChange('address'),
                        value: data.address,
                        placeholder: "法律服务站详细地址"
                    }}
                />
                </GridItem>
            </GridContainer>
            </CardBody>
            <CardFooter>
                <Button color="warning" disabled={isSubmitting} onClick={handleSubmit}>{isCreate}</Button>
                <Button color="warning" href="https://lbs.qq.com/tool/getpoint/" target="_blank">坐标拾取器</Button>
            </CardFooter>
        </Card>
        </GridItem>
    )
}