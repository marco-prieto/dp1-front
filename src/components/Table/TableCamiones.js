
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";

import axios from 'axios';
import url from "../../config";




// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                <TableCell className={classes.tableCell} key={key}>
                      {prop.id}
                </TableCell>
                <TableCell className={classes.tableCell} key={key}>
                      {prop.codigoCamion}
                </TableCell>
                <TableCell className={classes.tableCell} key={key}>
                      {prop.taraCamion}
                </TableCell>
                <TableCell className={classes.tableCell} key={key}>
                      {prop.capacidadPetroleo}
                </TableCell>
                <TableCell className={classes.tableCell} key={key}>
                      {prop.capacidadGLP}
                </TableCell>
                <TableCell className={classes.tableCell} key={key}>
                      {prop.estadoCamion}
                </TableCell>
                <TableCell className={classes.tableCell} key={key}>
                  {prop.estadoCamion == 'Operativo' &&
                  <Button variant="outlined" component="label" size="small"
                          onClick={()=>{props.registrarAveria(prop.id)}}> 
                      Avería
                  </Button>
                  }
                  {/* //Api de averia en back */}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
