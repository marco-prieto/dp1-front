import React,{useState,useEffect} from 'react'
import {Bar} from 'react-chartjs-2'
import axios from 'axios'

function DiagramaBarras() {

  const [minutos,setMinutos] = useState([])
  const [paises,setPaises] = useState([])

  const data={
    /* labels: ['Estados Unidos','Mexico','Italia','Colombia','España'], */
    labels: paises,
    datasets:[{
      label: 'Minutos',
      backgroundColor: 'rgba(0,255,0,1)',
      borderColor: 'black',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(0,255,0,0.2)',
      hoverBorderColor: '#FFFF00',
      data: minutos
    }]
  }
  const opciones={
    maintainAspectRatio: false,
    responsive: true
  }

  const peticionApi= async() =>{
    await axios.get('http://localhost:3001/paisesRedesSociales')
    .then(response=>{
      console.log(response.data)
      var respuesta= response.data
      var auxMinutos=[],auxPaises=[]
      respuesta.map(elemento=>{
        auxMinutos.push(elemento.minutos)
        auxPaises.push(elemento.pais)
      })
      setMinutos(auxMinutos)
      setPaises(auxPaises)
    })
  }
  useEffect(() =>{
    peticionApi()
  },[])

  return (
    <div className="container" style={{width: '100%', height: '550px'}}>
      <h3>Consumo de Petróleo</h3>
      <Bar data={data} options={opciones}/>
    </div>
  );
}

export default DiagramaBarras;