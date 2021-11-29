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
      label: 'Entrega de GLP por camión en m3',
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
    var dato = {
      "fechaInicio": data.fechaInicio + ' 00:00:00',
      "fechaFin": data.fechaFin + ' 00:00:00',
      tipo:1
    }
    console.log(dato)
    axios.post(`${url}/reportes/consumoPetroleoXFechas`,dato).
    then(response=>{
      console.log(response.data)
      var respuesta= response.data.consumoPetroleoNodoFront
      console.log(respuesta)
      var auxFechas=[],auxConsumo=[]
      respuesta.map(elemento=>{
        console.log(elemento.fecha)
        console.log(elemento.consumo)
        auxFechas.push(elemento.fecha)
        auxConsumo.push(elemento.consumo)
      })      
      setFechas(auxFechas)
      setConsumos(auxConsumo)
    })
    .catch((err) =>{
      alert("Ocurrió un error en el registro del pedido");
    })
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
              <div className="col-6">

                <button className="btn btn-primary">Iniciar</button>
              </div>
            </div>
      </form>
      <Bar data={data} options={opciones}/>
    </div>
  );
}

export default DiagramaBarrasPetroleo;