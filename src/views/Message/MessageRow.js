import React, { useState } from "react";
import PropTypes from "prop-types";

import { MessageService } from "services/MessageService";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/core components
import { Switch, TableCell, TableRow } from "@material-ui/core";

// core components
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";
import TableAction from "components/Table/TableAction";

const useStyles = makeStyles(styles);

export default function MessageRow(props) {
  const classes = useStyles()
  const { data, onDelete } = props
  const [answered, setAnswered] = useState(data.answered)
  const [isLoading, setLoading] = useState(false)

  function handleAnswer() {
    setLoading(true)
    MessageService.updateById(data.id,
      { answered: !answered}
    ).then(() => {
      setLoading(false)
      setAnswered(!answered)
    })
    .catch(() => {
      setLoading(false)
    })
  }
  
  function handleDelete() {
    MessageService.deleteById(data.id)
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
            {data.description}
         </TableCell>
        <TableCell className={classes.tableCell}>
            {data.name}
        </TableCell>
        <TableCell className={classes.tableCell}>
            {data.contact}
        </TableCell>
        <TableCell className={classes.tableCell}>
        <Switch
            checked={answered}
            onChange={handleAnswer}
        />
        </TableCell>
        <TableAction onDelete={handleDelete} disabled={isLoading} />
    </TableRow>

  );
}

MessageRow.propTypes = {
  data: PropTypes.object,
  onDelete: PropTypes.func
}