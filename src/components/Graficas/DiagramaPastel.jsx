import React,{useState,useEffect} from 'react'
import {Pie} from 'react-chartjs-2'
import axios from 'axios'

const Circulo = () => {


    const [continentes,setContinentes] = useState([])
    const [porcentajes,setPorcentajes] = useState([])
    const [pedidos,setPedidos] = useState([])
    const [estados,setEstados] = useState([])
    

    const data={
        //labels: ['Google','Bing','Baidu','Otros'],
        labels: continentes,
        datasets:[{          
          backgroundColor: ['#FFFF00','blue','green','#black','red','purple','orange'],          
          //data: [74.56,10.54,9.42,5.42]
          data: porcentajes
        }]
    }

    const data2={
        labels: ['Entregado','Pendiente'],
        datasets:[{
            backgroundColor: ['blue','yellow'],
            //data: [3,4]
            data: estados
        }]
    }

    const opciones={
        responsive: true,
        maintainAspectRatio: false,
        
    }

    

    const peticionApi= async() =>{
        await axios.get('http://localhost:3001/pedidos')
        .then(response=>{
          console.log(response.data)
          var respuesta = response.data
          var auxPendientes = 0,auxEntregados=0, array = []
          var ahora = fechasxD()
          var hoy = ahora.split("@")
          var fechaElemento
          console.log(hoy)
          respuesta.map(elemento=>{
            fechaElemento = elemento.fecha.split("@")[0]
            if("entregado" === elemento.estado && hoy[0] === fechaElemento){
                auxEntregados++
            }   
            if("pendiente" === elemento.estado && hoy[0] === fechaElemento)
                auxPendientes++
          })
          array.push(auxEntregados)
          array.push(auxPendientes)
          setEstados(array)
          setPedidos(respuesta)
        })
    }

    const parseElement = (el) => {
        el = el.toString();
        el = el.length >= 2 ? el:"0"+el;
        return el;
    };
    
    
    const fechasxD = () => {
        var dateNow = new Date(Date.now());
        var today = dateNow.toLocaleString('es-ES').toString().split(" "); //[date, time]
        var date = today[0].split('/').reverse()
        var time = today[1].split(":");

        for(var i=0;i<date.length;i++){
            date[i] = parseElement(date[i]);
        }

        var startDate = date.join('-')+"@"+parseElement(time[0])+":"+parseElement(time[1])+":"+parseElement(time[2]); //formato para el back
    
        var data = {"idCamion":1,"fecha":startDate, "type":1}; //1 = dia a dia
        /* console.log(data)
        console.log(date.join('-')) */
        return date.join('-')
    }
    useEffect(() =>{
        peticionApi()  
        fechasxD()      
    },[])

    return (
        <div className="container" style={{width: '100%',height: '550px'}}> 
            <h3>Estado de Pedidos</h3>           
            <Pie data={data2} options={opciones}/>
        </div>
    );
}
 
export default Circulo;