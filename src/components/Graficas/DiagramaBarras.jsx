import React,{useState,useEffect} from 'react'
import {Bar} from 'react-chartjs-2'
import axios from 'axios'
import url from "../../config";
import { useForm } from "react-hook-form";

function DiagramaBarras() {

  /* const [minutos,setMinutos] = useState([])
  const [paises,setPaises] = useState([]) */
  const [cantidadGLP,setCantidadGLP] = useState([])
  const [idCamiones,setIdCamiones] = useState([])
  const [tipoRango,setTipoRango] = useState(1)
  const [anio,setAnio] = useState('2021')
  /* const [fechas,setFechas] = useState([])
  const [consumos,setConsumos] = useState([]) */

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const data={
    
    //labels: fechas,
    /* labels: ['20-11-2021','21-11-2021','22-11-2021','23-11-2021'], */
    /* labels: ['2018','2019','2020','2021'], */
    //labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
    labels: idCamiones,
    datasets:[{
      label: 'Entrega de GLP por camión en m3',
      backgroundColor: '#335c81',
      borderColor: 'black',
      borderWidth: 1,
      hoverBackgroundColor: '#5899e2',
      hoverBorderColor: '#5899e2',
      /* data: consumos */
      //data: [700,300,200,450,150,200,135,80,215,90,0,75,500,100,200,450,150,200,135,80]
      data: cantidadGLP
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
    if(tipoRango == 1){

      var dato = {
        "fecha": data.fechaPedido + ' 00:00:00',
        "tipo":1
      }
    }
    if(tipoRango == 2){

      var dato = {
        "fechaInicio": data.fechaPedido + '-01 00:00:00',
        "fechaFin": data.fechaPedido + '-31 11:59:59',
        "tipo":1,
      }
    }
    if(tipoRango == 3){

      var dato = {
        "fechaInicio": anio + '-01-01 00:00:00',
        "fechaFin": anio + '-12-31 11:59:59',
        "tipo":1
      }
    }
    console.log(dato)
    if(tipoRango == 1){

      axios.post(`${url}/reportes/GLPEntregadoXCamion`,dato).
      then(response=>{
        console.log(response.data)
        var respuesta = response.data
        var auxIds=[],auxCantidad=[]
        respuesta.map(elemento=>{
          auxIds.push(elemento.placa)
          auxCantidad.push(elemento.cantidadGLP)
        })
        setIdCamiones(auxIds)
        setCantidadGLP(auxCantidad)
      })
      .catch((err) =>{
        alert("Ocurrió un error en el registro del pedido");
      })
    }
    if(tipoRango == 2){

      axios.post(`${url}/reportes/GLPEntregadoXCamionXMeses`,dato).
      then(response=>{
        console.log(response.data)
        var respuesta = response.data
        var auxIds=[],auxCantidad=[]
        respuesta.map(elemento=>{
          auxIds.push(elemento.placa)
          auxCantidad.push(elemento.cantidadGLP)
        })
        setIdCamiones(auxIds)
        setCantidadGLP(auxCantidad)
      })
      .catch((err) =>{
        alert("Ocurrió un error en el registro del pedido");
      })
    }
    if(tipoRango == 3){

      axios.post(`${url}/reportes/GLPEntregadoXCamionXAnios`,dato).
      then(response=>{
        console.log(response.data)
        var respuesta = response.data
        var auxIds=[],auxCantidad=[]
        respuesta.map(elemento=>{
          auxIds.push(elemento.placa)
          auxCantidad.push(elemento.cantidadGLP)
        })
        setIdCamiones(auxIds)
        setCantidadGLP(auxCantidad)
      })
      .catch((err) =>{
        alert("Ocurrió un error en el registro del pedido");
      })
    }


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
      <h3>Entrega de GLP diario en m3 de cada camión</h3>
      <form  onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
              <div className="col-4">
                  <label className="me-2">Vista</label>
                  <select
                    value={tipoRango}
                    className="form-select mt-0"
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
                  <div className="col-5">
                    <label>Fecha</label>
                    <br />
                    <input
                      type="date"
                      name="fechaPedido"
                      className= "mt-1"
                      {...register("fechaPedido", {
                        required: {
                          value: true,
                          message: "fechaPedido requerida",
                        },
                      })}
                    />
                    {errors.fechaPedido && (
                      <span className="text-danger text-small d-block mb-2">
                        {errors.fechaPedido.message}
                      </span>
                    )}
                  </div>
                )                
              }
              {
                tipoRango == 2 && (
                  <div className="col-5">
                    <label>Mes</label>
                    <br />
                    <input
                      type="month"
                      name="fechaPedido"
                      className= "mt-1"
                      {...register("fechaPedido", {
                        required: {
                          value: true,
                          message: "fechaPedido requerida",
                        },
                      })}
                    />
                    {errors.fechaPedido && (
                      <span className="text-danger text-small d-block mb-2">
                        {errors.fechaPedido.message}
                      </span>
                    )}
                  </div>
                )                
              }
              {
                tipoRango == 3 && (
                  
                  <div className="col-5">
                    <label className="me-2">Año</label>
                    <select
                      value={anio}
                      className="form-select mt-0"
                      style={{ width: "auto", height: "40px" }}
                      onChange={(e) => {
                        setAnio(e.target.value);
                      }}
                    >
                      <option value={'2022'}>2022</option>
                      <option value={'2021'} defaultValue>
                        2021
                      </option>
                      <option value={'2020'}>2020</option>
                      <option value={'2019'}>2019</option>                                       
                      <option value={'2018'}>2018</option>                                       
                      <option value={'2017'}>2017</option>                                       
                                                             
                    </select>
                  </div>
                )                
              }
              
              {/* <div className="col-5">
                    <label>Año</label>
                    <br />
                    <input
                      type="year"
                      name="fechaPedido"
                      className= "mt-1"
                      {...register("fechaPedido", {
                        required: {
                          value: true,
                          message: "fechaPedido requerida",
                        },
                      })}
                    />
                    {errors.fechaPedido && (
                      <span className="text-danger text-small d-block mb-2">
                        {errors.fechaPedido.message}
                      </span>
                    )}
                  </div> */}

              {/* {
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
              } */}              
              <div className="d-flex justify-content-end">
                <button className="btn btn-secondary">Iniciar</button>
              </div>
            </div>
      </form>
      <Bar data={data} options={opciones}/>
    </div>
  );
}

export default DiagramaBarras;