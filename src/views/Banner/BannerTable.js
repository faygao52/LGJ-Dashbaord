import React from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import { BannerService } from "services/BannerService";
import BannerRow from "views/Banner/BannerRow";

const useStyles = makeStyles(styles);
export default function BannerTable() {
    const classes = useStyles()
    return (
        <GridItem xs={12} sm={12} md={12}>
            <Card>
                <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>轮播顶图</h4>
                <p className={classes.cardCategoryWhite}>
                    显示在小程序顶部的轮播顶图, 可外链至关联公众号
                </p>
                </CardHeader>
                <CardBody>
                <Table
                    tableHeaderColor="primary"
                    tableHead={[
                        { name: '标题', key: 'title', sortable: true },
                        { name: '链接', key: 'link', sortable: true },
                        { name: '图片', key: 'imageURI' },
                        { name: '显示', key: 'visible' }
                    ]}
                    tableOnload={BannerService.listAll}
                    tableRowComponent={BannerRow}
                />
                </CardBody>
            </Card>
        </GridItem>
    )
}