import React,{useState,useEffect} from 'react'
import {Bar} from 'react-chartjs-2'
import axios from 'axios'
import url from "../../config";
import { useForm } from "react-hook-form";

function DiagramaBarrasPetroleo() {

  /* const [minutos,setMinutos] = useState([])
  const [paises,setPaises] = useState([]) */
  /* const [cantidadGLP,setCantidadGLP] = useState([])
  const [idCamiones,setIdCamiones] = useState([]) */
  const [fechas,setFechas] = useState([])
  const [consumos,setConsumos] = useState([])
  const [tipoRango,setTipoRango] = useState(1)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const data={
    
    labels: fechas,
    /* labels: ['20-11-2021','21-11-2021','22-11-2021','23-11-2021'], */
    /* labels: ['2018','2019','2020','2021'], */
    //labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
    /* labels: idCamiones, */
    datasets:[{
      label: 'Consumo de Petróleo',
      backgroundColor: '#335c81',
      borderColor: 'black',
      borderWidth: 1,
      hoverBackgroundColor: '#5899e2',
      hoverBorderColor: '#5899e2',
      data: consumos
      //data: [700,300,200,450,150,200,135,80,215,90,0,75,500,100,200,450,150,200,135,80]
      /* data: cantidadGLP */
    }]
  }
  const opciones={
    maintainAspectRatio: false,
    responsive: true
  }

  /* const peticionApi= async() =>{
    
    await axios.post(`${url}/reportes/GLPEntregadoXCamion`,{
      "fecha":"2021-11-24 00:00:00"
    })
    .then(response=>{
      console.log(response.data)
      var respuesta= response.data
      var auxIds=[],auxCantidad=[]
      respuesta.map(elemento=>{
        auxIds.push(elemento.idCamion)
        auxCantidad.push(elemento.cantidadGLP)
      })
      setIdCamiones(auxIds)
      setCantidadGLP(auxCantidad)
    })
  } */

  /* const peticionApi= async() =>{
    await axios.get('http://localhost:3001/entregaGLP')
    .then(response=>{
      console.log(response.data)
      var respuesta= response.data
      var auxIds=[],auxCantidad=[]
      respuesta.map(elemento=>{
        auxIds.push(elemento.idCamion)
        auxCantidad.push(elemento.cantidadGLP)
      })
      setIdCamiones(auxIds)
      setCantidadGLP(auxCantidad)
    })
  } */
  /* const peticionApi= async() =>{
    await axios.get('http://localhost:3001/consumoPetroleo')
    .then(response=>{
      console.log(response.data)
      var respuesta= response.data
      var auxFechas=[],auxConsumo=[]
      respuesta.map(elemento=>{
        auxFechas.push(elemento.fecha)
        auxConsumo.push(elemento.consumo)
      })
      setFechas(auxFechas)
      setConsumos(auxConsumo)
    })
  } */
  const onSubmit = (data, e) => {
    console.log(data);
    if (tipoRango == 1){
      var dato = {
        "fechaInicio": data.fechaInicio + ' 00:00:00',
        "fechaFin": data.fechaFin + ' 00:00:00',
        tipo:1
      }
    }
    if(tipoRango == 3){
      var dato = {
        "fechaInicio": data.fechaInicio + '-01-01 00:00:00',
        "fechaFin": data.fechaFin + '-12-31 00:00:00',
        tipo:1
      }
    }
    if(tipoRango == 2){
      var dato = {
        "fechaInicio": data.fechaInicio + '-01 00:00:00',
        "fechaFin": data.fechaFin + '-31 00:00:00',
        tipo:1
      }
      var rangoIni = data.fechaInicio.split("-")
      var rangoFin = data.fechaFin.split("-")
      console.log('Imprimiendo rangos y diferencias')
      /* console.log(rangoIni)
      console.log(rangoIni[0])
      console.log(rangoIni[1])
      console.log(rangoFin)
      console.log(rangoFin[0])
      console.log(rangoFin[1]) */
      
      var diferenciaAnios = 0,diferenciaMeses = 0,bucle

      if(parseInt(rangoFin[0],10) > parseInt(rangoIni[0],10)){
        diferenciaAnios = parseInt(rangoFin[0],10) - parseInt(rangoIni[0],10)
        if(parseInt(rangoFin[1],10) > parseInt(rangoIni[1],10)){

          diferenciaMeses = parseInt(rangoFin[1],10) - parseInt(rangoIni[1],10) + 1
          bucle = diferenciaAnios*12 + diferenciaMeses
        } 
        else{
          diferenciaMeses = 13 - parseInt(rangoIni[1]) + parseInt(rangoFin[1])
          bucle = (diferenciaAnios -1)*12 + diferenciaMeses
        }
      }
      else{
        diferenciaMeses = parseInt(rangoFin[1],10) - parseInt(rangoIni[1],10) + 1
        bucle = diferenciaMeses
      }
      /* console.log(diferenciaMeses)
      console.log(diferenciaAnios)
      console.log(bucle) */
    }


    console.log(dato)
    axios.post(`${url}/reportes/consumoPetroleoXFechas`,dato).
    then(response=>{
      console.log(response.data)
      var respuesta= response.data.consumoPetroleoNodoFront
      console.log(respuesta)
      var auxFechas=[],auxConsumo=[],contMes = 0,anterior = "00/00",nuevo = 0
      respuesta.map(elemento=>{
        /* console.log(elemento.fecha)
        console.log(elemento.consumo) */
        if(tipoRango == 1){

          auxFechas.push(elemento.fecha)
          auxConsumo.push(elemento.consumo)
        }
        if(tipoRango == 2){
          if(anterior != elemento.fecha.substring(0,7)){
            if(nuevo == 0){
              nuevo = 1
            }
            else{
              auxConsumo.push(contMes)
            }
            anterior = elemento.fecha.substring(0,7)            
            auxFechas.push(anterior)
            contMes = 0
          }
          else{
            contMes += elemento.consumo
          }
          /* if(elemento.fecha.includes(fechaInicio)){
            auxFechas.push(fechaInicio)
          }
          auxFechas.push(elemento.fecha)
          auxConsumo.push(elemento.consumo) */
        }
        if(tipoRango == 3){
          console.log('Tipo 3 presente')
          if(anterior != elemento.fecha.substring(0,4)){
            if(nuevo == 0){
              nuevo = 1
            }
            else{
              auxConsumo.push(contMes)
            }
            anterior = elemento.fecha.substring(0,4)            
            auxFechas.push(anterior)
            contMes = 0
          }
          else{
            contMes += elemento.consumo
          }
        }        
      })      
      if(tipoRango == 2 || tipoRango == 3)
        auxConsumo.push(contMes)  
      setFechas(auxFechas)
      setConsumos(auxConsumo)
    })
    .catch((err) =>{
      alert("Ocurrió un error en la petición de reportes");
    })

    /////////////////////////////////////////////////////
    //setPedidos([...pedidos, data]);
    /* axios
      .post(`${url}/pedido/registrarPedidoNuevo`, data)
      .then((res) => {
        //console.log(res);
        console.log(res.data);
        obtenerPedidos();
        alert("El registro fue exitoso");
        e.target.reset();
      })
      .catch((err) => {
        alert("Ocurrió un error en el registro del pedido");
      }); */
  };

  useEffect(() =>{
    //peticionApi()
  },[])

  return (
    <div className="container" style={{width: '100%', height: '550px'}}>
      <h3>Consumo de Petróleo</h3>
      <form  onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
              <div className="col-4">
                  <label className="me-2">Vista</label>
                  <select
                    value={tipoRango}
                    className="form-select"
                    style={{ width: "auto", height: "40px" }}
                    onChange={(e) => {
                      setTipoRango(e.target.value);
                    }}
                  >
                    <option value={1} defaultValue>
                      diario
                    </option>
                    <option value={2}>mensual</option>  
                    <option value={3}>anual</option>                                       
                  </select>
              </div>
              {
                tipoRango == 1 && (
                  <div className="row mt-1">
                    <div className="col-4">
                      <label>Fecha Inicio</label>
                      <br />
                      <input
                        type="date"
                        name="fechaInicio"
                        {...register("fechaInicio", {
                          required: {
                            value: true,
                            message: "fechaInicio requerida",
                          },
                        })}
                      />
                      {errors.fechaInicio && (
                        <span className="text-danger text-small d-block mb-2">
                          {errors.fechaInicio.message}
                        </span>
                      )}
                    </div>
                    <div className="col-4">
                      <label>Fecha Fin</label>
                      <br />
                      <input
                        type="date"
                        name="fechaFin"
                        {...register("fechaFin", {
                          required: {
                            value: true,
                            message: "fechaFin requerida",
                          },
                        })}
                      />
                      {errors.fechaFin && (
                        <span className="text-danger text-small d-block mb-2">
                          {errors.fechaFin.message}
                        </span>
                      )}
                    </div>
                  </div>
                )                
              }
              {
                tipoRango == 2 && (
                  <div className="row mt-1">
                    <div className="col-4">
                      <label>Fecha Inicio</label>
                      <br />
                      <input
                        type="month"
                        name="fechaInicio"
                        {...register("fechaInicio", {
                          required: {
                            value: true,
                            message: "fechaInicio requerida",
                          },
                        })}
                      />
                      {errors.fechaInicio && (
                        <span className="text-danger text-small d-block mb-2">
                          {errors.fechaInicio.message}
                        </span>
                      )}
                    </div>
                    <div className="col-4">
                      <label>Fecha Fin</label>
                      <br />
                      <input
                        type="month"
                        name="fechaFin"
                        {...register("fechaFin", {
                          required: {
                            value: true,
                            message: "fechaFin requerida",
                          },
                        })}
                      />
                      {errors.fechaFin && (
                        <span className="text-danger text-small d-block mb-2">
                          {errors.fechaFin.message}
                        </span>
                      )}
                    </div>
                  </div>
                )          
              }
              {
                tipoRango == 3 && (
                  <div className="row mt-1">
                    <div className="col-4">
                      <label>Fecha Inicio</label>
                      <br />
                      <input
                        type="year"
                        name="fechaInicio"
                        {...register("fechaInicio", {
                          required: {
                            value: true,
                            message: "fechaInicio requerida",
                          },
                        })}
                      />
                      {errors.fechaInicio && (
                        <span className="text-danger text-small d-block mb-2">
                          {errors.fechaInicio.message}
                        </span>
                      )}
                    </div>
                    <div className="col-4">
                      <label>Fecha Fin</label>
                      <br />
                      <input
                        type="year"
                        name="fechaFin"
                        {...register("fechaFin", {
                          required: {
                            value: true,
                            message: "fechaFin requerida",
                          },
                        })}
                      />
                      {errors.fechaFin && (
                        <span className="text-danger text-small d-block mb-2">
                          {errors.fechaFin.message}
                        </span>
                      )}
                    </div>
                  </div>
                )          
              }
              {/* <div className="col-4">
                <label>Fecha Inicio</label>
                <br />
                <input
                  type="date"
                  name="fechaInicio"
                  {...register("fechaInicio", {
                    required: {
                      value: true,
                      message: "fechaInicio requerida",
                    },
                  })}
                />
                {errors.fechaInicio && (
                  <span className="text-danger text-small d-block mb-2">
                    {errors.fechaInicio.message}
                  </span>
                )}
              </div>
              <div className="col-4">
                <label>Fecha Fin</label>
                <br />
                <input
                  type="date"
                  name="fechaFin"
                  {...register("fechaFin", {
                    required: {
                      value: true,
                      message: "fechaFin requerida",
                    },
                  })}
                />
                {errors.fechaFin && (
                  <span className="text-danger text-small d-block mb-2">
                    {errors.fechaFin.message}
                  </span>
                )}
              </div> */}
              <br />
              <div className="d-flex justify-content-end">
                <button className="btn btn-secondary">Iniciar</button>
              </div>
            </div>
      </form>
      <Bar data={data} options={opciones}/>
    </div>
  );
}

export default DiagramaBarrasPetroleo;