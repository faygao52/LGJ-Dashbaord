import React, { useState } from "react";
import PropTypes from "prop-types";

import { ServiceCenterService } from "services/ServiceCenterService";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/core components
import { TableCell, TableRow } from "@material-ui/core";

// core components
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
import TableAction from "components/Table/TableAction";

const useStyles = makeStyles(styles);

export default function ServiceCenterRow(props) {
  const classes = useStyles()
  const { data, onDelete } = props
  const [isLoading, setLoading] = useState(false)

  function handleDelete() {
    ServiceCenterService.deleteById(data.id)
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
        {data.name}
      </TableCell>
      <TableCell className={classes.tableCell}>
        {data.workingHour}
      </TableCell>
      <TableCell className={classes.tableCell}>
        {data.contact}
      </TableCell>
      <TableCell className={classes.tableCell}>
        {data.address}
      </TableCell>
      <TableAction editRoute={"/admin/service-center/" + data.id + "/edit"} onDelete={handleDelete} disabled={isLoading} />
    </TableRow>

  );
}

ServiceCenterRow.propTypes = {
  data: PropTypes.object,
  onDelete: PropTypes.func
}