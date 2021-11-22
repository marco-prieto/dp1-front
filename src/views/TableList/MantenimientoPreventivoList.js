
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/* import React,{useState} from "react"; */
import * as React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import TableMantenimientoPreventivo from "components/Table/TableMantenimientoPreventivo.js";
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
import { RvHookup } from "@material-ui/icons";
import { number } from "prop-types";

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

  const mockListarMantenimientos = [
    {
        id: 1,
        fechaInicio: "06-09-2021T10:28",
        fechaFin: "06-09-2021T17:34",
    },
    {
        id: 2,
        fechaInicio: "02-11-2021T09:34",
        fechaFin: "03-11-2021T11:56",
    },
    {
        id: 1,
        fechaInicio: "16-10-2021T18:00",
        fechaFin: "16-10-2021T21:00",
    },
  ];
  const [mantenimientos, setMantenimientos] = React.useState(null);
  const [globalMantenimientos, setGlobalMantenimientos] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const parseElement = (el) => {
    el = el.toString();
    el = el.length >= 2 ? el:"0"+el;
    return el;
  };


  const handleSubmitMantenimientos = () =>{
    var data = globalMantenimientos;

      axios.post(`${url}/mantenimiento/registrarMantenimientoPreventivo`,data) //flag sera 2 si hay colapso
      .then(res => {
        alert("Los matenimientos se registraron correctamente");
        obtenerMantenimientos();
      }).catch(error=>{
        alert("ERROR al registrar el archivo de mantenimientos preventivos");
        console.log(error);
      })
  }

  /* *************************************************************************************************************  */  
  
  const obtenerMantenimientos = () =>{
    axios.get(`${url}/mantenimiento/listarMantenimientos`).then((resp)=>{
      console.log(resp.data)
      setMantenimientos(resp.data)
    })
  }

  React.useEffect(() =>{
    obtenerMantenimientos();
    //obtenerMantenimientoPreventivo();
  }, [])
  
//   const obtenerMantenimientoPreventivo = () =>{
//     axios.get(`${url}/bloqueo/listarBloqueos`).then((resp)=>{
//       console.log(resp.data)
//       setMantenimientos(resp.data)
//     })
//   }

const onInputClick = (event) => {
  event.target.value = ''
}

const handleUploadFile = e => {
  try {
      const file = e.target.files[0];
      if (!file) return;
  
      var nameFile = file.name;
  
      const reader = new FileReader();
  
      reader.onload = evt => {
  
          var content = evt.target.result;
          var lines = content.split('\n');
          //console.log(lines)
          
          var maintenance = [];

          for (var i = 0; i < lines.length -1; i++) {
              var line = lines[i].replace('\r', '');
              //console.log(line);

              var parts = []
              parts = line.split(":");

              if(parts.length!==2){
                console.log("archivo equivocado")
                return;
            }

              var date = parseInt(parts[0])
              var year = Math.trunc(date/10000)
              var monthAux = date - year*10000
              var month = Math.trunc(monthAux/100)
              var day = monthAux - month*100

              var type = "";
              var numberStr = "";

              var cad = parts[1]

              for(var j = 0; j < 2; j++){
                type = type + cad[j]
                numberStr = numberStr + cad[j+2]
              }
              var number = numberStr

              var mant = {
                "fecha" : (year+"-"+parseElement(month)+"-"+parseElement(day)+"@"+"00:00:00").toString(),
                "tipo" : type.toString(),
                "numero" : number.toString()
              }

              maintenance.push(mant)

          }
          
          //console.log(maintenance);
          setGlobalMantenimientos(maintenance)

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
            <h4 className={classes.cardTitleWhite}>Mantenimientos Preventivos Programados</h4>
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
            {mantenimientos&&
            <TableMantenimientoPreventivo
              tableHeaderColor="primary"
              tableHead={[
                "ID",
                "Código del Camión",
                "Fecha de Inicio",
                "Hora de Inicio",
                "Fecha de Fin",
                "Hora de Fin",
              ]}
              tableData={mantenimientos}
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
          <h3>Agregar Mantenimiento Preventivo</h3>
          <br />
          <div>
            
            <div className="row my-3">
                <div className="col-9">(*) Suba el archivo txt con la información de los mantenimientos en el formato: aaaammdd:TTNN</div>
                <div className="col-3">
                <Button variant="contained" component="label">
                    Subir Archivo
                    <input type="file" hidden onChange={handleUploadFile}/>
                </Button>
                </div>
            </div>
            <br/><br/>
            
            <div className="d-flex justify-content-end"> <br /><button className="btn btn-primary" onClick={()=>{handleSubmitMantenimientos()}}>Confirmar</button></div>
            
          </div>
        </Box>
      </Modal>
    </GridContainer>
  );
}

