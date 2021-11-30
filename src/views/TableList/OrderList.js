/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/* import React,{useState} from "react"; */
import * as React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
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

  const pedid2 = [
    {
      id: 1,
      fechaPedido: "06-09-2021",
      hora: "10:28",
      cantidadGLP: 25,
      plazoEntrega: 4,
      tiempoEst: 3,
      estadoPedido: "Enrutado",
    },
    {
      id: 2,
      fechaPedido: "06-09-2021",
      hora: "10:28",
      cantidadGLP: 25,
      plazoEntrega: 4,
      tiempoEst: 3,
      estadoPedido: "Enrutado",
    },
    {
      id: 3,
      fechaPedido: "06-09-2021",
      hora: "10:28",
      cantidadGLP: 25,
      plazoEntrega: 4,
      tiempoEst: 3,
      estadoPedido: "Enrutado",
    },
    {
      id: 4,
      fechaPedido: "06-09-2021",
      hora: "10:28",
      cantidadGLP: 25,
      plazoEntrega: 4,
      tiempoEst: 3,
      estadoPedido: "Enrutado",
    },
  ];
  var auxGlobalOrders = [];
  const [globalOrders, setGlobalOrders] = React.useState([]);
  const [pedidos, setPedidos] = React.useState(null);
  const [pedidosFiltrados, setPedidosFiltrados] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /* *************************************************************************************************************  */
  //Para hacer el post.. creo q queda comentar ese setpedidos
  const onSubmit = (data, e) => {
    console.log(data);
    //setPedidos([...pedidos, data]);
    axios
      .post(`${url}/pedido/registrarPedidoNuevo`, data)
      .then((res) => {
        //console.log(res);
        console.log(res.data);
        obtenerPedidos();
        alert("El registro fue exitoso");
        e.target.reset();
      })
      .catch((err) => {
        alert("Ocurrió un error en el registro del pedido");
      });
  };

  /*
  Pedidos masivos, luego borrar
  */
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

  const handleRegistrarPedidos = () => {
    axios
      .post(`${url}/pedido/registrarListaPedidos`, globalOrders)
      .then((res) => {
        console.log("Pedidos registradossssssss");
      })
      .catch((error) => {
        alert("ERROR al registrar pedidos");
        console.log(error);
      });
  };

  /* ELIMINAR */

  React.useEffect(() => {
    obtenerPedidos();
  }, []);

  const obtenerPedidos = () => {
    axios.get(`${url}/pedido/listarPedidos`).then((resp) => {
      console.log(resp.data);
      setPedidos(resp.data);
      setPedidosFiltrados(resp.data);
    });
  };

  function filtradoNuevo(e) {
    console.log(e.estadoPedido);
    return e.estadoPedido == "Nuevo";
  }
  function filtradoEnRuta(e) {
    console.log(e.estadoPedido);
    return e.estadoPedido == "En ruta";
  }
  function filtradoAtendido(e) {
    console.log(e.estadoPedido);
    return e.estadoPedido == "Atendido";
  }

  /* *************************************************************************************************************  */

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            {/* <CardHeader plain className="bg-danger"> */}
            <h4 className={classes.cardTitleWhite}>Pedidos recibidos</h4>
            <div className="d-flex justify-content-end">
              <a href="/mapa" className="mx-2">
                <button className="btn btn-light btn-sm">Ver Mapa</button>
              </a>
              <button className="btn btn-light btn-sm" onClick={handleOpen}>
                Nuevo
              </button>
              {/* <Button variant="contained" component="label">
                Subir Archivo
                <input
                  type="file"
                  hidden
                  onChange={readMultiplePedidos}
                  multiple
                />
              </Button>
              <button
                onClick={() => {
                  console.log(globalOrders);
                  handleRegistrarPedidos();
                }}
              >
                ENVIAR
              </button> */}
            </div>

            {/* <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p> */}
          </CardHeader>
          <div className="d-flex justify-content-start align-items-center mt-4">
            <label className="me-2">Filtrar Pedidos:</label>
            <select
              className="form-select"
              style={{ width: "120px", height: "45px" }}
              onChange={(e) => {
                var val = e.target.value;
                if (val == 1) setPedidosFiltrados(pedidos);
                if (val == 2)
                  setPedidosFiltrados(pedidos.filter(filtradoNuevo));
                if (val == 3)
                  setPedidosFiltrados(pedidos.filter(filtradoEnRuta));
                if (val == 4)
                  setPedidosFiltrados(pedidos.filter(filtradoAtendido));
              }}
            >
              <option value={1} defaultValue>
                Todos
              </option>

              <option value={2}>Nuevo</option>

              <option value={3}>En ruta</option>
              <option value={4}>Atendido</option>
            </select>
          </div>
          <CardBody>
            {pedidos && (
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
                tableData={pedidosFiltrados}
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
          <h3>Agregar Pedido</h3>
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-6">
                <label>Fecha de Pedido</label>
                <br />
                <input
                  type="date"
                  name="fechaPedido"
                  {...register("fechaPedido", {
                    required: {
                      value: true,
                      message: "fechaPedido requerida",
                    },
                  })}
                />
                {errors.fechaPedido && (
                  <span className="text-danger text-small d-block mb-2">
                    {errors.fechaPedido.message}
                  </span>
                )}
              </div>
              <br />

              <br />

              <div className="col-6">
                <label>Hora</label>
                <br />
                <input
                  type="time"
                  name="hora"
                  step="1"
                  {...register("hora", {
                    required: {
                      value: true,
                      message: "Hora requerida",
                    },
                  })}
                />
                {errors.hora && (
                  <span className="text-danger text-small d-block mb-2">
                    {errors.hora.message}
                  </span>
                )}
              </div>
              <br />

              <div className="col-6">
                <br />
                <label>Coordenada X</label>

                <input
                  type="number"
                  name="ubicacionX"
                  {...register("ubicacionX", {
                    required: {
                      value: true,
                      message: "Coordenada X requerida",
                    },
                    min: {
                      value: 0,
                      message: "El valor debe ser mayor a 0",
                    },
                    max: {
                      value: 70,
                      message: "El valor debe ser maximo 70",
                    },
                  })}
                />
                <br />
                {errors.ubicacionX && (
                  <span className="text-danger text-small d-block mb-2">
                    {errors.ubicacionX.message}
                  </span>
                )}
              </div>

              <br />
              <div className="col-6">
                <br />
                <label>Coordenada Y</label>
                <br />
                <input
                  type="number"
                  name="ubicacionY"
                  {...register("ubicacionY", {
                    required: {
                      value: true,
                      message: "Coordenada Y requerida",
                    },
                    min: {
                      value: 0,
                      message: "El valor debe ser mayor a 0",
                    },
                    max: {
                      value: 50,
                      message: "El valor debe ser maximo 50",
                    },
                  })}
                />
                <br />
                {errors.ubicacionY && (
                  <span className="text-danger text-small d-block mb-2">
                    {errors.ubicacionY.message}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <br />
                <label>Cantidad de GLP</label>
                <br />
                <input
                  type="number"
                  name="cantidadGLP"
                  {...register("cantidadGLP", {
                    required: {
                      value: true,
                      message: "Cantidad de GLP requerida",
                    },
                    min: {
                      value: 0,
                      message: "El valor debe ser mayor a 0",
                    },
                    max: {
                      value: 40,
                      message: "El valor debe ser maximo 40",
                    },
                  })}
                />
                <br />
                {errors.cantidadGLP && (
                  <span className="text-danger text-small d-block mb-2">
                    {errors.cantidadGLP.message}
                  </span>
                )}
              </div>
              <div className="col-6">
                <br />
                <label>Plazo de Entrega</label>
                <br />
                <input
                  type="number"
                  name="plazoEntrega"
                  {...register("plazoEntrega", {
                    required: {
                      value: true,
                      message: "plazoEntrega requerido",
                    },
                    min: {
                      value: 0,
                      message: "El valor debe ser mayor a 0",
                    },
                    max: {
                      value: 40,
                      message: "El valor debe ser maximo 40",
                    },
                  })}
                />
                <br />
                {errors.plazoEntrega && (
                  <span className="text-danger text-small d-block mb-2">
                    {errors.plazoEntrega.message}
                  </span>
                )}
              </div>
            </div>
            <br />
            <br />
            <div className="d-flex justify-content-end">
              {" "}
              <br />
              <button className="btn btn-primary">Agregar pedido</button>
            </div>
          </form>
        </Box>
      </Modal>
    </GridContainer>
  );
}
