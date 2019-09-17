import React, { useState } from "react";

import { BannerService } from "services/BannerService";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import { Switch, InputLabel, FormControlLabel } from "@material-ui/core";

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
export default function BannerEdit(props) {
    const id = props.match.params.id;
    const classes = useStyles()
    const isCreate = id === undefined ? '新建': '编辑'
    const [banner, setBanner] = useState({
        title: "",
        imageURI: "",
        link: "",
        visible: true
      });
    const [isSubmitting, setSubmitting] = useState(false);
    const [hasError, setErrors] = useState(false);
    const [succeed, setSucceed] = useState(false);
    async function fetchData() {
        try {
          const res = await BannerService.getByID(id)
          setBanner(res.banner)
        } catch(err) {
          setErrors(err)
          setTimeout(function() {
            setErrors(false);
          }, 3000);
        }
      }

    const handleChange = name => event => {
        setBanner({ ...banner, [name]: event.target.value });
    };

    const handleChangeVisibility = () => {
        setBanner({ ...banner, visible: !banner.visible })
    }
      
    const handleSubmit = () => {
        setSubmitting(true)
        id == undefined ? createBanner() : udpateBanner()
        setSubmitting(false)
    }

    async function udpateBanner() {
        try {
            let _res = await BannerService.updateById(id, banner)
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

    async function createBanner() {
        try {
            let _res = await BannerService.create(banner)
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
            <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>轮播顶图</h4>
            <p className={classes.cardCategoryWhite}>{isCreate}顶部轮播图片</p>
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
                            value: banner.title,
                            placeholder: "填写顶图标题"
                        }}
                    />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <FormControlLabel className={classes.formControl}
                        control={<Switch
                            label="显示"
                            checked={banner.visible}
                            onChange={handleChangeVisibility}
                        />}
                        label="显示"
                        labelPlacement="start"
                    />
                </GridItem>
            </GridContainer>

            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                    labelText="文章链接"
                    id="link"
                    formControlProps={{
                    fullWidth: true
                    }}
                    inputProps={{
                        onChange: handleChange('link'),
                        value: banner.link,
                        placeholder: "填写完整的公众号文章地址，https://mp.weixin.qq.com/..."
                    }}
                />
                <CustomInput
                    labelText="图片链接"
                    id="imageURI"
                    formControlProps={{
                    fullWidth: true
                    }}
                    inputProps={{
                        onChange: handleChange('imageURI'),
                        value: banner.imageURI,
                        placeholder: "填写外链图片地址，图片大小750x315"
                    }}
                />
                </GridItem>
                {banner.imageURI ?
                <GridItem xs={12} sm={12} md={6}>
                <InputLabel style={{ color: "#AAAAAA" }}>图片预览</InputLabel>
                <img src={banner.imageURI} className="display-image" alt="..." />
                </GridItem> : null}
            </GridContainer>
            </CardBody>
            <CardFooter>
            <Button color="primary" disabled={isSubmitting} onClick={handleSubmit}>{isCreate}</Button>
            </CardFooter>
        </Card>
        </GridItem>
    )
}