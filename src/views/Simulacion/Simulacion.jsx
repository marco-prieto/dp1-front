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

// core components
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";
import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";
import bgImage from "assets/img/sidebar-2.jpg";
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

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //Agregar archivo

  const [simulacion,setSimulacion] = React.useState([])
  const [activo,setActivo] = React.useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
                    "x": x,
                    "y": y,
                    "date": year+"-"+month+"-"+day+" "+hour+":"+minute, 
                    "demandGLP": demandGLP,
                    "slack": slack
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
            console.log(orders);
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
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"SAG Logistics"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />

      <div className={classes.mainPanel}>
        <div className={classes.layPadding}>

          {/* <form onSubmit={handleSubmit(onSubmit)}>
            <input required type="file" name="simulacion" />
            <br/>
            <button>Subir Archivo</button>
          </form> */}
          <div>

            <input type="file" className="form-control form-control-lg" onChange={handleUploadFile}/>
          </div>
          <br />
          <br />
          <div>
            {/* <button disabled={!activo} className="btn btn-outline-primary">Ver Mapa</button> */}
            {/* <a href="/mapa" className="btn btn-primary btn-lg disabled" role="button" >
              <button className="btn btn-light btn-sm" disabled={!activo}>Ver Mapa</button>
              Ver Mapa
            </a> */}
            {
              activo ?
              (
                <div>
                  <a href="/simulacionMap" className="btn btn-primary btn-lg" role="button" >               
                  Simular
                  </a>
                  {/* <Stack sx={{ width: '100%' }} spacing={2}>
                    
                    <Alert severity="success">This is a success alert — check it out!</Alert>
                  </Stack> */}
                </div>
              )
              :
              (
                <p>Esperando Documento</p>
              )
              

            }
          </div>

        </div>
        
      </div>


    </div>
  );
}
