import React, {useState} from "react";
import Sketch from "react-p5";
//LUEGO y -> 50-y
import mockPedidos from "./mock/mockPedidos.js";
import mockBloqueos from "./mock/mockBloqueos.js";
import orderList from "./mock/mockSimulacion.js";

import plantaPrincipalImg from "../assets/map/plantaPrincipal.png";
import plantaSecundariaImg from "../assets/map/plantaSecundaria.png";
import camionCisternaImg from "../assets/map/camionCisterna.png";
import clientWarehouseImg from "../assets/map/clientWarehouse.png";
import roadblockImg from "../assets/map/roadblock.png";
import averiaImg from "../assets/map/averia.png";

const SimulationMap = (blockSize_p) => {
  const blockSize = blockSize_p.blockSize_p;
  var imgPlantaPrincipal;
  var imgPlantaSecundaria;
  var imgCamionCisterna;
  var imgClientWarehouse;
  var imgRoadblock;
  var imgAveria;
  const truckScalingFactor = 26;
  //Usar la misma imagen para el camion


  //Variables para la simulacion
  const [truckNextOrder, setTruckNextOrder] = useState([]); //Pedido que atiende cada camion
  const [truckDirection, setTruckDirection] = useState([]); //Camion atiende pedido o si esta parado atendiendo

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(blockSize * 70, blockSize * 50).parent(canvasParentRef);

    //carga de imagenes
    p5.loadImage(plantaPrincipalImg, (c) => {
      imgPlantaPrincipal = c;
    });
    p5.loadImage(plantaSecundariaImg, (c) => {
      imgPlantaSecundaria = c;
    });

    p5.loadImage(camionCisternaImg, (c) => {
      imgCamionCisterna = c;
    });

    p5.loadImage(clientWarehouseImg, (c) => {
      imgClientWarehouse = c;
    });

    p5.loadImage(roadblockImg, (c) => {
      imgRoadblock = c;
    });
    p5.loadImage(averiaImg, (c) => {
      imgAveria = c;
    });

    orderList.forEach(()=>{
        truckNextOrder.push(0); 
        truckDirection.push(0); //0: Movimiento, 1:Atendiendo un pedido
    })
  };

  const renderGrid = (p5) => {
    p5.stroke(100);
    p5.strokeWeight(6);
    p5.rect(0, 0, p5.width, p5.height);
    for (var i = 0; i < p5.width; i = i + blockSize) {
      p5.stroke(p5.color(69, 69, 69));
      p5.strokeWeight(1);
      p5.line(i, 0, i, p5.height);
      p5.line(0, i, p5.width, i);
    }
  };

  const renderRoute = (p5, curNode, path, xFactor, yFactor) => {
    p5.stroke(p5.color("green"));
    p5.strokeWeight(2);

    for (var i = curNode; i < path.length - 1; i++) {
      p5.line(
        i == curNode
          ? path[i]["x"] * blockSize + xFactor
          : path[i]["x"] * blockSize,
        i == curNode
          ? path[i]["y"] * blockSize + yFactor
          : path[i]["y"] * blockSize,
        path[i + 1]["x"] * blockSize,
        path[i + 1]["y"] * blockSize
      );

      //Almacen del cliente destino
      if (Object.keys(path[i]).length > 2) {
        if (path[i]["pedido"] >= 0) {
          if (imgClientWarehouse)
            p5.image(
              imgClientWarehouse,
              path[i]["x"] * blockSize - 10,
              path[i]["y"] * blockSize - 10,
              20,
              20
            );
        }
      }
    }
  };

  const renderTruck = (p5, orderList, index) => {
    var route = orderList.route;
    var orders = orderList.orders;
    var routeLength = route.length;
    var velocity = orderList.velocity;
    var attentionTime = orderList.attentionTime;
    var startDate = new Date(orderList.startDate);
    var endDate =  new Date(orderList.endDate);

    //Verificar rango de fechas
    if(startDate > Date.now() || endDate < Date.now()) return;
    

    //Flags para control de banderas: en movimiento o atendiendo e index de pedido a atender
    if(truckNextOrder[index] < orders.length){ //Si esta atendiendo un pedido
        var deliveryDate = new Date(orders[truckNextOrder[index]].deliveryDate);
        var leftDate = new Date(orders[truckNextOrder[index]].leftDate);

        if(truckDirection[index]==0 && Date.now()>deliveryDate){ //Estaba en movimiento y ya debe atender el pedido
            var truckDirectionAux = truckDirection;
            truckDirectionAux[index] = 1; //Atender el pedido
            setTruckDirection(truckDirectionAux);
        }
        if(truckDirection[index]==1 && Date.now()>leftDate){ //Estaba atendiendo y debe pasar a movimiento
            var truckDirectionAux = truckDirection;
            var truckNextOderAux = truckNextOrder;
            truckDirectionAux[index] = 0;
            truckNextOderAux[index] = truckNextOderAux[index] + 1;
            setTruckDirection(truckDirectionAux);
            setTruckNextOrder(truckNextOderAux);
        }
    }
    else{ //Regresando a planta principal
        var truckDirectionAux = truckDirection;
        truckDirectionAux[index] = 0;
        setTruckDirection(truckDirectionAux);
    }

    var tiempoTramo;
    var distancia;
    var velocidadTramo;


    if (truckDirection[index]==0){
      //Planta principal al primer pedido
      if(truckNextOrder[index]==0){
        tiempoTramo = (new Date(orders[truckNextOrder[index]].deliveryDate) - startDate)/1000;
        velocidadTramo = (orders[truckNextOrder[index]].indexRoute*1000) / tiempoTramo; 
      }
      //regresando a planta principal
      else if(truckNextOrder[index]==orders.length){
        tiempoTramo = (endDate - new Date(orders[truckNextOrder[index]-1].leftDate))/1000;
        distancia = (route.length - orders[truckNextOrder[index]-1].indexRoute - 1)*1000;
        velocidadTramo = distancia/tiempoTramo;
      }
      //de pedido i a pedido i+1
      else{
        tiempoTramo = (new Date(orders[truckNextOrder[index]].deliveryDate) - new Date(orders[truckNextOrder[index]-1].leftDate))/1000;
        distancia = (orders[truckNextOrder[index]].indexRoute - orders[truckNextOrder[index]-1].indexRoute-1)*1000;
        velocidadTramo = distancia/tiempoTramo;
        console.log(tiempoTramo,distancia,velocidadTramo);
      }
    }
    else{
      velocidadTramo=0;
    }

    //New
    var transTime;
    if (truckNextOrder[index]!=0){
      transTime =(Date.now() - new Date(orders[truckNextOrder[index]-1].leftDate))/1000;
    }
    else{
      transTime =(Date.now()-startDate)/1000;
    }

    var distance = transTime*velocidadTramo;

    if(truckNextOrder[index]!=0){
      distance = distance + orders[truckNextOrder[index]-1].indexRoute*1000;
    }
    
    var curNode;

    if(truckDirection[index]==0){
        curNode = Math.trunc(distance / 1000);
    }
    else if(truckDirection[index]==1){
        curNode = orders[truckNextOrder[index]].indexRoute;
    }

    if(curNode >= routeLength) return;
    var leftDirection = 0;
    var rightDirection = 0;
    var upDirection = 0;
    var downDirection = 0;

    //Dimensiones de corte
    var sx = 0;
    var sy = 0;
    var sw = 0;
    var sh = 0;

    //Evaluar la direccion segun el siguiente nodo
    if (curNode < route.length - 1) {
        if(truckDirection[index]==0){
            if (route[curNode]["x"] < route[curNode + 1]["x"]) {
            // ->
            rightDirection = 1;
            sx = 0;
            sy = 1018;
            sw = 710;
            sh = 402;
            }
            else if (route[curNode]["x"] > route[curNode + 1]["x"]) {
            // <-
            leftDirection = -1;
            sx = 0;
            sy = 0;
            sw = 710;
            sh = 402;
            }
            else if (route[curNode]["y"] < route[curNode + 1]["y"]) {
            // v 710,0,402,710
            downDirection = 1;
            sx = 710;
            sy = 0;
            sw = 402;
            sh = 710;
            }
            else if (route[curNode]["y"] > route[curNode + 1]["y"]) {
            // ^ 710,710,402,710
            upDirection = -1;
            sx = 710;
            sy = 710;
            sw = 402;
            sh = 710;
            }
        }
        else{
            sx = 0;
            sy = 1018;
            sw = 710;
            sh = 402;
        }
    }


    var xFactor =
      ((rightDirection + leftDirection) *
        (distance - curNode * 1000) *
        blockSize) /
      1000;
    var yFactor =
      ((upDirection + downDirection) *
        (distance - curNode * 1000) *
        blockSize) /
      1000;


    //Dibujar la ruta
    renderRoute(p5, curNode, route, xFactor, yFactor);


    xFactor = xFactor - sw / (2 * truckScalingFactor);
    yFactor = yFactor - sh / (2 * truckScalingFactor);
    
    if (imgCamionCisterna && sw != 0 && sh != 0) {
      
      p5.image(
        imgCamionCisterna,
        route[curNode]["x"] * blockSize + xFactor,
        route[curNode]["y"] * blockSize + yFactor,
        sw / truckScalingFactor,
        sh / truckScalingFactor,
        sx,
        sy,
        sw,
        sh
      );
    }
  };

  const renderRoadBlock = (p5, rb) => {

    var dateNow = Date.now();
    var startDate = new Date(rb.startDate);
    var endDate = new Date(rb.endDate);

    //Si aun no empieza o ya termino, retornar
    if (startDate > dateNow || endDate < dateNow) return;

    var path = rb.path;
    var rbImageSize = 25;

    p5.stroke(p5.color("red"));
    p5.strokeWeight(1);
    for (var i = 0; i < path.length - 1; i++) {
      p5.line(
        path[i]["x"] * blockSize,
        path[i]["y"] * blockSize,
        path[i + 1]["x"] * blockSize,
        path[i + 1]["y"] * blockSize
      );

      if (imgRoadblock) {
        p5.image(
          imgRoadblock,
          path[i]["x"] * blockSize - rbImageSize / 2,
          path[i]["y"] * blockSize - rbImageSize / 2,
          rbImageSize,
          rbImageSize
        );
      }
    }
    if (imgRoadblock) {
      p5.image(
        imgRoadblock,
        path[path.length - 1]["x"] * blockSize - rbImageSize / 2,
        path[path.length - 1]["y"] * blockSize - rbImageSize / 2,
        rbImageSize,
        rbImageSize
      );
    }
  };


  const renderPlantas = (p5) => {
    if (imgPlantaPrincipal) {
      p5.image(
        imgPlantaPrincipal,
        12 * blockSize - 20,
        8 * blockSize - 40,
        40,
        70
      );
    }

    if (imgPlantaSecundaria) {
      p5.image(
        imgPlantaSecundaria,
        42 * blockSize - 15,
        42 * blockSize - 12.5,
        30,
        25
      );
    }

    if (imgPlantaSecundaria) {
      p5.image(
        imgPlantaSecundaria,
        63 * blockSize - 15,
        3 * blockSize - 12.5,
        30,
        25
      );
    }
  };
  const draw = (p5) => {
    p5.background(255);
    renderGrid(p5);

    //Renderizar Bloqueos
    for (var i = 0; i < mockBloqueos.length; i++) {
      renderRoadBlock(p5, mockBloqueos[i]);
    }

    //Renderizar Plantas
    renderPlantas(p5);

    for (var k = 0; k < orderList.length; k++) {
      renderTruck(p5, orderList[k], k);
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default SimulationMap;


// var dateNow = new Date(Date.now());
//     var today = dateNow.toLocaleString('es-ES').toString().split(" "); //[date, time]
//     var date = today[0].split('/').reverse()
//     var startDate = date.join('-')+"@"+today[1]; //formato para el back