/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/* import React,{useState} from "react"; */
import * as React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import TableBloqueos from "components/Table/TableBloqueos.js";
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
import { RvHookup } from "@material-ui/icons";

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
  width: 900,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles(styles);

export default function OrderList() {
  const classes = useStyles();

  const mockListarBloqueos = [
    {
      id: 1,
      fechaInicio: "06-09-2021",
      horaInicio: "10:28",
      fechaFin: "06-09-2021",
      horaFin: "17:34",
    },
    {
      id: 2,
      fechaInicio: "02-11-2021",
      horaInicio: "09:34",
      fechaFin: "03-11-2021",
      horaFin: "11:56",
    },
    {
      id: 1,
      fechaInicio: "16-10-2021",
      horaInicio: "18:00",
      fechaFin: "16-10-2021",
      horaFin: "21:00",
    },
  ];
  const [bloqueos, setBloqueos] = React.useState(null);
  const [globalRoadblocks, setGlobalRoadblocks] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /* *************************************************************************************************************  */

  React.useEffect(() => {
    obtenerBloqueos();
  }, []);

  const obtenerBloqueos = () => {
    const data = { velocidad: 1, tipo: 1 };
    axios.post(`${url}/bloqueo/listarBloqueos`, data).then((resp) => {
      console.log(resp.data);
      setBloqueos(resp.data);
    });
  };

  const handleSubmitBloqueos = () => {
    var data = globalRoadblocks;
    console.log(data);
    // axios.post(`${url}/bloqueo/registarBloqueos`,data) //flag sera 2 si hay colapso
    // .then(res => {
    //   alert("Los bloqueos se registraron correctamente");
    //   obtenerBloqueos();
    // }).catch(error=>{
    //   alert("ERROR al registrar el archivo de bloqueos");
    //   console.log(error);
    // })
  };

  const onInputClick = (event) => {
    event.target.value = "";
  };

  const parseElement = (el) => {
    el = el.toString();
    el = el.length >= 2 ? el : "0" + el;
    return el;
  };

  const handleUploadFile = (e) => {
    try {
      const file = e.target.files[0];
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
          rb["type"] = 1;

          roadblocks.push(rb);
        }
        setGlobalRoadblocks(roadblocks);
        //console.log(roadblocks);
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

  /* *************************************************************************************************************  */

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            {/* <CardHeader plain className="bg-danger"> */}
            <h4 className={classes.cardTitleWhite}>Bloqueos Activos</h4>
            <div className="d-flex justify-content-end">
              <button className="btn btn-light btn-sm" onClick={handleOpen}>
                Nuevo
              </button>
            </div>

            {/* <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p> */}
          </CardHeader>

          <CardBody>
            {bloqueos && (
              <TableBloqueos
                tableHeaderColor="primary"
                tableHead={[
                  "ID",
                  "Fecha de Inicio",
                  "Hora de Inicio",
                  "Fecha de Fin",
                  "Hora de Fin",
                ]}
                tableData={bloqueos}
              />
            )}
          </CardBody>
        </Card>
      </GridItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <Box sx={style2}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box> */}
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
                  <input type="file" hidden onChange={handleUploadFile} />
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
