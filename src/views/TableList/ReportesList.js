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

  const mockListarPlantas = [
    {
      id: 1,
      tipoPlanta: "TA-01",
      taraCamion: "5",
      capacidadPetroleo: "25",
      capacidadGLP: "25",
      estadoCamion: "Operativo",
    },
    {
      id: 2,
      codigoCamion: "TD-01",
      taraCamion: "1",
      capacidadPetroleo: "25",
      capacidadGLP: "5",
      estadoCamion: "Operativo",
    },
    {
      id: 3,
      codigoCamion: "TD-02",
      taraCamion: "1",
      capacidadPetroleo: "25",
      capacidadGLP: "5",
      estadoCamion: "Mantenimiento Correctivo",
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [paramsConsumoMensual, setParamsConsumoMensual] = React.useState({
    desde: "",
    hasta: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /* *************************************************************************************************************  */

  React.useEffect(() => {}, []);

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
            <div className="mb-5">
              <h3>Reporte de Consumo Mensual</h3>
            </div>

            <div
              className="d-flex align-items-center  my-3"
              style={{ fontSize: "20px" }}
            >
              <div className="me-3">
                <strong>Desde:</strong>
              </div>
              <div>
                <input type="date" name="consumoDesde"></input>
              </div>
            </div>

            <div
              className="d-flex align-items-center my-4"
              style={{ fontSize: "20px" }}
            >
              <div className="me-3">
                <strong>Hasta:</strong>
              </div>
              <div>
                <input type="date" name="consumoHasta"></input>
              </div>
            </div>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
