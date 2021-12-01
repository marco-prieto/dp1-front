/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import MapLayout from "layouts/MapLayout.jsx";
import ColapsoLayout from "layouts/ColapsoLayout.jsx";
import SimulacionMapLayout from "layouts/SimulacionMapLayout.jsx";
import AccordionHojaRutas from "components/CustomAccordion/AccordionHojaRutas";
import Login from "views/Login/Login";
/* import DiagramaBarras from "components/Graficas/DiagramaBarras";
import DiagramaPastel from "components/Graficas/DiagramaPastel"
import Reportes from "views/Dashboard/Reportes" */

import "assets/css/material-dashboard-react.css?v=1.10.0";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/mapa" component={MapLayout} />
      <Route
        path="/infoColapso"
        component={(props) =>
          ColapsoLayout({
            ...props.location.state,
          })
        }
      />

      <Route path="/dev" component={AccordionHojaRutas} />
      <Route path="/simulacionMap" component={SimulacionMapLayout} />
      <Route path="/login" component={Login} />
      {/* <Route path="/barras" component={DiagramaBarras}/>
      <Route path="/pastel" component={DiagramaPastel}/>
      <Route path="/reportaje" component={Reportes}/> */}
      <Redirect from="/" to="/admin/pedidos" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
