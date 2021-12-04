/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/* import React,{useState} from "react"; */
import * as React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import TablePlantas from "components/Table/TablePlantas.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Modal } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { useForm } from "react-hook-form";
/* import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'; */
import Button from "@material-ui/core/Button";
//import UploadFileIcon from '@material-ui/icons/UploadFile';
import axios from "axios";
import url from "../../config";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles(styles);

export default function OrderList() {
  const classes = useStyles();
  const FileDownload = require("js-file-download");
  const [open, setOpen] = React.useState(false);
  const [today, setToday] = React.useState();

  //params consumo mensual
  const [paramsConsumoMensual, setParamsConsumoMensual] = React.useState({
    desdeConsumo: new Date().toISOString().split("T")[0],
    hastaConsumo: new Date().toISOString().split("T")[0],
  });
  const [paramsCantidadPedidos, setParamsCantidadPedidos] = React.useState({
    desdeCantidadPedidos: new Date().toISOString().split("T")[0],
    hastaCantidadPedidos: new Date().toISOString().split("T")[0],
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOnChange = (e) => {
    setParamsConsumoMensual({
      ...paramsConsumoMensual,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChange2 = (e) => {
    setParamsCantidadPedidos({
      ...paramsCantidadPedidos,
      [e.target.name]: e.target.value,
    });
  };

  /* *************************************************************************************************************  */

  const handleReporteConsumo = () => {
    const data = {
      fechaIni: paramsConsumoMensual.desdeConsumo + " 00:00:00",
      fechaFin: paramsConsumoMensual.hastaConsumo + " 00:00:00",
    };
    console.log(data);

    return axios({
      url: `${url}/reportes/ConsumoMensual`,
      method: "POST",
      data: data,
      responseType: "blob", // Important
    }).then((response) => {
      FileDownload(response.data, "Reporte Consumo.xlsx");
    });
  };

  const handleReporteCapacidadAtencionMensual = () => {
    const data = {
      tipo: 1, //dia a dia
    };
    console.log(data);

    return axios({
      url: `${url}/reportes/capacidadAtencionMensual`,
      method: "POST",
      data: data,
      responseType: "blob", // Important
    }).then((response) => {
      FileDownload(response.data, "Reporte Capacidad de Atención Mensual.xlsx");
    });
  };

  const handleReporteCantidadPedidos = () => {
    const data = {
      fechaInicio: paramsCantidadPedidos.desdeCantidadPedidos + " 00:00:00",
      fechaInicio: paramsCantidadPedidos.hastaCantidadPedidos + " 00:00:00",
      tipo: 1, //dia a dia
    };
    console.log(data);

    return axios({
      url: `${url}/reportes/PedidosEntregados`,
      method: "POST",
      data: data,
      responseType: "blob", // Important
    }).then((response) => {
      FileDownload(response.data, "Reporte Capacidad de Atención Mensual.xlsx");
    });
  };

  React.useEffect(() => {
    if (!cookies.get("nombreUsuario")) {
      window.location.href = "./login";
    }
  }, []);

  /* *************************************************************************************************************  */

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            {/* <CardHeader plain className="bg-danger"> */}
            <div className="mb-5">
              <h3 className={classes.cardTitleWhite}>Descarga de Reportes</h3>
            </div>
          </CardHeader>

          <CardBody>
            <div>
              <div className="my-5">
                <h3>Reporte de Consumo Mensual</h3>
              </div>
              <div>
                <div
                  className="d-flex align-items-center  my-3"
                  style={{ fontSize: "20px" }}
                >
                  <div className="me-3">
                    <strong>Desde:</strong>
                  </div>
                  <div>
                    <input
                      type="date"
                      name="desdeConsumo"
                      value={paramsConsumoMensual.desdeConsumo}
                      onChange={handleOnChange}
                    ></input>
                  </div>
                </div>

                <div
                  className="d-flex align-items-center my-4"
                  style={{ fontSize: "20px" }}
                >
                  <div className="me-3 ">
                    <strong>Hasta:</strong>
                  </div>
                  <div>
                    <input
                      type="date"
                      name="hastaConsumo"
                      value={paramsConsumoMensual.hastaConsumo}
                      onChange={handleOnChange}
                    ></input>
                  </div>
                </div>
              </div>
              <Button
                variant="contained"
                component="label"
                color="primary"
                className="mt-3"
                onClick={() => {
                  handleReporteConsumo();
                }}
              >
                Descargar Reporte
              </Button>
            </div>
            <div>
              <div className="my-5">
                <h3>Reporte de Capacidad de Atención Mensual</h3>
                <Button
                  variant="contained"
                  component="label"
                  color="primary"
                  className="mt-3"
                  onClick={() => {
                    handleReporteCapacidadAtencionMensual();
                  }}
                >
                  Descargar Reporte
                </Button>
              </div>
            </div>
            <div>
              <div className="my-5">
                <h3>Reporte de Cantidad de Pedidos</h3>
              </div>
              <div>
                <div
                  className="d-flex align-items-center  my-3"
                  style={{ fontSize: "20px" }}
                >
                  <div className="me-3">
                    <strong>Desde:</strong>
                  </div>
                  <div>
                    <input
                      type="date"
                      name="desdeCantidadPedidos"
                      value={paramsCantidadPedidos.desdeCantidadPedidos}
                      onChange={handleOnChange2}
                    ></input>
                  </div>
                </div>

                <div
                  className="d-flex align-items-center my-4"
                  style={{ fontSize: "20px" }}
                >
                  <div className="me-3 ">
                    <strong>Hasta:</strong>
                  </div>
                  <div>
                    <input
                      type="date"
                      name="hastaCantidadPedidos"
                      value={paramsCantidadPedidos.hastaCantidadPedidos}
                      onChange={handleOnChange2}
                    ></input>
                  </div>
                </div>
              </div>
              <Button
                variant="contained"
                component="label"
                color="primary"
                className="mt-3"
                onClick={() => {
                  handleReporteCantidadPedidos();
                }}
              >
                Descargar Reporte
              </Button>
            </div>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
