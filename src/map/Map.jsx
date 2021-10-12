import React from "react";
import Sketch from "react-p5";
//LUEGO y -> 50-y
import mockPedidos from "./mock/mockPedidos.js";
import mockBloqueos from "./mock/mockBloqueos.js";
import plantaPrincipalImg from "../assets/map/plantaPrincipal.png";
import plantaSecundariaImg from "../assets/map/plantaSecundaria.png";
import camionCisternaImg from "../assets/map/camionCisterna.png";
import clientWarehouseImg from "../assets/map/clientWarehouse.png";
import roadblockImg from "../assets/map/roadblock.png";

const Map = (blockSize_p) => {
  const blockSize = blockSize_p.blockSize_p;
  var imgPlantaPrincipal;
  var imgPlantaSecundaria;
  var imgCamionCisterna;
  var imgClientWarehouse;
  var imgRoadblock;
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

    const truckScalingFactor = 26;
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

  const draw = (p5) => {
    p5.background(255);
    renderGrid(p5);
    //Renderizar Bloqueos
    for (var i = 0; i < mockBloqueos.length; i++) {
      renderRoadBlock(p5, mockBloqueos[i]);
    }

    //Renderizar Plantas
    //if p5.image(image, x, y, w, h)
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

    for (var j = 0; j < mockPedidos.length; j++) {
      renderTruck(p5, mockPedidos[j]);
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default Map;
