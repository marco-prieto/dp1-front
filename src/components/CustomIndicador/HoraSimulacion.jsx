import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../../config";

const CapacidadAtencion = ({ simulationType, speed }) => {
  const [horaSimulacion, setHoraSimulacion] = useState(null);
  const requestInterval = 6 * 1000; //en segundos

  React.useEffect(() => {
    obtenerHoraSimulacion();

    const interval = setInterval(() => {
      //Request a obtener ruta pedidos y volver a inicializar las banderas con initFlags()
      obtenerHoraSimulacion();
    }, requestInterval);
    return () => clearInterval(interval);
  }, []);

  const obtenerHoraSimulacion = () => {
    var data = { tipo: simulationType, velocidad: speed };
    axios
      .post(`${url}/algoritmo/tiempoSimulacion`, data)
      .then((resp) => {
        console.log(resp.data);
        var fecha = resp.data["horaActual"].split("T")[0];
        var horas = resp.data["horaActual"].split("T")[1];

        var dia = fecha.split("-")[2];
        var hora = horas.split(":")[0];
        var min = horas.split(":")[1];

        setHoraSimulacion(dia + "-" + hora + ":" + min);
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

  return (
    horaSimulacion != null && (
      <div
        className="d-flex my-4 px-2 py-3"
        style={{
          fontSize: "20px",
          maxWidth: "310px",
          backgroundColor: "#cacace",
          borderRadius: "5px",
        }}
      >
        <div className="me-3">
          <strong>Hora de la Simulación:</strong>
        </div>
        <div className="">{horaSimulacion}</div>
      </div>
    )
  );
};
export default CapacidadAtencion;
