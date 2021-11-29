import React,{useState,useEffect} from 'react'
import {Bar} from 'react-chartjs-2'
import axios from 'axios'
import url from "../../config";

function DiagramaBarras() {

  /* const [minutos,setMinutos] = useState([])
  const [paises,setPaises] = useState([]) */
  const [cantidadGLP,setCantidadGLP] = useState([])
  const [idCamiones,setIdCamiones] = useState([])
  /* const [fechas,setFechas] = useState([])
  const [consumos,setConsumos] = useState([]) */

  const data={
    
    //labels: fechas,
    /* labels: ['20-11-2021','21-11-2021','22-11-2021','23-11-2021'], */
    /* labels: ['2018','2019','2020','2021'], */
    /* labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], */
    labels: idCamiones,
    datasets:[{
      label: 'Entrega de GLP por camión en m3',
      backgroundColor: '#335c81',
      borderColor: 'black',
      borderWidth: 1,
      hoverBackgroundColor: '#5899e2',
      hoverBorderColor: '#5899e2',
      /* data: consumos */
      /* data: [700,300,200,450,150,200,135,80,215,90,0,75,500,100,200,450,150,200,135,80] */
      data: cantidadGLP
    }]
  }
  const opciones={
    maintainAspectRatio: false,
    responsive: true
  }

  const peticionApi= async() =>{
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
  }
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

  useEffect(() =>{
    peticionApi()
  },[])

  return (
    <div className="container" style={{width: '100%', height: '550px'}}>
      <h3>Entrega de GLP diario en m3 de cada camión</h3>
      <Bar data={data} options={opciones}/>
    </div>
  );
}

export default DiagramaBarras;