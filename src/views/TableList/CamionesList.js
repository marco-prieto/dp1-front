
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/* import React,{useState} from "react"; */
import * as React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import TableCamiones from "components/Table/TableCamiones.js";
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
import axios from 'axios';
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

  const mockListarCamiones = [
    {
        id: 1,
        tipoCamion: "A",
        taraCamion: "5",
        capacidadPetroleo: "25",
        capacidadGLP: "25",
        estadoCamion: "Operativo",
    },
    {
        id: 2,
        tipoCamion: "D",
        taraCamion: "1",
        capacidadPetroleo: "25",
        capacidadGLP: "5",
        estadoCamion: "Operativo",
    },
    {
      id: 3,
      tipoCamion: "D",
      taraCamion: "1",
      capacidadPetroleo: "25",
      capacidadGLP: "5",
      estadoCamion: "Mantenimiento Correctivo",
  },
  ];
  const [camiones, setCamiones] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /* *************************************************************************************************************  */  
  const onSubmit = (data, e) => {
    console.log(data);
    e.target.reset();
    // //setPedidos([...pedidos, data]);
    // axios.post(`${url}/pedido/registrarPedidoNuevo`,data)
    // .then(res => {
    //   //console.log(res);
    //   console.log(res.data);
    // }) 
    // obtenerAverias()
    // e.target.reset();
    // //handleClose();
    // alert('El registro fue exitoso')
  };
  
  React.useEffect(() =>{
    //obtenerAverias();

    setCamiones(mockListarCamiones);
  }, [])
  
//   const obtenerAverias = () =>{
//     axios.get(`${url}/`).then((resp)=>{
//       console.log(resp.data)
//       setPedidos(resp.data)
//     })
//   }
  
  /* *************************************************************************************************************  */

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
          {/* <CardHeader plain className="bg-danger"> */}
            <h4 className={classes.cardTitleWhite}>Camiones Cisterna en la Flota</h4>
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
            {camiones&&
            <TableCamiones
              tableHeaderColor="primary"
              tableHead={[
                "ID",
                "Tipo Camión",
                "TARA Camión",
                "Capacidad de Petróleo (m3)",
                "Capacidad GLP (m3)",
                "Estado",
                "Acción",
              ]}
              tableData={camiones}
            />
            }
          </CardBody>
        </Card>
      </GridItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <h3>Agregar Camión Cisterna</h3>
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-6">
                <label>Tipo Camión</label>
                <br />
                <input
                  type="number"
                  name="tipoCamion"
                  {...register("tipoCamion", {
                    required: {
                      value: true,
                      message: "Tipo Camión requerido",
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
                  <label>TARA</label>
                  <br />
                  <input
                    type="number"
                    name="taraCamion"
                    {...register("taraCamion", {
                      required: {
                        value: true,
                        message: "TARA requerida",
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
                <label>Capacidad de Petróleo (m3)</label>
                
                <input
                  type="number"
                  name="capacidadPetroleo"
                  {...register("capacidadPetroleo", {
                    required: {
                      value: true,
                      message: "Capacidad Petróleo requerida",
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
                <label>Capacidad de GLP (m3)</label>
                <br />
                <input
                  type="number"
                  name="capacidadGLP"
                  {...register("capacidadGLP", {
                    required: {
                      value: true,
                      message: "Capacidad GLP requerida",
                    },
                  })}
                />
                <br />
                {errors.UbicacionY && (
                  <span className="text-danger text-small d-block mb-2">
                    {errors.UbicacionY.message}
                  </span>
                )}
              </div>
              
              <div>
              <br/>
                <div>
                    <label>Estado</label>
                    <br/>
                    <select className="form-select" style={{width:'auto',height:'45px'}} {...register("estadoCamion")}>
                      <option value={1} defaultValue>Operativo</option>
                      <option value={2}>Mantenimiento Correctivo</option>
                      <option value={3}>Mantenimiento Preventivo</option>
                    </select>
                </div>
            </div>
            </div>
            
            <div className="d-flex justify-content-end mt-3"> <br /><button className="btn btn-primary">Registrar Camión</button></div>
            
          </form>
        </Box>
      </Modal>
    </GridContainer>
  );
}

