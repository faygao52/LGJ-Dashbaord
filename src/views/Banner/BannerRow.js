import React, { useState } from "react";
import PropTypes from "prop-types";

import { BannerService } from "services/BannerService";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/core components
import { Switch, TableCell, TableRow } from "@material-ui/core";

// core components
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
import TableAction from "components/Table/TableAction";

const useStyles = makeStyles(styles);

export default function BannerRow(props) {
  const classes = useStyles()
  const { data, onDelete } = props
  const [visible, setVisible] = useState(data.visible)
  const [isLoading, setLoading] = useState(false)

  function handleChangeVisibility() {
    setLoading(true)
    BannerService.updateById(data.id,
      { visible: !visible}
    ).then(() => {
      setLoading(false)
      setVisible(!visible)
    })
    .catch(() => {
      setLoading(false)
    })
  }
  
  function handleDelete() {
    BannerService.deleteById(data.id)
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
        {data.title}
      </TableCell>
      <TableCell className={classes.tableCell}>
        {data.link}
      </TableCell>
      <TableCell className={classes.tableCell}>
        {data.imageURI}
      </TableCell>
      <TableCell className={classes.tableCell}>
      <Switch
        checked={visible}
        onChange={handleChangeVisibility}
      />
      </TableCell>
      <TableAction editRoute="/admin/banner/111/edit" onDelete={handleDelete} disabled={isLoading} />
    </TableRow>

  );
}

BannerRow.propTypes = {
  data: PropTypes.object,
  onDelete: PropTypes.func
}