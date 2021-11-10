
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
        codigoCamion: "TA-01",
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
  const [camiones, setCamiones]  = React.useState(null);


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
    axios.post(`${url}/camion/registrarCamionNuevo`,data)
    .then(res => {
      //console.log(res);
      console.log(res.data);
      e.target.reset();
      obtenerCamiones()
    }).catch((err)=>{console.log(err)});
    
    
    //handleClose();
    alert('El registro fue exitoso')
  };
  
  React.useEffect(() =>{
    obtenerCamiones();
  }, [])
  
  const obtenerCamiones = () =>{
    axios.get(`${url}/camion/listarCamiones`).then((resp)=>{
      console.log(resp.data)
      setCamiones(resp.data)
    })
  }

  const parseElement = (el) => {
    el = el.toString();
    el = el.length >= 2 ? el:"0"+el;
    return el;
  };

  const registrarAveria = (id) => {

    var dateNow = new Date(Date.now());
    var today = dateNow.toLocaleString('es-ES').toString().split(" "); //[date, time]
    var date = today[0].split('/').reverse()
    var time = today[1].split(":");

    for(var i=0;i<date.length;i++){
      date[i] = parseElement(date[i]);
    }

    var startDate = date.join('-')+"@"+parseElement(time[0])+":"+parseElement(time[1])+":"+parseElement(time[2]); //formato para el back
  
    var data = {"idCamion":id,"fecha":startDate, "type":1}; //1 = dia a dia
  
    console.log(data);
    
    axios.post(`${url}/averia/registrarAveriaNueva`,data)
    .then(res => {
      alert("La avería se registró correctamente"); //hacer notificacion bonita
      console.log(res.data);
      obtenerCamiones()
      
    }).catch(err=>{alert('Ocurrió un error en el registro de la avería')})
    
  };
  
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
                "Código del Camión",
                "TARA Camión",
                "Capacidad de Petróleo (m3)",
                "Capacidad GLP (m3)",
                "Estado",
                "Acción",
              ]}
              tableData={camiones}
              registrarAveria={registrarAveria}
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
                <label>Código del Camión</label>
                <br />
                <input
                  
                  name="codigoCamion"
                  {...register("codigoCamion", {
                    required: {
                      value: true,
                      message: "Código del Camión requerido",
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
                </div>
              <br />
              
              <div className="col-6">
              <br />
                <label>Tipo de Camión</label>
                
                <select className="form-select" style={{width:'190px',height:'40px'}} {...register("tipoCamion")}>
                    <option value={1} defaultValue>A</option>
                    <option value={2}>B</option>
                    <option value={3}>C</option>
                    <option value={4}>D</option>
                  </select>
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
                <label>Velocidad del Camión</label>
                <br />
                <input
                  className="mt-1"
                  type="number"
                  name="velocidadCamion"
                  {...register("velocidadCamion", {
                    required: {
                      value: true,
                      message: "Velocidad del Camión requerida",
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

            </div>
            </div>
            
            <div className="d-flex justify-content-end mt-3"> <br /><button className="btn btn-primary">Registrar Camión</button></div>
            
          </form>
        </Box>
      </Modal>
    </GridContainer>
  );
}

