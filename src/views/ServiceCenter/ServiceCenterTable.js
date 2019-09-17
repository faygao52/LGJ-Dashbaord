import React from "react";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

// @material-ui/icons
import Add from "@material-ui/icons/Add";


import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import { ServiceCenterService } from "services/ServiceCenterService";
import ServiceCenterRow from "views/ServiceCenter/ServiceCenterRow";

const useStyles = makeStyles(styles);
export default function ServiceCenterTable(props) {
    const classes = useStyles()
    return (
        <GridItem xs={12} sm={12} md={12}>
            <Card>
                <CardHeader color="warning">
                    <Button color="white" className="new-btn" aria-label="add" justIcon round onClick={() => {props.history.push("/admin/service-center/new")}}>
                        <Add />
                    </Button>
                    <h4 className={classes.cardTitleWhite}>法律服务站</h4>
                    <p className={classes.cardCategoryWhite}>
                        已接入法律服务站（室）
                    </p>

                </CardHeader>
                <CardBody>
                <Table
                    tableHeaderColor="warning"
                    tableHead={[
                        { name: '服务站名称', key: 'name', sortable: true },
                        { name: '工作时间', key: 'workingHour' },
                        { name: '联系电话', key: 'contact' },
                        { name: '地址', key: 'address' }
                    ]}
                    tableOnload={ServiceCenterService.listAll}
                    tableRowComponent={ServiceCenterRow}
                />
                </CardBody>
            </Card>
        </GridItem>
    )
}