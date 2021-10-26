import React from "react";
import Sketch from "react-p5";
//LUEGO y -> 50-y
import mockPedidos from "./mock/mockPedidos.js";
import mockBloqueos from "./mock/mockBloqueos.js";
import mockAverias from "./mock/mockAverias.js";
import plantaPrincipalImg from "../assets/map/plantaPrincipal.png";
import plantaSecundariaImg from "../assets/map/plantaSecundaria.png";
import camionCisternaImg from "../assets/map/camionCisterna.png";
import clientWarehouseImg from "../assets/map/clientWarehouse.png";
import roadblockImg from "../assets/map/roadblock.png";
import averiaImg from "../assets/map/averia.png";

const Map = (blockSize_p) => {
  const blockSize = blockSize_p.blockSize_p;
  var imgPlantaPrincipal;
  var imgPlantaSecundaria;
  var imgCamionCisterna;
  var imgClientWarehouse;
  var imgRoadblock;
  var imgAveria;
  const truckScalingFactor = 26;
  //Usar la misma imagen para el camion

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

    //Funcion periodica
    var delay = 1000; //ms
    setInterval(()=>{console.log('si')}, delay)
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
        console.log(path[i]["pedido"]);
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

  const renderTruck = (p5, route) => {
    var dateNow = Date.now();
    var startDate = new Date(route.startDate);
    //var velocity = 13.888;
    var velocity = 3000;

    if (startDate > dateNow) return;

    var transTime = (dateNow - startDate) / 1000; //in seconds
    var distance = transTime * velocity;
    var curNode = Math.trunc(distance / 1000);

    if (curNode > route.path.length) return;

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
    if (curNode < route.path.length - 1) {
      if (route.path[curNode]["x"] < route.path[curNode + 1]["x"]) {
        // ->
        rightDirection = 1;
        sx = 0;
        sy = 1018;
        sw = 710;
        sh = 402;
      }
      if (route.path[curNode]["x"] > route.path[curNode + 1]["x"]) {
        // <-
        leftDirection = -1;
        sx = 0;
        sy = 0;
        sw = 710;
        sh = 402;
      }
      if (route.path[curNode]["y"] < route.path[curNode + 1]["y"]) {
        // v 710,0,402,710
        downDirection = 1;
        sx = 710;
        sy = 0;
        sw = 402;
        sh = 710;
      }
      if (route.path[curNode]["y"] > route.path[curNode + 1]["y"]) {
        // ^ 710,710,402,710
        upDirection = -1;
        sx = 710;
        sy = 710;
        sw = 402;
        sh = 710;
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
    renderRoute(p5, curNode, route.path, xFactor, yFactor);

    xFactor = xFactor - sw / (2 * truckScalingFactor);
    yFactor = yFactor - sh / (2 * truckScalingFactor);

    if (imgCamionCisterna && sw != 0 && sh != 0) {
      p5.image(
        imgCamionCisterna,
        route.path[curNode]["x"] * blockSize + xFactor,
        route.path[curNode]["y"] * blockSize + yFactor,
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

  const renderAveria = (p5, av) => {
    const startDate = new Date(av.startDate);
    const endDate = startDate + 1 * 60 * 60 * 1000; //Averias duran 1 hora
    const dateNow = Date.now();
    const node = av.node;

    if (startDate < dateNow || endDate > dateNow) return;

    //Camion mirando a la derecha
    const sx = 0;
    const sy = 1018;
    const sw = 710;
    const sh = 402;

    p5.stroke(p5.color("red"));
    p5.strokeWeight(1);

    if (imgCamionCisterna && sw != 0 && sh != 0) {
      p5.image(
        imgCamionCisterna,
        node["x"] * blockSize - sw / (2 * truckScalingFactor),
        node["y"] * blockSize - sh / (2 * truckScalingFactor),
        sw / truckScalingFactor,
        sh / truckScalingFactor,
        sx,
        sy,
        sw,
        sh
      );
    }

    if (imgAveria) {
      p5.image(
        imgAveria,
        node["x"] * blockSize - 11,
        node["y"] * blockSize - 11,
        22,
        22
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

    //Averias
    for (var j = 0; j < mockAverias.length; j++) {
      renderAveria(p5, mockAverias[j]);
    }

    //Renderizar Plantas
    renderPlantas(p5);

    for (var k = 0; k < mockPedidos.length; k++) {
      renderTruck(p5, mockPedidos[k]);
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default Map;
