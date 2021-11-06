import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import TableHojaRutas from "components/Table/TableHojaRutas.js";
import Typography from "@material-ui/core/Typography";

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

const AccordionHojaRutas = () => {
  const [expanded, setExpanded] = React.useState("");

  const handleChange = (pancamion) => (event, newExpanded) => {
    setExpanded(newExpanded ? pancamion : false);
  };

  //Pasara por props
  const hojaRuta = [
    {
      id: 1,
      codigoCamion: "TA-01",
      numPedidos: 2,
      horaSalida: "14:03:12",
      horaLlegada: "14:10:23",
      cantPetroleoActual: 12,
      cantGlpActual: 20,
      pedidos: [
        {
          idPedido: 1,
          cantidadGLP: 3,
          horaLlegada: "14:04:15",
          horaDeFinAtencion: "14:04:45",
          ubicacion: { x: 12, y: 24 },
        },
        {
          idPedido: 2,
          cantidadGLP: 2,
          horaLlegada: "14:06:35",
          horaDeFinAtencion: "14:07:05",
          ubicacion: { x: 24, y: 18 },
        },
      ],
    },
    {
      id: 2,
      codigoCamion: "TA-01",
      numPedidos: 2,
      horaSalida: "14:03:12",
      horaLlegada: "14:10:23",
      cantPetroleoActual: 12,
      cantGlpActual: 20,
      pedidos: [
        {
          idPedido: 3,
          cantidadGLP: 3,
          horaLlegada: "14:04:15",
          horaDeFinAtencion: "14:04:45",
          ubicacion: { x: 12, y: 24 },
        },
        {
          idPedido: 4,
          cantidadGLP: 2,
          horaLlegada: "14:06:35",
          horaDeFinAtencion: "14:07:05",
          ubicacion: { x: 24, y: 18 },
        },
      ],
    },
  ];

  return (
    <div>
      <div square className="mx-2" style={{ marginBottom: "-10px" }}>
        <div
          className="row align-items-center px-1"
          disableGutters="true"
          style={{
            minHeight: "60px",
            backgroundColor: "#CFCFCF",
            fontSize: "12px",
          }}
        >
          <div
            className="col-2 d-flex justify-content-center"
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
            Cantidad de Petróleo Actual
          </div>
          <div
            className="col-2 d-flex justify-content-center"
            style={{ fontWeight: "bold" }}
          >
            Cantidad de GLP Actual
          </div>
        </div>

        <AccordionDetails></AccordionDetails>
      </div>
      {hojaRuta.map((camion) => (
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
              <div className="col-2 d-flex justify-content-center">
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
                {camion.cantPetroleoActual}
              </div>
              <div className="col-2 d-flex justify-content-center">
                {camion.cantGlpActual}
              </div>
            </AccordionSummary>

            <AccordionDetails>
              <TableHojaRutas
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
