import React from "react";
// creates a beautiful scrollbar
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components

/* import {Alert} from '@material-ui/core/';
import {Stack} from '@material-ui/core/'; */
import { makeStyles } from "@material-ui/core/styles";

import Footer from "components/Footer/Footer.js";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
// core components
import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";
import bgImage from "assets/img/sidebar-2.jpg";
import { Modal } from "@material-ui/core";
import { Box } from "@material-ui/core";
import logo from "assets/sag/sagLogo.svg";
import axios from "axios"

import SimulationMap from "map/SimulationMap.jsx";
import { useForm } from "react-hook-form";

const useStyles = makeStyles(styles);

export default function SimulacionLayout({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices

  // states and functions
  const [image] = React.useState(bgImage);
  const [color] = React.useState("blue");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [mobileOpen, setMobileOpen] = React.useState(false);

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



  //Variables para el back
  var globalOrders;
  var globalVelocity;


  /* const onSubmit = (data,e) => {
    const file = data.simulacion[0]
    console.log(file)    
    
  } */

  /* const onChange = (e) => {
    const file = e.target.files[0];    
    console.log(file)
  } */

  const handleUploadFile = e => {
    try {
        const file = e.target.files[0];
        if (!file) return;
    
        var nameFile = file.name;
        nameFile = nameFile.replace("ventas", "")
        nameFile = nameFile.replace(".txt", "")
        var date = parseInt(nameFile);
        var year = Math.trunc(date / 100);
        var month = date - year * 100;
        /* console.log(year)
        console.log(month) */
    
        const reader = new FileReader();
    
        reader.onload = evt => {
    
            var content = evt.target.result;
            var lines = content.split('\n');
            //console.log(lines)
    
            var orders = [];
            for (var i = 0; i < lines.length -1; i++) {
                var line = lines[i].replace('\r', '');
                //console.log(i)
                //console.log(line)
                var parts = []
                parts = line.split(":");
                if(parts.length!==3){
                    console.log("archivo equivocado")
                    return;
                }
                var day = parseInt(parts[0]);
                var hour = parseInt(parts[1]);
        
                parts = parts[2].split(",");
                if(parts.length!==5){
                    console.log("archivo equivocado")
                    return;
                }
                var minute = parseInt(parts[0]);
                var x = parseInt(parts[1]);
                var y = parseInt(parts[2]);
                var demandGLP = parseFloat(parts[3]);
                var slack = parseInt(parts[4]);
        
                var order = {
                    "ubicacionX": x,
                    "ubicacionY": y,
                    "fechaPedido": year+"-"+month+"-"+day,
                    "hora": hour+":"+minute+":00", 
                    "cantidadGLP": demandGLP,
                    "plazoEntrega": slack
                }
                //console.log(order)
    
                orders.push(order);
            }
            
            /* setSimulacion(order)
            console.log(simulacion) */


            /* axios.post(`${url}/pedido/registrarPedidoNuevo`,orders)
            .then(res => {
              
              console.log(orders);
            }) 
             */
            globalOrders = orders;
            console.log(globalOrders);
            setActivo(true)


            
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

return (
  <GridContainer>
    <GridItem xs={12} sm={12} md={12}>
      <Card plain>
        <CardHeader plain color="primary">
        {/* <CardHeader plain className="bg-danger"> */}
          <h4 className={classes.cardTitleWhite}>Registrar Simulación de Pedidos</h4>
          <div className="d-flex justify-content-end">
            <button className="btn btn-light btn-sm" onClick={handleOpen}>
              Simulación de 3 días
            </button>
          </div>

          {/* <p className={classes.cardCategoryWhite}>
            Here is a subtitle for this table
          </p> */}
        </CardHeader>
      </Card>
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center mb-3">
          <label className='me-2'>Velocidad de Simulación:</label>
          <select className="form-select" style={{width:'80px',height:'45px'}} onChange={(e)=>{globalVelocity=e.target.value,console.log(globalVelocity)}}>
            <option value={1} defaultValue>1x</option>
            <option value={2}>2x</option>
            <option value={5}>5x</option>
            <option value={10}>10x</option>
            <option value={20}>20x</option>
            <option value={50}>50x</option>
            <option value={100}>100x</option>
          </select>
        </div>
        <div>
          <Button variant="contained" component="label" color="primary">
            Empezar Simulación
          </Button>
        </div>
      </div>
      <div className="ms-4">
        <SimulationMap blockSize_p={12} />
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
        <form>
          
          <div className="row my-3">
              <div className="col-9">(*) Suba el archivo txt con la información de los pedidos, siguiendo el formato: día, hora de recepción, coordenada x, coordenada y, cantidad de combustible y plazo.</div>
              <div className="col-3">
              <Button variant="contained" component="label">
                  Subir Archivo
                  <input type="file" hidden onChange={handleUploadFile}/>
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
