import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { Modal } from "@material-ui/core";
import { Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import shortid from "shortid";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import axios from "axios";
import url from "../../config";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Hoja rutas
  const [rutas, setRutas] = React.useState(null);

  const obtenerHojaRutas = (idRuta) => {
    var data = { tipo: idRuta };
    axios
      .post(`${url}/algoritmo/obtenerNodosHojaRuta`, data) //flag sera 2 si hay colapso
      .then((res) => {
        console.log(res.data);
        setRutas(res.data["nodos"]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const style2 = {
    position: "absolute",
    overflow: "scroll",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    height: 600,
    bgcolor: "background.paper",
    border: "1px solid #000",
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
  };

  const { tableHead, tableData, tableHeaderColor } = props;
  return (
    <div className={classes.tableResponsive}>
      <h4
        className="d-flex justify-content-center"
        style={{ marginBottom: "10px" }}
      >
        Pedidos Atendidos
      </h4>
      {props.show && (
        <div style={{ minWidth: "300px" }}>
          <Button
            variant="contained"
            component="label"
            color="primary"
            onClick={() => {
              obtenerHojaRutas(props.idRuta);
              handleOpen();
            }}
          >
            Hoja de Ruta
          </Button>
        </div>
      )}

      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead
            className={classes[tableHeaderColor + "TableHeader"]}
            style={{ fontSize: "12px" }}
          >
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={shortid.generate()}
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
              <TableRow
                key={key}
                className={classes.tableBodyRow}
                style={{ fontSize: "10px" }}
              >
                <TableCell
                  className={classes.tableCell}
                  key={key}
                  align="center"
                >
                  {prop.idPedido}
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  key={key}
                  align="center"
                >
                  {prop.cantidadGLP}
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  key={key}
                  align="center"
                >
                  {prop.horaLlegada}
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  key={key}
                  align="center"
                >
                  {prop.horaDeFinAtencion}
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  key={key}
                  align="center"
                >
                  {`(${prop.ubicacion["x"]},${prop.ubicacion["y"]})`}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <h3>Hoja de Rutas</h3>
          <br />
          <div
            className="row"
            style={{ fontSize: "20px", fontWeight: "100px" }}
          >
            <div className="col-4 d-flex justify-content-center">
              Nodo Inicio
            </div>
            <div className="col-4 d-flex justify-content-center">Nodo Fin</div>
            <div className="col-4 d-flex justify-content-center">
              Punto de interés
            </div>
          </div>
          <div>
            {rutas &&
              rutas.map((r) => {
                return (
                  <div key={r.inicio}>
                    <div
                      className="row my-2 p-2"
                      style={{
                        backgroundColor: "#e7e7e4",
                        borderRadius: "5px",
                        fontSize: "20px",
                      }}
                    >
                      <div className="col-4 d-flex justify-content-center">
                        {r.inicio}
                      </div>
                      <div className="col-4 d-flex justify-content-center">
                        {r.llegada}
                      </div>
                      <div className="col-4 d-flex justify-content-center">
                        {r.tipo}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </Box>
      </Modal>
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
