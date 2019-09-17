import React from "react";
import { Link } from 'react-router-dom'
import PropTypes from "prop-types";

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/core components
import { IconButton, TableCell, Tooltip } from "@material-ui/core";

// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

// core components
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";

const useStyles = makeStyles(styles);

export default function TableAction(props) {
  const classes = useStyles()
  const { editRoute, onDelete, disabled } = props 
  return (
    <TableCell className={classes.tableCell}>
      <Tooltip
        id="tooltip-top"
        title="编辑"
        placement="top"
        classes={{ tooltip: classes.tooltip }}
      >
        <IconButton
          aria-label="Edit"
          component={Link}
          to={editRoute}
          className={classes.tableActionButton}
          disabled={disabled}
        >
          <Edit
            className={
              classes.tableActionButtonIcon + " " + classes.edit
            }
          />
        </IconButton>
      </Tooltip>
      <Tooltip
        id="tooltip-top-start"
        title="删除"
        placement="top"
        classes={{ tooltip: classes.tooltip }}
      >
        <IconButton
          aria-label="Close"
          className={classes.tableActionButton}
          onClick={onDelete}
          disabled={disabled}
        >
          <Close
            className={
              classes.tableActionButtonIcon + " " + classes.close
            }
          />
        </IconButton>
      </Tooltip>
    </TableCell>
  )
}

TableAction.propTypes = {
  editRoute: PropTypes.string,
  onDelete: PropTypes.func,
  disabled: PropTypes.bool
}