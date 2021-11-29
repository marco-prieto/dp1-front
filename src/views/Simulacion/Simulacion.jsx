import React, { useState, useEffect } from "react";
// creates a beautiful scrollbar
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
// core components
import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";
import bgImage from "assets/img/sidebar-2.jpg";
import { Modal } from "@material-ui/core";
import { Box } from "@material-ui/core";
import SimulationMap from "map/SimulationMap.jsx";
import AccordionHRSimulacion from "../../components/CustomAccordion/AccordionHRSimulacion";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import axios from "axios";
import url from "../../config";

const useStyles = makeStyles(styles);

export default function SimulacionLayout({ ...rest }) {
  const FileDownload = require("js-file-download");
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices

  const [open, setOpen] = React.useState(false);
  const [flagSimulation, setFlagSimulation] = useState(false);
  const [flagColapso, setFlagColapso] = useState(false);
  const [flagFinSimulacion, setFlagFinSimulacion] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseSimulacion = () => {
    setFlagFinSimulacion(false);
    setFlagConfig(true);
    setFlagSimulation(false);
  };
  const handleCloseColapso = () => {
    setFlagColapso(false);
    setFlagConfig(true);
    setFlagSimulation(false);
  };

  //Config del mapa
  const [blockSize, setBlockSize] = useState(12);

  //Variables para bloqueos
  const [openBloqueos, setOpenBloqueos] = React.useState(false);
  var auxGlobalRoadblocks = [];
  const [globalRoadblocks, setGlobalRoadblocks] = React.useState([]);

  const handleOpenBloqueos = () => setOpenBloqueos(true);
  const handleCloseBloqueos = () => setOpenBloqueos(false);

  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    bgcolor: "background.paper",
    border: "1px solid #000",
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
  };

  //Info colapso
  const [infoColapso, setInfoColapso] = useState(null);

  //Variables para el back
  const [globalOrders, setGlobalOrders] = useState([]);
  //var globalOrders=[];
  var auxGlobalOrders = [];
  const [globalVelocity, setGlobalVelocity] = useState(1);
  const [simulationType, setSimulationType] = useState(2);

  const [flagConfig, setFlagConfig] = useState(true);

  const handleStartSimulacion3dias = () => {
    var data = { orders: globalOrders, speed: globalVelocity };
    axios
      .post(`${url}/algoritmo/simulacionTresDias`, data) //flag sera 2 si hay colapso
      .then((res) => {})
      .catch((error) => {
        alert("ERROR al ejecutar la simulación de 3 días");
        console.log(error);
      });
  };

  const handleStartSimulacionColapso = () => {
    var data = { orders: globalOrders, speed: globalVelocity }; //por defecto, colapso se corre a x1500
    axios
      .post(`${url}/algoritmo/simulacionColapso `, data) //flag sera 2 si hay colapso
      .then((res) => {})
      .catch((error) => {
        alert("ERROR al ejecutar la simulación de Colapso Logístico");
        console.log(error);
      });
  };

  const handleGenerarPedidos = () => {
    var data = {}; //por defecto, colapso se corre a x1500

    return axios({
      url: `${url}/pedido/generarPedidosColapso`,
      method: "GET",
      responseType: "blob", // Important
    }).then((res) => {
      console.log(res.data);
      FileDownload(res.data, "Archivos.zip");
    });
  };

  const parseElement = (el) => {
    el = el.toString();
    el = el.length >= 2 ? el : "0" + el;
    return el;
  };

  const readMultiplePedidos = (e) => {
    let files = e.currentTarget.files;
    let readers = [];

    // Abortar si no hubo archivos seleccionados
    if (!files.length) return;

    try {
      // Almacenar promesas en matriz
      for (let i = 0; i < files.length; i++) {
        readers.push(files[i]);
        //console.log(files[i]);
        handleUploadFile(files[i]);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleUploadFile = (file) => {
    try {
      if (!file) return;

      var nameFile = file.name;
      nameFile = nameFile.replace("ventas", "");
      nameFile = nameFile.replace(".txt", "");
      var date = parseInt(nameFile);
      var year = Math.trunc(date / 100);
      var month = date - year * 100;
      /* console.log(year)
        console.log(month) */

      const reader = new FileReader();

      reader.onload = (evt) => {
        var content = evt.target.result;
        var lines = content.split("\n");
        //console.log(lines)

        var orders = [];
        for (var i = 0; i < lines.length - 1; i++) {
          var line = lines[i].replace("\r", "");
          if (line.length == 0) continue;
          //console.log(i)
          //console.log(line);
          var parts = [];
          parts = line.split(":");
          if (parts.length !== 3) {
            console.log("archivo equivocado");
            return;
          }
          var day = parseInt(parts[0]);
          var hour = parseInt(parts[1]);

          parts = parts[2].split(",");
          if (parts.length !== 5) {
            console.log("archivo equivocado");
            return;
          }
          var minute = parseInt(parts[0]);
          var x = parseInt(parts[1]);
          var y = parseInt(parts[2]);
          var demandGLP = parseFloat(parts[3]);
          var slack = parseInt(parts[4]);

          month = parseElement(month);
          day = parseElement(day);
          hour = parseElement(hour);
          minute = parseElement(minute);

          var order = {
            fechaPedido:
              year +
              "-" +
              month +
              "-" +
              day +
              "@" +
              hour +
              ":" +
              minute +
              ":00",
            estadoPedido: "Nuevo",
            cantidadGLP: demandGLP,
            plazoEntrega: slack,
            nodo: { coordenadaX: x, coordenadaY: y },
          };
          //console.log(order)

          orders.push(order);
        }
        auxGlobalOrders = auxGlobalOrders.concat(orders);
        setGlobalOrders(auxGlobalOrders);

        /*cargaMasiva(objetos).then(() => {
            readPedidos()
            //aquí myuestras la notificacion
            }).catch(err => {
            //aquí notificacion de error
            });*/
      };
      reader.readAsText(file);
    } catch (error) {
      console.log("error");
    }
  };

  //bloqueos
  const handleSubmitBloqueos = () => {
    var data = globalRoadblocks;
    console.log(data);
    axios
      .post(`${url}/bloqueo/registarBloqueos`, data) //flag sera 2 si hay colapso
      .then((res) => {
        alert("Los bloqueos se registraron correctamente");
      })
      .catch((error) => {
        alert("ERROR al registrar el archivo de bloqueos");
        console.log(error);
      });
  };

  const readMultipleBloqueos = (e) => {
    let files = e.currentTarget.files;
    let readers = [];

    // Abortar si no hubo archivos seleccionados
    if (!files.length) return;

    try {
      // Almacenar promesas en matriz
      for (let i = 0; i < files.length; i++) {
        readers.push(files[i]);
        //console.log(files[i]);
        handleUploadFileBloqueo(files[i]);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleUploadFileBloqueo = (file) => {
    try {
      if (!file) return;

      var nameFile = file.name;

      nameFile = nameFile.replace("bloqueos", "");
      nameFile = nameFile.replace(".txt", "");
      var date = parseInt(nameFile);

      var year = Math.trunc(date / 100).toString();
      var month = (date - year * 100).toString();

      const reader = new FileReader();

      reader.onload = (evt) => {
        var content = evt.target.result;
        var lines = content.split("\n");

        var roadblocks = [];

        for (var i = 0; i < lines.length; i++) {
          var line = lines[i].replace("\r", "");
          if (line.length == 0) continue;

          var rb = {};
          var nodes = [];

          var data = line.split(",");
          var datesStart = data[0].split("-")[0];
          var datesEnd = data[0].split("-")[1];

          var startDate = datesStart.split(":");
          var endDate = datesEnd.split(":");

          //Parseo de fechas
          rb["startDate"] =
            year +
            "-" +
            parseElement(month) +
            "-" +
            parseElement(startDate[0]) +
            "@" +
            parseElement(startDate[1]) +
            ":" +
            parseElement(startDate[2]) +
            ":00";
          rb["endDate"] =
            year +
            "-" +
            parseElement(month) +
            "-" +
            parseElement(endDate[0]) +
            "@" +
            parseElement(endDate[1]) +
            ":" +
            parseElement(endDate[2]) +
            ":00";

          //Nodos
          const nodes_ = data.slice(1);

          for (let j = 0; j < nodes_.length; j = j + 2) {
            var dummyNode = {};
            dummyNode["x"] = nodes_[j];
            dummyNode["y"] = nodes_[j + 1];
            nodes.push(dummyNode);
          }

          //Encontrar nodos intermedios
          var aux_nodes = [];
          for (let k = 0; k < nodes.length - 1; k++) {
            aux_nodes.push({
              x: parseInt(nodes[k]["x"]),
              y: parseInt(nodes[k]["y"]),
            });
            var x0 = parseInt(nodes[k]["x"]);
            var y0 = parseInt(nodes[k]["y"]);
            var x1 = parseInt(nodes[k + 1]["x"]);
            var y1 = parseInt(nodes[k + 1]["y"]);

            //Evaluar si es incremento en x o en y
            if (Math.abs(x0 - x1) >= 2) {
              if (x1 > x0) {
                for (let q = 1; q < Math.abs(x0 - x1); q++) {
                  aux_nodes.push({ x: x0 + q, y: y0 });
                }
              } else if (x1 < x0) {
                for (let q = 1; q < Math.abs(x0 - x1); q++) {
                  aux_nodes.push({ x: x0 - q, y: y0 });
                }
              }
            } else if (Math.abs(y0 - y1) >= 2) {
              if (y1 > y0) {
                for (let q = 1; q < Math.abs(y0 - y1); q++) {
                  aux_nodes.push({ x: x0, y: y0 + q });
                }
              } else if (y1 < y0) {
                for (let q = 1; q < Math.abs(y0 - y1); q++) {
                  aux_nodes.push({ x: x0, y: y0 - q });
                }
              }
            }
          }
          aux_nodes.push({
            x: parseInt(nodes[nodes.length - 1]["x"]),
            y: parseInt(nodes[nodes.length - 1]["y"]),
          });
          rb["path"] = aux_nodes;
          rb["type"] = simulationType;

          roadblocks.push(rb);
        }

        auxGlobalRoadblocks = auxGlobalRoadblocks.concat(roadblocks);

        setGlobalRoadblocks(auxGlobalRoadblocks);
      };
      reader.readAsText(file);
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            {/* <CardHeader plain className="bg-danger"> */}
            <h4 className={classes.cardTitleWhite}>
              Registrar Simulación de Pedidos
            </h4>

            {flagConfig && (
              <div className="d-flex justify-content-between">
                <div>
                  <button
                    className="btn btn-light btn-md me-3"
                    onClick={() => {
                      handleGenerarPedidos();
                    }}
                  >
                    Generar Pedidos
                  </button>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-light btn-md me-3"
                    onClick={() => {
                      setFlagSimulation(false);

                      //Abrir modal de subir bloqueos
                      handleOpenBloqueos();
                    }}
                  >
                    Subir Bloqueos
                  </button>
                  <button
                    className="btn btn-light btn-sm"
                    onClick={() => {
                      setFlagSimulation(false);
                      handleOpen();
                    }}
                  >
                    Subir Ventas
                  </button>
                  <button
                    className="btn btn-light btn-sm ms-3"
                    onClick={() => {
                      setFlagSimulation(!flagSimulation);
                    }}
                  >
                    Ver Mapa
                  </button>
                </div>
                {/* <button
                  onClick={() => {
                    setFlagColapso(true);
                  }}
                >
                  AAAAA
                </button> */}
              </div>
            )}

            {/* <p className={classes.cardCategoryWhite}>
            Here is a subtitle for this table
          </p> */}
          </CardHeader>
        </Card>

        {flagConfig && (
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <div className="d-flex align-items-center mb-3 me-5">
                <label className="me-2">Tipo de de Simulación:</label>
                <select
                  value={simulationType}
                  className="form-select"
                  style={{ width: "auto", height: "45px" }}
                  onChange={(e) => {
                    setSimulationType(e.target.value);
                    if (e.target.value == 3) {
                      setGlobalVelocity(1500); //velocidad por defecto de la simulacion colapso
                    }
                  }}
                >
                  <option value={2} defaultValue>
                    Simulación de 3 días
                  </option>
                  <option value={3}>Simulación de Colapso Logístico</option>
                </select>
              </div>
              {simulationType == 2 && (
                <div className="d-flex align-items-center mb-3">
                  <label className="me-2">Velocidad de Simulación:</label>
                  <select
                    value={globalVelocity}
                    className="form-select"
                    style={{ width: "auto", height: "45px" }}
                    onChange={(e) => {
                      setGlobalVelocity(e.target.value);
                    }}
                  >
                    <option value={1} defaultValue>
                      1x
                    </option>
                    <option value={2}>2x</option>
                    <option value={5}>5x</option>
                    <option value={10}>10x</option>
                    <option value={20}>20x</option>
                    <option value={50}>50x</option>
                    <option value={100}>100x</option>
                    <option value={200}>200x</option>
                    <option value={300}>300x</option>
                    <option value={440}>440x</option>
                  </select>
                </div>
              )}
              <div className="d-flex align-items-center mb-3 ms-5">
                <label className="me-2">Tamaño del Mapa:</label>
                <select
                  value={blockSize}
                  className="form-select"
                  style={{ width: "auto", height: "45px" }}
                  onChange={(e) => {
                    setBlockSize(e.target.value);
                  }}
                >
                  <option value={8}>pequeño</option>
                  <option value={12}>mediano</option>
                  <option value={15}>grande</option>
                </select>
              </div>
            </div>
            <div>
              <div className="d-flex">
                <div className="me-4 mt-1 ms-2">
                  <Button
                    variant="contained"
                    component="label"
                    color="primary"
                    disabled={globalOrders.length <= 0 ? "True" : false}
                    onClick={() => {
                      if (globalOrders.length > 0) {
                        //console.log(globalOrders);
                        //console.log(globalRoadblocks);
                        if (simulationType == 2) {
                          handleStartSimulacion3dias();
                        } else {
                          handleStartSimulacionColapso();
                        }

                        setFlagSimulation(true);
                        setFlagConfig(false);
                      }
                    }}
                  >
                    Empezar Simulación
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="ms-4">
          {flagSimulation && (
            <div>
              <div className="ms-5">
                {simulationType == 2 ? (
                  <h3 className="my-2 pb-2">Simulación de 3 días</h3>
                ) : (
                  <h3 className="my-2 pb-2">Simulación de Colapso Logístico</h3>
                )}
              </div>
              <div className="d-lg-flex d-md-block">
                <SimulationMap
                  blockSize={parseInt(blockSize)}
                  speed_p={globalVelocity}
                  simulationType_p={simulationType}
                  setFlagColapso={setFlagColapso}
                  setFlagFinSimulacion={setFlagFinSimulacion}
                  setInfoColapso={setInfoColapso}
                />
                <div className="mx-4">
                  <h3
                    className="d-flex justify-content-center"
                    style={{ marginTop: "-55px" }}
                  >
                    Hoja de Rutas
                  </h3>
                  <AccordionHRSimulacion simulationType={simulationType} />
                </div>
              </div>
            </div>
          )}
        </div>
      </GridItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <h3>Subir archivo de Simulación</h3>
          <br />
          <div>
            <div className="row my-3">
              <div className="col-9">
                (*) Suba el archivo txt con la información de los pedidos,
                siguiendo el formato: día, hora de recepción, coordenada x,
                coordenada y, cantidad de combustible y plazo.
              </div>
              <div className="col-3">
                <Button variant="contained" component="label">
                  Subir Archivo
                  <input
                    type="file"
                    hidden
                    onChange={readMultiplePedidos}
                    multiple
                  />
                </Button>
              </div>
            </div>
            <br />
            <br />

            <div className="d-flex justify-content-end">
              {" "}
              <br />
              <button className="btn btn-primary" onClick={handleClose}>
                Confirmar
              </button>
            </div>
          </div>
        </Box>
      </Modal>
      <Modal
        open={flagColapso}
        onClose={handleCloseColapso}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <h3>Colapso Logístico</h3>
          <br />
          <div>
            <div className="row my-3">
              <div className="col-9">
                <div>
                  La simulación concluyó por colapso logístico el día:{" "}
                  {infoColapso && infoColapso.fechaColapso.split("T")[0]} a las
                  {infoColapso &&
                    " " + infoColapso.fechaColapso.split("T")[1]}{" "}
                  horas.
                </div>
                <br />

                <div>
                  <strong>Pedidos Atendidos: </strong>
                  {infoColapso && infoColapso.pedidosAtendidos}
                </div>
                <div>
                  <strong>Pedidos por Atender: </strong>
                  {infoColapso && infoColapso.pedidosPorAtender}
                </div>
              </div>
            </div>
            <br />

            <div className="d-flex justify-content-end">
              <br />
              <div className="d-flex ">
                <Link
                  to={{
                    pathname: "/infoColapso",
                    state: { info: infoColapso },
                  }}
                >
                  <button className="btn btn-primary me-4">
                    Ver Información del Colapso
                  </button>
                </Link>

                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setFlagColapso(false);
                    setFlagConfig(true);
                    setFlagSimulation(false);
                  }}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      <Modal
        open={flagFinSimulacion}
        onClose={handleCloseSimulacion}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <h3>Fin de la Simulación</h3>
          <br />
          <div>
            <div className="row my-3">
              <div className="col-9">
                La simulación concluyó satisfactoriamente
              </div>
            </div>
            <br />

            <div className="d-flex justify-content-end">
              {" "}
              <br />
              <button
                className="btn btn-primary"
                onClick={() => {
                  setFlagFinSimulacion(false);
                  setFlagConfig(true);
                  setFlagSimulation(false);
                }}
              >
                Confirmar
              </button>
            </div>
          </div>
        </Box>
      </Modal>
      <Modal
        open={openBloqueos}
        onClose={handleCloseBloqueos}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <h3>Agregar Bloqueo</h3>
          <br />
          <div>
            <div className="row my-3">
              <div className="col-9">
                (*) Suba el archivo txt con la información de los bloqueos en el
                formato: dd:hh:mm-dd:hh:mm,x1,y1,x2,y2,x3,y3,x4,y4......xn,yn
              </div>
              <div className="col-3">
                <Button variant="contained" component="label">
                  Subir Archivo
                  <input
                    type="file"
                    hidden
                    onChange={readMultipleBloqueos}
                    multiple
                  />
                </Button>
              </div>
            </div>
            <br />
            <br />

            <div className="d-flex justify-content-end">
              {" "}
              <br />
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleSubmitBloqueos();
                }}
              >
                Confirmar
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </GridContainer>
  );
}
