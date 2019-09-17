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

import { LawFirmService } from "services/LawFirmService";
import LawFirmRow from "views/LawFirm/LawFirmRow";

const useStyles = makeStyles(styles);
export default function LawFirmTable(props) {
    const classes = useStyles()
    return (
        <GridItem xs={12} sm={12} md={12}>
            <Card>
                <CardHeader color="success">
                    <Button color="white" className="new-btn" aria-label="add" justIcon round onClick={() => {props.history.push("/admin/law-firm/new")}}>
                        <Add />
                    </Button>
                    <h4 className={classes.cardTitleWhite}>律所</h4>
                    <p className={classes.cardCategoryWhite}>
                        参与考核的律所名单
                    </p>
                </CardHeader>
                <CardBody>
                <Table
                    tableHeaderColor="success"
                    tableHead={[
                        { name: '律所名称', key: 'title', sortable: true },
                        { name: '星级', key: 'reviews', sortable: true  },
                        { name: '服务数', key: 'services', sortable: true  },
                        { name: '工作时间', key: 'workingHour' },
                        { name: '联系电话', key: 'contact' },
                    ]}
                    tableOnload={LawFirmService.listAll}
                    tableRowComponent={LawFirmRow}
                />
                </CardBody>
            </Card>
        </GridItem>
    )
}