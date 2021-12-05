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
import TableUsarios from "components/Table/TableUsuarios"
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
import md5 from 'md5'
import url from "../../config";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie'

const cookies = new Cookies()

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
  const [openEdit, setOpenEdit] = React.useState(false);
  const [usuarios, setUsuarios] = React.useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const [camionEdit, setCamionEdit] = React.useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /* *************************************************************************************************************  */
  const onSubmit = (data, e) => {
    console.log(data);
    e.target.reset();
    var existe = 0

    /* var dato = data
    dato.id = Math.random()*1000
    dato.password = md5(data.password)
    console.log(dato) */

    // //setPedidos([...pedidos, data]);
    usuarios.map(elemento=>{
      if(elemento.nombreUsuario == data.nombreUsuario){
        existe = 1
        //e.target.reset();        
      }
    })
    if(existe === 0){
      axios
          .post(`${url}/usuario/registrarUsuarioNuevo`, data)
          .then((res) => {
          //console.log(res);
            console.log(res.data);
            //e.target.reset();
            obtenerUsuarios();
          })
          .catch((err) => {
            console.log(err);
          });
      alert("El registro fue exitoso");
    }
    else{
      alert('Usuario ya existente');      
    }
    e.target.reset()
    /* axios
      .post(`${url}/usuario/registrarUsuarioNuevo`, data)
      .then((res) => {
        //console.log(res);
        console.log(res.data);
        e.target.reset();
        obtenerUsuarios();
      })
      .catch((err) => {
        console.log(err);
      }); */

      //handleClose();
  };
  const cerrarSesion = () => {
    cookies.remove('id',{path: "/"});
		cookies.remove('apellidoPaterno',{path: "/"});
		cookies.remove('apellidoMaterno',{path: "/"});
		cookies.remove('nombre',{path: "/"});
		cookies.remove('correo',{path: "/"});
		cookies.remove('nombreUsuario',{path: "/"});
		cookies.remove('telefono',{path: "/"});
		cookies.remove('clave',{path: "/"});
		cookies.remove('activo',{path: "/"});
    window.location.href='./login';
  }
  React.useEffect(() => {
    if(!cookies.get('nombreUsuario')){
        window.location.href="./";
    }  
    else{

        obtenerUsuarios();
    }
  }, []);

  const obtenerUsuarios = () => {
    axios.get(`${url}/usuario/listarUsuarios`).then((resp) => {
      console.log(resp.data);
      setUsuarios(resp.data);
    });
  };

  /* const parseElement = (el) => {
    el = el.toString();
    el = el.length >= 2 ? el : "0" + el;
    return el;
  };

  const registrarAveria = (id) => {
    var dateNow = new Date(Date.now());
    var today = dateNow.toLocaleString("es-ES").toString().split(" "); //[date, time]
    var date = today[0].split("/").reverse();
    var time = today[1].split(":");

    for (var i = 0; i < date.length; i++) {
      date[i] = parseElement(date[i]);
    }

    var startDate =
      date.join("-") +
      "@" +
      parseElement(time[0]) +
      ":" +
      parseElement(time[1]) +
      ":" +
      parseElement(time[2]); //formato para el back

    var data = { idCamion: id, fecha: startDate, type: 1 }; //1 = dia a dia

    console.log(data);

    axios
      .post(`${url}/averia/registrarAveriaNueva`, data)
      .then((res) => {
        alert("La avería se registró correctamente"); //hacer notificacion bonita
        console.log(res.data);
        obtenerUsuarios();
      })
      .catch((err) => {
        alert("Ocurrió un error en el registro de la avería");
      });
  };

  const handleEditCamion = () => {
    var cam = camionEdit;
    var state = parseInt(cam.estado);

    switch (state) {
      case 1:
        state = "Operativo";
        break;
      case 2:
        state = "Averiado";
        break;
      case 3:
        state = "En Ruta";
        break;
      case 4:
        state = "Mantenimiento Correctivo";
        break;
      case 5:
        state = "Mantenimiento Preventivo";
        break;
    }

    cam.estado = state;
    cam.codigoCamion = parseInt(cam.codigoCamion);

    console.log(cam);
    axios
      .post(`${url}/camion/editarCamion`, cam) //flag sera 2 si hay colapso
      .then((res) => {
        console.log(res.data);
        alert("El registro fue exitoso");
        handleCloseEdit();
        obtenerUsuarios();
      })
      .catch((error) => {
        alert("ERROR al editar la información del camión cisterna");
        console.log(error);
      });
  }; */

  /* *************************************************************************************************************  */

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            {/* <CardHeader plain className="bg-danger"> */}
            <h4 className={classes.cardTitleWhite}>
              Usuarios
            </h4>
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
            {usuarios && (
              <TableUsarios
                tableHeaderColor="primary"
                tableHead={[
                  "ID",
                  "Nombre",
                  "Apellido",
                  "Correo",
                  "Telefono"
                  /* "Capacidad GLP (m3)",
                  "Estado",
                  "Acción", */
                ]}
                tableData={usuarios}
                /* registrarAveria={registrarAveria} */
                handleOpenEdit={handleOpenEdit}
                setCamionEdit={setCamionEdit}
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
        <Box sx={style2}>
          <h3>Agregar Usuario</h3>
          {/* <br /> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-6">
                <label>Nombre</label>
                <br />
                <input
                  className="mt-1"  
                  name="nombre"
                  {...register("nombre", {
                    required: {
                      value: true,
                      message: "Nombre del usuario requerido",
                    },    
                    maxLength : {
                        value: 20,
                        message: "El nombre no debe exceder los 20 caracteres"
                    }                 
                  })}
                />
                {errors.nombre && (
                  <span className="text-danger text-small d-block mb-2">
                    {errors.nombre.message}
                  </span>
                )}
              </div>

              <div className="col-6">
                <label>Apellido Paterno</label>
                <input
                  className="mt-1"
                  type="text"
                  name="apellidoPaterno"
                  {...register("apellidoPaterno", {
                    required: {
                      value: true,
                      message: "Apellido paterno requerido",
                    },
                    maxLength : {
                        value: 20,
                        message: "El apellido no debe exceder los 20 caracteres"
                    }                    
                  })}
                />
                <br />
                {errors.apellidoPaterno && (
                  <span className="text-danger text-small d-block mb-2">
                    {errors.apellidoPaterno.message}
                  </span>
                )}
              </div>
              <br />
              <div className="col-6 mt-1">
                <label>Apellido Materno</label>
                <input
                  className="mt-1"
                  type="text"
                  name="apellidoMaterno"
                  {...register("apellidoMaterno", {
                    required: {
                      value: true,
                      message: "Apellido materno requerido",
                    },
                    maxLength : {
                        value: 20,
                        message: "El materno no debe exceder los 20 caracteres"
                    }                    
                  })}
                />
                <br />
                {errors.apellidoMaterno && (
                  <span className="text-danger text-small d-block mb-2">
                    {errors.apellidoMaterno.message}
                  </span>
                )}
              </div>
              <br />             
              
              <div className="col-6 mt-1">
                <label>Correo</label>
                <br />
                <input
                  type = "email"
                  name="correo"
                  {...register("correo", {
                    required: {
                      value: true,
                      message: "Correo requerido",
                    },                    
                  })}
                />
                {errors.correo && (
                  <span className="text-danger text-small d-block mb-2">
                    {errors.correo.message}
                  </span>
                )}
              </div>
              <div className="col-6 mt-1">                
                <label>Usuario</label>
                <br />
                <input
                  className="mt-1"
                  type="text"
                  name="nombreUsuario"
                  {...register("nombreUsuario", {
                    required: {
                      value: true,
                      message: "Usuario requerido",
                    },
                    maxLength: {
                      value: 15,
                      message: "El usuario no puede tener mas de 15 caracteres",
                    },                    
                    minLength: {
                      value: 5,
                      message: "El usuario debe tener mas de 5 caracteres",
                    },                    
                  })}
                />
                <br />
                {errors.nombreUsuario && (
                  <span className="text-danger text-small d-block mb-2">
                    {errors.nombreUsuario.message}
                  </span>
                )}
              </div>

              <div className="col-6 mt-1">
                <label>Contraseña</label>

                <input
                  className="mt-1"
                  type="password"
                  name="clave"
                  {...register("clave", {
                    required: {
                      value: true,
                      message: "Password requerido",
                    },                   
                  })}
                />
                <br />
                {errors.clave && (
                  <span className="text-danger text-small d-block mb-2">
                    {errors.clave.message}
                  </span>
                )}
              </div>                        

              <br />
              <div className="col-6">
                
                <label>Telefono</label>
                <br />
                <input
                  className="mt-1"
                  type="tel"
                  name="telefono"
                  {...register("telefono", {
                    required: {
                      value: true,
                      message: "Telefono obligatorio",
                    },                    
                  })}
                />
                <br />
                {errors.telefono && (
                  <span className="text-danger text-small d-block mb-2">
                    {errors.telefono.message}
                  </span>
                )}
              </div>

              <div></div>
            </div>

            <div className="d-flex justify-content-end mt-3">
              {" "}
              <br />
              <button className="btn btn-primary">Agregar Usuario</button>
            </div>
          </form>
        </Box>
      </Modal>
      {/* <div className="d-flex justify-content-end">
        <button 
        onClick={()=> cerrarSesion()}
        className="btn btn-secondary">Cerrar Sesión</button>
      </div> */}

      {/* <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <h3>Editar Camión Cisterna</h3>
          <br />
          <div>
            <div className="row">
              <div className="col-6">
                <label>Código del Camión</label>
                <br />
                <input
                  name="codigoCamion"
                  value={camionEdit.codigoCamion}
                  onChange={(e) => {
                    var cam = camionEdit;
                    cam.codigoCamion = parseInt(e.target.value);
                    setCamionEdit({ ...cam });
                  }}
                />
                {errors.codigoCamion && (
                  <span className="text-danger text-small d-block mb-2">
                    {errors.codigoCamion.message}
                  </span>
                )}
              </div>

              <div className="col-6">
                <label>Kilometraje</label>

                <input
                  className="mt-1"
                  type="number"
                  name="kilometraje"
                  value={camionEdit.kilometraje}
                  onChange={(e) => {
                    var cam = camionEdit;
                    cam.kilometraje = parseFloat(e.target.value);
                    setCamionEdit({ ...cam });
                  }}
                />
                <br />
                {errors.velocidadCamion && (
                  <span className="text-danger text-small d-block mb-2">
                    {errors.velocidadCamion.message}
                  </span>
                )}
              </div>
              <br />

              <div className="col-6">
                <br />
                <label>Tipo de Camión</label>

                <select
                  className="form-select"
                  value={camionEdit.tipoCamion}
                  style={{ width: "190px", height: "40px" }}
                  onChange={(e) => {
                    var cam = camionEdit;
                    cam.tipoCamion = e.target.value;
                    setCamionEdit({ ...cam });
                  }}
                >
                  <option value={1}>A</option>
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
                  type="number"
                  name="velocidadCamion"
                  value={camionEdit.velocidadCamion}
                  onChange={(e) => {
                    var cam = camionEdit;
                    cam.velocidadCamion = parseFloat(e.target.value);
                    setCamionEdit({ ...cam });
                  }}
                />
                <br />
              </div>

              <div className="col-6">
                <label>Estado</label>
                <select
                  className="form-select"
                  value={camionEdit.estado}
                  style={{ width: "auto", height: "40px" }}
                  onChange={(e) => {
                    var cam = camionEdit;
                    cam.estado = e.target.value;
                    setCamionEdit({ ...cam });
                  }}
                >
                  <option value={1}>Operativo</option>
                  <option value={2}>Averiado</option>
                  <option value={3}>En Ruta</option>
                  <option value={4}>Mantenimiento Correctivo</option>
                  <option value={5}>Mantenimiento Preventivo</option>
                </select>
                <br />
                {errors.ubicacionX && (
                  <span className="text-danger text-small d-block mb-2">
                    {errors.ubicacionX.message}
                  </span>
                )}
              </div>
            </div>

            <div className="d-flex justify-content-end mt-2">
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleEditCamion();
                }}
              >
                Editar Camión
              </button>
            </div>
          </div>
        </Box>
      </Modal> */}
    </GridContainer>
  );
}