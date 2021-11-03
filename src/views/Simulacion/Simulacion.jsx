import React, {useState, useEffect} from "react";
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
import axios from 'axios';
import url from "../../config";


const useStyles = makeStyles(styles);

export default function SimulacionLayout({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices

  const [open, setOpen] = React.useState(false);
  const [flagSimulation, setFlagSimulation] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


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
  const [globalOrders, setGlobalOrders] = useState([]);
  //var globalOrders=[];
  const [globalVelocity,setGlobalVelocity]=useState(1);

  const handleStartSimulacion3dias = () =>{
    var data = globalOrders;
    axios.post(`${url}/algoritmo/simulacionTresDias`,data) //flag sera 2 si hay colapso
    .then(res => {
    }).catch(error=>{
      alert("ERROR al ejecutar la simulación de 3 días");
      console.log(error);
    })
  };

  const parseElement = (el) => {
    el = el.toString();
    el = el.length >= 2 ? el:"0"+el;
    return el;
  };

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


                month = parseElement(month);
                day = parseElement(day);
                hour = parseElement(hour);
                minute = parseElement(minute);

                var order = {
                    "fechaPedido": year+"-"+month+"-"+day+"@"+ hour +":"+minute+":00",
                    "estadoPedido": "Nuevo",
                    "cantidadGLP": demandGLP,
                    "plazoEntrega": slack,
                    "nodo": {"coordenadaX":x,"coordenadaY":y}
                }
                //console.log(order)
    
                orders.push(order);
            }
            
            setGlobalOrders(orders);
            
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
            <button className="btn btn-light btn-sm" onClick={()=>{setFlagSimulation(false);handleOpen()}}>
              Simulación de 3 días
            </button>
            <button className="btn btn-light btn-sm ms-3" onClick={()=>{setFlagSimulation(!flagSimulation)}}>
              Ver Mapa
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
          <select value={globalVelocity} className="form-select" style={{width:'90px',height:'45px'}} onChange={(e)=>{setGlobalVelocity(e.target.value)}}>
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
          <Button variant="contained" component="label" color="primary" onClick={()=>{
            if(globalOrders.length>0){
              handleStartSimulacion3dias();
              setFlagSimulation(true);
            }
          }}>
            Empezar Simulación
          </Button>
        </div>
      </div>
      <div className="ms-4">
        {flagSimulation&&
          <SimulationMap blockSize_p={12} speed_p={globalVelocity}/>
        }
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
              <div className="col-9">(*) Suba el archivo txt con la información de los pedidos, siguiendo el formato: día, hora de recepción, coordenada x, coordenada y, cantidad de combustible y plazo.</div>
              <div className="col-3">
              <Button variant="contained" component="label">
                  Subir Archivo
                  <input type="file" hidden onChange={handleUploadFile}/>
              </Button>
              </div>
          </div>
          <br/><br/>
          
          <div className="d-flex justify-content-end"> <br /><button className="btn btn-primary" onClick={handleClose}>Confirmar</button></div>
          
        </div>
      </Box>
    </Modal>
    
  </GridContainer>
);
}
