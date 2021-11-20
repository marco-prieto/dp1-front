
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import shortid from 'shortid';
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;
  return (
    <div className={classes.tableResponsive}>
        <h4 className="d-flex justify-content-center" style={{marginBottom:"10px"}}>Pedidos Atendidos</h4>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]} style={{fontSize:"12px"}}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={shortid.generate()}
                    align='center'
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
              <TableRow key={key} className={classes.tableBodyRow} style={{fontSize:"10px"}}>
                <TableCell className={classes.tableCell} key={key} align='center'>
                      {prop.idPedido}
                </TableCell>
                <TableCell className={classes.tableCell} key={key} align='center'>
                      {prop.cantidadGLP}
                </TableCell>
                <TableCell className={classes.tableCell} key={key} align='center'>
                      {prop.horaLlegada}
                </TableCell>
                <TableCell className={classes.tableCell} key={key} align='center'>
                      {prop.horaDeFinAtencion}
                </TableCell>
                <TableCell className={classes.tableCell} key={key} align='center'>
                      {`(${prop.ubicacion['x']},${prop.ubicacion['y']})`}
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
