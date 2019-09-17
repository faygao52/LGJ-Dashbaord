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

import { MessageService } from "services/MessageService";
import MessageRow from "views/Message/MessageRow";

const useStyles = makeStyles(styles);
export default function MessageTable(props) {
    const classes = useStyles()
    return (
        <GridItem xs={12} sm={12} md={12}>
            <Card>
                <CardHeader color="info">
                    <h4 className={classes.cardTitleWhite}>用户留言</h4>
                    <p className={classes.cardCategoryWhite}>
                        小程序内用户留言=
                    </p>
                </CardHeader>
                <CardBody>
                <Table
                    tableHeaderColor="info"
                    tableHead={[
                        { name: '留言', key: 'description', sortable: true },
                        { name: '姓名', key: 'name', sortable: true },
                        { name: '联系方式', key: 'contact' },
                        { name: '已解决', key: 'answered' }
                    ]}
                    tableOnload={MessageService.listAll}
                    tableRowComponent={MessageRow}
                />
                </CardBody>
            </Card>
        </GridItem>
    )
}