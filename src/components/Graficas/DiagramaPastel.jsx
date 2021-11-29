import React,{useState,useEffect} from 'react'
import {Pie} from 'react-chartjs-2'
import axios from 'axios'
import url from "../../config";

const Circulo = () => {


    const [continentes,setContinentes] = useState([])
    const [porcentajes,setPorcentajes] = useState([])
    const [pedidos,setPedidos] = useState([])
    const [estados,setEstados] = useState([])  

    

    const data={
        labels: ['Entregado','En ruta','Nuevo'],
        datasets:[{
            backgroundColor: ['#335c81','#5899e2','#34d1bf'],
            //  data: [120,200,50]
            data: estados
        }]
    }

    const opciones={
        responsive: true,
        maintainAspectRatio: false,
        
    }

    

    const peticionApi= async() =>{
        await axios.get(`${url}/pedido/listarPedidos`)
        .then(response=>{
          console.log(response.data)
          var respuesta = response.data
          var auxPendientes = 0,auxEntregados=0,auxNuevos = 0,array = []
          var ahora = fechasxD()
          var hoy = ahora.split("@")
          var fechaElemento,fechaEntrega
          /* console.log(hoy[0]) */
          respuesta.map(elemento=>{
            fechaElemento = elemento.fechaPedido.split("@")[0]
            /* console.log(fechaElemento) */
            if(elemento.fechaEntrega != null){

                fechaEntrega = elemento.fechaEntrega.split("@")[0]
                /* console.log("Aca hay fechas de entrega")
                console.log(fechaEntrega) */
                if("Atendido" === elemento.estadoPedido && hoy[0] === fechaEntrega){
                    auxEntregados++
                }   
            }
            /* if("En ruta" === elemento.estadoPedido && hoy[0] === fechaElemento)
                auxPendientes++ */
            if("En ruta" === elemento.estadoPedido)
                auxPendientes++
            if("Nuevo" === elemento.estadoPedido)
                auxNuevos++
            /* if("Nuevo" === elemento.estadoPedido && hoy[0] === fechaElemento)
                auxNuevos++ */
          })
          /* console.log(auxEntregados)
          console.log(auxPendientes)
          console.log(auxNuevos) */
          array.push(auxEntregados)
          array.push(auxPendientes)
          array.push(auxNuevos)
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
            <Pie data={data} options={opciones}/>
        </div>
    );
}
 
export default Circulo;