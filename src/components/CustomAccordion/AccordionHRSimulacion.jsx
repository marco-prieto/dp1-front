import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import TableHojaRutasSimulacion from "components/Table/TableHojaRutasSimulacion.js";

import axios from "axios";
import url from "../../config";

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 24,
    "&$expanded": {
      minHeight: 24,
    },
  },
  content: {
    "&$expanded": {},
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {},
}))(MuiAccordionDetails);

const AccordionHojaRutas = ({ simulationType }) => {
  const [expanded, setExpanded] = React.useState("");

  const handleChange = (pancamion) => (event, newExpanded) => {
    setExpanded(newExpanded ? pancamion : false);
  };

  //Pasara por props
  const [hRuta, setHRuta] = useState(null);
  const requestInterval = 20 * 1000; //en segundos

  React.useEffect(() => {
    obtenerHojaRuta();

    const interval = setInterval(() => {
      obtenerHojaRuta();
    }, requestInterval);
    return () => clearInterval(interval);
  }, []);

  const obtenerHojaRuta = () => {
    var data = { tipo: simulationType };
    axios.post(`${url}/algoritmo/obtenerHojaDeRuta`, data).then((resp) => {
      console.log(resp.data);
      setHRuta(resp.data);
    });
  };

  return (
    <div>
      <div square className="mx-2 " style={{ marginBottom: "-10px" }}>
        <div
          className="row align-items-center ps-4 pe-3"
          disableGutters="true"
          style={{
            minHeight: "60px",
            backgroundColor: "#CFCFCF",
            fontSize: "12px",
          }}
        >
          <div
            className="col-1 d-flex justify-content-center"
            style={{ fontWeight: "bold" }}
          >
            Código del Camión
          </div>
          <div
            className="col-2 d-flex justify-content-center"
            style={{ fontWeight: "bold" }}
          >
            Número de Pedidos
          </div>
          <div
            className="col-2 d-flex justify-content-center"
            style={{ fontWeight: "bold" }}
          >
            Hora de Salida
          </div>
          <div
            className="col-2 d-flex justify-content-center"
            style={{ fontWeight: "bold" }}
          >
            Hora de Regreso
          </div>
          <div
            className="col-2 d-flex justify-content-center"
            style={{ fontWeight: "bold" }}
          >
            Cantidad de Petróleo Utilizado (m3)
          </div>
          <div
            className="col-2 d-flex justify-content-center"
            style={{ fontWeight: "bold" }}
          >
            Cantidad Petróleo Restante (m3)
          </div>
          <div
            className="col-1 d-flex justify-content-center"
            style={{ fontWeight: "bold" }}
          >
            Cantidad de GLP Entregado (m3)
          </div>
        </div>

        <AccordionDetails></AccordionDetails>
      </div>
      {hRuta &&
        hRuta.map((camion) => (
          <div key={camion.id}>
            <Accordion
              square
              expanded={expanded === "pancamion" + `${camion.id}`}
              onChange={handleChange("pancamion" + `${camion.id}`)}
            >
              <AccordionSummary
                id="pancamion1d-header"
                className="row"
                style={{ fontSize: "13px" }}
              >
                <div className="col-1 d-flex justify-content-center">
                  {camion.codigoCamion}
                </div>
                <div className="col-2 d-flex justify-content-center">
                  {camion.numPedidos}
                </div>
                <div className="col-2 d-flex justify-content-center">
                  {camion.horaSalida}
                </div>
                <div className="col-2 d-flex justify-content-center">
                  {camion.horaLlegada}
                </div>
                <div className="col-2 d-flex justify-content-center">
                  {Math.round(camion.cantPetroleoActual * 100) / 100}
                </div>
                <div className="col-2 d-flex justify-content-center">
                  {Math.round(camion.cantPetroleoFinalRuta * 100) / 100}
                </div>
                <div className="col-1 d-flex justify-content-center me-2">
                  {Math.round(camion.cantGlpActual * 100) / 100}
                </div>
              </AccordionSummary>

              <AccordionDetails>
                <TableHojaRutasSimulacion
                  tableHeaderColor="primary"
                  style={{ marginTop: "-5px" }}
                  tableHead={[
                    "ID",
                    "Cantidad de GLP",
                    "Hora de Llegada",
                    "Hora de Salida",
                    "Ubicación (x,y)",
                  ]}
                  tableData={camion.pedidos}
                />
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
    </div>
  );
};
export default AccordionHojaRutas;
