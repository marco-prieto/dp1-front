import React from "react";
// creates a beautiful scrollbar
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components

import { makeStyles } from "@material-ui/core/styles";
import Footer from "components/Footer/Footer.js";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

// core components
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";
import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";
import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/sag/sagLogo.svg";

import AccordionColapso from "../components/CustomAccordion/AccordionColapso";
import Table from "../components/Table/Table.js";

import axios from "axios";
import url from "../config";

const useStyles = makeStyles(styles);

export default function ColapsoLayout({ props }) {
  const location = useLocation();
  const { info } = location.state;

  // styles
  const classes = useStyles();

  // ref to help us initialize PerfectScrollbar on windows devices

  // states and functions
  const [image] = React.useState(bgImage);
  const [color] = React.useState("blue");
  const FileDownload = require("js-file-download");

  const [mobileOpen, setMobileOpen] = React.useState(false);

  var hojaRuta = null;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleReporteCapacidadAtencionMensual = () => {
    const data = {
      tipo: 3, //reporte de colapso
    };
    console.log(data);

    return axios({
      url: `${url}/reportes/capacidadAtencionMensualColapso`,
      method: "POST",
      data: data,
      responseType: "blob", // Important
    }).then((response) => {
      FileDownload(
        response.data,
        "Reporte Capacidad de Atención Mensual Colapso.xlsx"
      );
    });
  };

  return (
    info && (
      <div className={classes.wrapper}>
        <Sidebar
          routes={routes}
          logoText={"SAG Logistics"}
          logo={logo}
          image={image}
          handleDrawerToggle={handleDrawerToggle}
          open={mobileOpen}
          color={color}
        />

        <div className={classes.mainPanel}>
          <div className="ms-3 mt-4 ">
            <Link to="/admin/simulacion" style={{ textDecoration: "none" }}>
              <Button variant="text" startIcon={<ArrowBackIcon />}>
                Atrás
              </Button>
            </Link>
          </div>

          <div className="container">
            <div className={classes.layPadding}>
              <div className="d-flex justify-content-center ms-5 mb-5  mt-5">
                <h1 className="my-3 pb-2">Información del Colapso</h1>
              </div>
              <div className="d-flex justify-content-between align-items-center my-5">
                <div className="me-5" style={{ fontSize: "20px" }}>
                  Descargar Reporte de Capacidad de Atención Mensual
                </div>
                <Button
                  variant="contained"
                  component="label"
                  color="primary"
                  onClick={handleReporteCapacidadAtencionMensual}
                >
                  DESCARGAR
                </Button>
              </div>

              <div className="d-flex">
                <div
                  className="d-flex align-items-center mb-3 me-5"
                  style={{ fontSize: "21px" }}
                >
                  <div className="me-2">
                    <strong>Fecha de Colapso:</strong>
                  </div>
                  <div style={{ width: "155px" }}>
                    {info && info.fechaColapso.split("T")[0]}
                  </div>
                </div>
                <div
                  className="d-flex align-items-center mb-3 ms-5"
                  style={{ fontSize: "21px" }}
                >
                  <div className="me-5">
                    <strong>Pedidos Atendidos:</strong>
                  </div>
                  <div>{info && info.pedidosAtendidos}</div>
                </div>
              </div>

              <div className="d-flex">
                <div
                  className="d-flex align-items-center mb-3 me-5"
                  style={{ fontSize: "21px" }}
                >
                  <div className="me-4">
                    <strong>Hora de Colapso:</strong>
                  </div>
                  <div style={{ width: "150px" }}>
                    {info && info.fechaColapso.split("T")[1]}
                  </div>
                </div>
                <div
                  className="d-flex align-items-center mb-3 ms-5"
                  style={{ fontSize: "21px" }}
                >
                  <div className="me-4">
                    <strong>Pedidos Por Atender:</strong>
                  </div>
                  <div>{info && info.pedidosPorAtender}</div>
                </div>
              </div>

              <div>
                <h3 className="d-flex justify-content-center mb-3 mt-5 pt-2">
                  Flota Faltante para cumplir los pedidos
                </h3>
                <h4>{info && info.flotaFaltante}</h4>
              </div>

              <div className="mt-5 pt-3" style={{ maxWidth: "1200px" }}>
                <h3 className="d-flex justify-content-center mb-4">
                  Hoja de Rutas Antes del Colapso Logístico
                </h3>
                <AccordionColapso hRuta={info.hojaRuta} />
              </div>

              <div className="mt-5 pt-3" style={{ maxWidth: "1200px" }}>
                <h3 className="d-flex justify-content-center mb-4">
                  Pedidos a ser atendidos en la siguiente ejecución del
                  algoritmo
                </h3>
                {info && (
                  <Table
                    tableHeaderColor="primary"
                    tableHead={[
                      "ID",
                      "Fecha de Recepción",
                      "Cantidad GLP (m3)",
                      "Plazo de Entrega (hr)",
                      "Fecha de Entrega",
                      "Estado",
                    ]}
                    tableData={info.pedidosEnCola}
                  />
                )}
              </div>

              {/* <button
                onClick={() => {
                  console.log(info);
                }}
              >
                Boton
              </button> */}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    )
  );
}
