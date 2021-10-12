<<<<<<< HEAD
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* import React,{useState} from "react"; */
import * as React from 'react'
=======
import React from "react";
>>>>>>> b8f7795f88a928c03f9a8bb6b15a75f6511b4603
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
<<<<<<< HEAD
import { Modal } from "@material-ui/core";
import { Box } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { useForm } from "react-hook-form";
/* import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'; */
=======
import { Link } from "react-router-dom";
>>>>>>> b8f7795f88a928c03f9a8bb6b15a75f6511b4603

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
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const classes = useStyles();
  
  const pedid2 = [
    {
      id: 1,
      fecha: '06-09-2021',
      hora: '10:28',
      cantGLP: 25,
      plazo: 4,
      tiempoEst: 3,
      estado: 'Enrutado'
    },
    {
      id: 2,
      fecha: '06-09-2021',
      hora: '10:28',
      cantGLP: 25,
      plazo: 4,
      tiempoEst: 3,
      estado: 'Enrutado'
    },
    {
      id: 3,
      fecha: '06-09-2021',
      hora: '10:28',
      cantGLP: 25,
      plazo: 4,
      tiempoEst: 3,
      estado: 'Enrutado'
    },
  ]
  const [pedidos,setPedidos] = React.useState(pedid2)
  const [id,setId] = React.useState(4)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {register,handleSubmit,formState:{errors}} = useForm();

  const onSubmit = (data,e) =>{
    
    setId(id+1)
    data.id = id
    data.tiempoEst = 24
    data.estado = 'Enrutado'
    console.log(data)
    setPedidos([
      ...pedidos,
      data
    ])
    e.target.reset()
  }

  return (
    <GridContainer>
      {/* <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Simple Table</h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Name", "Country", "City", "Salary"]}
              tableData={[
                ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
                ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
                ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
                ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
                ["Mason Porter", "Chile", "Gloucester", "$78,615"],
              ]}
            />
          </CardBody>
        </Card>
      </GridItem> */}
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              Pedidos recibidos
            </h4>
            {/* <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p> */}
          </CardHeader>
          <GridContainer>
            <GridItem xs={12} sm={12} md={3}>
              <Link
                to="/mapa"

              >
              <button color="primary">Ver Mapa</button>
              </Link>
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <button color="primary" onClick={handleOpen}>Nuevo</button>
            </GridItem>
          </GridContainer>          
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Fecha de Recepción", "Cantidad GLP (m3)", "Plazo", "Tiempo Estimado","Estado"]}              
              tableData={pedidos}
            />
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>ID Cliente</label>
            <br/>
            <input 
            type="number" 
            name="idCliente"
            {...register("idCliente",{
                required:{
                    value: true,
                    message: 'ID del cliente requerido'
                }
            })}/>
            <br/>
            {   
                    errors.idCliente &&
                    <span className="text-danger text-small d-block mb-2">
                        {errors.idCliente.message}
                    </span>
            }
            <br/>
            <label>Fecha</label>
            <br/>
            <input 
            type="date" 
            name="fecha"
            {...register("fecha",{
              required:{
                value: true,
                message: 'Fecha requerida'
              }
            })}/>
            <br/>
            {   
                    errors.fecha &&
                    <span className="text-danger text-small d-block mb-2">
                        {errors.fecha.message}
                    </span>
            }
            <br/>
            <label>Hora</label>
            <br/>
            <input 
            type="time" 
            name="hora"
            {...register("hora",{
                required:{
                    value: true,
                    message: 'Hora requerida'
                }
            })}/>
            <br/>
            {   
                    errors.hora &&
                    <span className="text-danger text-small d-block mb-2">
                        {errors.hora.message}
                    </span>
            }
            <br/>
            <label>Coordenada X</label>
            <br/>
            <input 
            type="number" 
            name="ubicacionX"
            {...register("ubicacionX",{
                required:{
                    value: true,
                    message: 'Coordenada X requerida'
                }
            })}/>
            <br/>
            {   
                    errors.ubicacionX &&
                    <span className="text-danger text-small d-block mb-2">
                        {errors.ubicacionX.message}
                    </span>
            }
            <br/>
            <label>Coordenada Y</label>
            <br/>
            <input 
            type="number" 
            name="ubicacionY"
            {...register("UbicacionY",{
                required:{
                    value: true,
                    message: 'Coordenada Y requerida'
                }
            })}/>
            <br/>
            {   
                    errors.UbicacionY &&
                    <span className="text-danger text-small d-block mb-2">
                        {errors.UbicacionY.message}
                    </span>
            }
            <br/>
            <label>Cantidad de GLP</label>
            <br/>
            <input 
            type="number" 
            name="cantGLP"
            {...register("cantGLP",{
                required:{
                    value: true,
                    message: 'Cantidad de GLP requerida'
                }
            })}/>
            <br/>
            {   
                    errors.cantGLP &&
                    <span className="text-danger text-small d-block mb-2">
                        {errors.cantGLP.message}
                    </span>
            }
            <br/>
            <label>Plazo</label>
            <br/>
            <input 
            type="number" 
            name="plazo"
            {...register("plazo",{
                required:{
                    value: true,
                    message: 'Plazo requerido'
                }
            })}/>
            <br/>
            {   
                    errors.plazo &&
                    <span className="text-danger text-small d-block mb-2">
                        {errors.plazo.message}
                    </span>
            }
            <br/>
            <button>Agregar pedido</button>
          </form> 

        </Box>
      </Modal>
    </GridContainer>
  );
}
