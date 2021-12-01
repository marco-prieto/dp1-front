import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../../config";

const CapacidadAtencion = ({ simulationType }) => {
  const [capacidad, setCapacidad] = useState(null);
  const requestInterval = 6 * 1000; //en segundos

  React.useEffect(() => {
    obtenerCapacidad();

    const interval = setInterval(() => {
      //Request a obtener ruta pedidos y volver a inicializar las banderas con initFlags()
      obtenerCapacidad();
    }, requestInterval);
    return () => clearInterval(interval);
  }, []);

  const obtenerCapacidad = () => {
    var data = { tipo: simulationType };
    axios
      .post(`${url}/reportes/capacidadAtencion`, data)
      .then((resp) => {
        console.log("CAPACIDAD", resp.data);
        setCapacidad(resp.data["indicador"]);
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

  return (
    capacidad != null && (
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
          <strong>Capacidad de Atención:</strong>
        </div>
        <div className="">{Math.round(capacidad * 100) / 100}%</div>
      </div>
    )
  );
};
export default CapacidadAtencion;
