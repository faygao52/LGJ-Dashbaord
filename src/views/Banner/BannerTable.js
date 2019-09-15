import React, { useState, useEffect } from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import { BannerService } from "services/BannerService";

const useStyles = makeStyles(styles);
export default function BannerTable() {
    const classes = useStyles()
    const [hasError, setErrors] =  useState(false)
    const [banners,setBanners ]= useState({})

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await BannerService.listAll()
                setBanners(res.dataCollection)
            } catch(err) {
                setErrors(err)
            }
        }
        fetchData();
    });

    return (
        <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>轮播图片</h4>
              <p className={classes.cardCategoryWhite}>
                显示在小程序顶部的轮播图片
              </p>
            </CardHeader>
            <CardBody>
              {/* <Table
                tableHeaderColor="primary"
                tableHead={["标题", "链接", "图片地址", "显示"]}
                tableData={banners}
              /> */}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    )
}