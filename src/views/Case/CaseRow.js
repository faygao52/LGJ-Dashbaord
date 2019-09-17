import React, { useState } from "react";

import PropTypes from "prop-types";

import { CaseService } from "services/CaseService";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/core components
import { TableCell, TableRow } from "@material-ui/core";

// core components
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
import TableAction from "components/Table/TableAction";

const useStyles = makeStyles(styles);

export default function CaseRow(props) {
  const classes = useStyles()
  const { data, onDelete } = props
  const [isLoading, setLoading] = useState(false)

  function handleDelete() {
    CaseService.deleteById(data.id)
      .then(() => {
        setLoading(false)
        onDelete();
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <TableRow key={data.id} className={classes.tableRow}>
      <TableCell className={classes.tableCell}>
        {data.catalog}
      </TableCell>
      <TableCell className={classes.tableCell}>
        {data.question.substring(0, 20) + '...'}
      </TableCell>
      <TableCell className={classes.tableCell}>
        {data.answer.substring(0, 20) + '...'}
      </TableCell>
      <TableCell className={classes.tableCell}>
        {data.lawyer}
      </TableCell>
      <TableAction editRoute={"/admin/case-study/" + data.id + "/edit"} onDelete={handleDelete} disabled={isLoading} />
    </TableRow>

  );
}

CaseRow.propTypes = {
  data: PropTypes.object,
  onDelete: PropTypes.func
}