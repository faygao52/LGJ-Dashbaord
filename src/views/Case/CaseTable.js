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

import { CaseService } from "services/CaseService";
import CaseRow from "views/Case/CaseRow";

const useStyles = makeStyles(styles);
export default function CaseTable(props) {
    const classes = useStyles()
    return (
        <GridItem xs={12} sm={12} md={12}>
            <Card>
                <CardHeader color="danger">
                    <Button color="white" className="new-btn" aria-label="add" justIcon round onClick={() => {props.history.push("/admin/case-study/new")}}>
                        <Add />
                    </Button>
                    <h4 className={classes.cardTitleWhite}>法律案例</h4>
                    <p className={classes.cardCategoryWhite}>
                        常见法律咨询案例
                    </p>
                </CardHeader>
                <CardBody>
                <Table
                    tableHeaderColor="danger"
                    tableHead={[
                        { name: '分类', key: 'catalog', sortable: true },
                        { name: '提问', key: 'question' },
                        { name: '解答', key: 'answer' },
                        { name: '解答律师', key: 'lawyer' },
                    ]}
                    tableOnload={CaseService.listAll}
                    tableRowComponent={CaseRow}
                />
                </CardBody>
            </Card>
        </GridItem>
    )
}