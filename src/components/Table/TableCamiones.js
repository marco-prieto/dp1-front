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
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

import axios from "axios";
import url from "../../config";

// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import { FreeBreakfastOutlined } from "@material-ui/icons";

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
                    align="center"
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
                <TableCell
                  className={classes.tableCell}
                  key={key}
                  align="center"
                >
                  {prop.id}
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  key={key}
                  align="center"
                >
                  {prop.tipoCamion}
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  key={key}
                  align="center"
                >
                  {prop.taraCamion}
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  key={key}
                  align="center"
                >
                  {prop.capacidadPetroleo}
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  key={key}
                  align="center"
                >
                  {prop.capacidadGLP}
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  key={key}
                  align="center"
                >
                  {prop.estadoCamion}
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  key={key}
                  align="center"
                >
                  {(prop.estadoCamion == "Operativo" ||
                    prop.estadoCamion == "En Ruta") && (
                    <Button
                      variant="outlined"
                      component="label"
                      size="small"
                      onClick={() => {
                        props.registrarAveria(prop.id);
                      }}
                    >
                      Avería
                    </Button>
                  )}
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    onClick={() => {
                      var type = prop.tipoCamion.split("-")[0].substring(1);
                      var state = prop.estadoCamion;

                      switch (type) {
                        case "A":
                          type = 1;
                          break;
                        case "B":
                          type = 2;
                          break;
                        case "C":
                          type = 3;
                          break;
                        case "D":
                          type = 4;
                          break;
                      }
                      switch (state) {
                        case "Operativo":
                          state = 1;
                          break;
                        case "Averiado":
                          state = 2;
                          break;
                        case "En Ruta":
                          state = 3;
                          break;
                        case "Mantenimiento Correctivo":
                          state = 4;
                          break;
                        case "Mantenimiento Preventivo":
                          state = 5;
                          break;
                      }
                      var camion = {
                        idCamion: prop.id,
                        codigoCamion: prop.tipoCamion.split("-")[1],
                        tipoCamion: type,
                        estado: state,
                        kilometraje: prop.kilometraje,
                        velocidadCamion: prop.velocidad,
                      };

                      props.setCamionEdit(camion);
                      props.handleOpenEdit();
                    }}
                  >
                    <EditIcon />
                  </IconButton>
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
