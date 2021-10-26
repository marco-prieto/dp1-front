
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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /* *************************************************************************************************************  */  
  
  React.useEffect(() =>{
    //obtenerBloqueos();

    setBloqueos(mockListarBloqueos);
  }, [])
  
//   const obtenerBloqueos = () =>{
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
            {bloqueos&&
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
          <form>
            
            <div className="row my-3">
                <div className="col-9">(*) Suba el archivo txt con la información de los bloqueos en el formato: dd:hh:mm-dd:hh:mm,x1,y1,x2,y2,x3,y3,x4,y4......xn,yn</div>
                <div className="col-3">
                <Button variant="contained">
                    Subir Archivo
                </Button>
                </div>
            </div>
            <br/><br/>
            
            <div className="d-flex justify-content-end"> <br /><button className="btn btn-primary">Confirmar</button></div>
            
          </form>
        </Box>
      </Modal>
    </GridContainer>
  );
}

