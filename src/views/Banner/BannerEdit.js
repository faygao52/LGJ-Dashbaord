import React, { useState } from "react";

import { BannerService } from "services/BannerService";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";

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

const useStyles = makeStyles(styles);
export default function BannerEdit(props) {
    const id = props.match.params.id;
    const classes = useStyles()
    const isCreate = id == undefined ? '新建': '编辑'
    
    return (
        <GridItem xs={12} sm={12} md={12}>
            <Card>
            <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>轮播顶图</h4>
            <p className={classes.cardCategoryWhite}>{isCreate}顶部轮播图片</p>
            </CardHeader>
            <CardBody>
            <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                <CustomInput
                    labelText="Company (disabled)"
                    id="company-disabled"
                    formControlProps={{
                    fullWidth: true
                    }}
                    inputProps={{
                    disabled: true
                    }}
                />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                <CustomInput
                    labelText="Username"
                    id="username"
                    formControlProps={{
                    fullWidth: true
                    }}
                />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                    labelText="Email address"
                    id="email-address"
                    formControlProps={{
                    fullWidth: true
                    }}
                />
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                    labelText="First Name"
                    id="first-name"
                    formControlProps={{
                    fullWidth: true
                    }}
                />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                    labelText="Last Name"
                    id="last-name"
                    formControlProps={{
                    fullWidth: true
                    }}
                />
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                    labelText="City"
                    id="city"
                    formControlProps={{
                    fullWidth: true
                    }}
                />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                    labelText="Country"
                    id="country"
                    formControlProps={{
                    fullWidth: true
                    }}
                />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                    labelText="Postal Code"
                    id="postal-code"
                    formControlProps={{
                    fullWidth: true
                    }}
                />
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
                <CustomInput
                    labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                    id="about-me"
                    formControlProps={{
                    fullWidth: true
                    }}
                    inputProps={{
                    multiline: true,
                    rows: 5
                    }}
                />
                </GridItem>
            </GridContainer>
            </CardBody>
            <CardFooter>
            <Button color="primary">{isCreate}</Button>
            </CardFooter>
        </Card>
        </GridItem>
    )
}