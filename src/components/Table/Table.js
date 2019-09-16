import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableRow, TableHead, TablePagination, TableSortLabel } from "@material-ui/core";
import SnackbarContent from "components/Snackbar/SnackbarContent";

// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [count, setCount] = React.useState(0);
  const [dataset, setDataset] = React.useState([]);
  const [hasError, setErrors] =  React.useState(false)
  const [reload, setReload] =  React.useState(false)

  const { tableHead, tableOnload, tableHeaderColor, tableRowComponent } = props;
  
  async function fetchData() {
    try {
      const res = await tableOnload(page + 1, rowsPerPage, orderBy)
      setPage(res.currentPage - 1)
      setDataset(res.dataCollection)
      setCount(res.totalElement)
    } catch(err) {
        setErrors(err)
    }
  }
  React.useEffect(() => {
    fetchData()
  }, [reload]);

  function handleRequestSort(property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
    setReload(Date.now());
  }

  function handleChangePage(_event, newPage) {
    setPage(newPage);
    setReload(Date.now());
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
    setReload(Date.now());
  }

  //Force to re-render table
  function handleDelete() {
    setReload(Date.now());
  }

  const RowComponent = tableRowComponent;

  return (
    <div className={classes.tableResponsive}>
      {hasError &&
        <SnackbarContent
          fullWidth
          message={ '数据读取失败 - ' + hasError}
          color="danger"
        />
      }
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((head, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                    sortDirection={orderBy === head.key ? order : false}
                  >
                  { head.sortable ? <TableSortLabel
                      active={orderBy === head.key}
                      direction={order}
                      onClick={() => handleRequestSort(head.key)}
                      >
                      {head.name}
                   </TableSortLabel>
                   : head.name
                  }
                  </TableCell>
                );
              })}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {dataset.map((prop) =>{
            return <RowComponent key={prop.id} data={prop} onDelete={handleDelete} />
          })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'previous page',
        }}
        nextIconButtonProps={{
          'aria-label': 'next page',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.object),
  tableOnload: PropTypes.func,
  tableRowComponent: PropTypes.func,
};
