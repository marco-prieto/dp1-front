/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/* import React,{useState} from "react"; */
import * as React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import TablePlantas from "components/Table/TablePlantas.js";
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

  const mockListarPlantas = [
    {
      id: 1,
      tipoPlanta: "TA-01",
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
  const [plantas, setPlantas] = React.useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /* *************************************************************************************************************  */
  const onSubmit = (data, e) => {
    axios
      .post(`${url}/planta/registrarPlanta`, data)
      .then((res) => {
        //console.log(res);
        console.log(res.data);
        e.target.reset();
        obtenerPlantas();
      })
      .catch((err) => {
        console.log(err);
      });

    //handleClose();
    alert("El registro fue exitoso");
  };

  React.useEffect(() => {
    obtenerPlantas();
  }, []);

  const obtenerPlantas = () => {
    axios.get(`${url}/planta/listarPlantas`).then((resp) => {
      console.log(resp.data);
      setPlantas(resp.data);
    });
  };

  /* *************************************************************************************************************  */

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            {/* <CardHeader plain className="bg-danger"> */}
            <h4 className={classes.cardTitleWhite}>Plantas Abastecedoras</h4>
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
            {plantas && (
              <TablePlantas
                tableHeaderColor="primary"
                tableHead={[
                  "ID",
                  "Tipo de Planta",
                  "Ubicación",
                  "Capacidad de GLP (m3)",
                  "Disponibilidad de GLP (m3)",
                ]}
                tableData={plantas}
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
          <h3>Agregar Planta</h3>
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-6">
                <label>Tipo de Planta</label>

                <select
                  className="form-select"
                  style={{ width: "190px", height: "40px" }}
                  {...register("tipo")}
                >
                  <option value={1} defaultValue>
                    Principal
                  </option>
                  <option value={2}>Secundaria</option>
                </select>
                <br />
                {errors.ubicacionX && (
                  <span className="text-danger text-small d-block mb-2">
                    {errors.ubicacionX.message}
                  </span>
                )}
              </div>

              <div className="col-6">
                <label>Capacidad de GLP</label>
                <br />
                <input
                  className="mt-1"
                  type="number"
                  name="capacidadGLP"
                  {...register("capacidadGLP", {
                    required: {
                      value: true,
                      message: "Capacidad GLP requerida",
                    },
                    min: {
                      value: 0,
                      message: "El valor debe ser mayor a 0",
                    },
                  })}
                />
                <br />
                {errors.velocidadCamion && (
                  <span className="text-danger text-small d-block mb-2">
                    {errors.velocidadCamion.message}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <label>Ubicación X</label>
                <br />
                <input
                  className="mt-1"
                  type="number"
                  name="x"
                  {...register("x", {
                    required: {
                      value: true,
                      message: "Velocidad del Camión requerida",
                    },
                    min: {
                      value: 0,
                      message: "El valor debe ser mayor a 0",
                    },
                    max: {
                      value: 70,
                      message: "El valor debe ser maximo 20",
                    },
                  })}
                />
                <br />
                {errors.velocidadCamion && (
                  <span className="text-danger text-small d-block mb-2">
                    {errors.velocidadCamion.message}
                  </span>
                )}
              </div>

              <div className="col-6">
                <label>Ubicación Y</label>
                <br />
                <input
                  className="mt-1"
                  type="number"
                  name="y"
                  {...register("y", {
                    required: {
                      value: true,
                      message: "Velocidad del Camión requerida",
                    },
                    min: {
                      value: 0,
                      message: "El valor debe ser mayor a 0",
                    },
                    max: {
                      value: 50,
                      message: "El valor debe ser maximo 20",
                    },
                  })}
                />
                <br />
                {errors.velocidadCamion && (
                  <span className="text-danger text-small d-block mb-2">
                    {errors.velocidadCamion.message}
                  </span>
                )}
              </div>

              <div></div>
            </div>

            <div className="d-flex justify-content-end mt-5">
              {" "}
              <button className="btn btn-primary">Registrar Camión</button>
            </div>
          </form>
        </Box>
      </Modal>
    </GridContainer>
  );
}
