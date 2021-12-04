import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/sag/sagLogo.svg";
import Cookies from 'universal-cookie'

const cookies = new Cookies()

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/admin/login" to="/login" />
    {/* <Redirect from="/admin" to="/admin/dashboard" /> */}
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, ] = React.useState(bgImage);
  const [color, ] = React.useState("blue");
  const [mobileOpen, setMobileOpen] = React.useState(false);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  const cerrarSesion = () => {
    cookies.remove('id',{path: "/"});
		cookies.remove('apellidoPaterno',{path: "/"});
		cookies.remove('apellidoMaterno',{path: "/"});
		cookies.remove('nombre',{path: "/"});
		cookies.remove('correo',{path: "/"});
		cookies.remove('nombreUsuario',{path: "/"});
		cookies.remove('telefono',{path: "/"});
		cookies.remove('clave',{path: "/"});
		cookies.remove('activo',{path: "/"});
    window.location.href='./login';
  }

  return (
    <div className={classes.wrapper}>
      
      <Sidebar
        routes={routes}
        logoText={"SAG Logistics"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />      
      <div className="d-flex justify-content-end">
                <button
                onClick={()=> cerrarSesion()} 
                className="btn btn-outline-secondary mx-1 mt-1 btn-sm"
                type="button">Cerrar Cesión</button>
        </div> 
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {/* <div className="d-flex justify-content-end">
                <button
                onClick={()=> cerrarSesion()} 
                className="btn btn-outline-secondary m-1"
                type="button">Cerrar Cesión</button>
        </div>  */} 
              
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div>   
            {/* <div className="d-flex justify-content-end">
                <button
                onClick={()=> cerrarSesion()} 
                className="btn btn-outline-secondary btn-sm m-1"
                type="button">Cerrar Cesión</button>
            </div> */}         
            <div className={classes.content}>
              {/* <div className="d-flex justify-content-end">
                  <button
                  onClick={()=> cerrarSesion()} 
                  className="btn btn-outline-secondary btn-sm m-1">Cerrar Cesión</button>
              </div> */}            
              <div className={classes.container}>{switchRoutes}</div>            
            </div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes}</div>
        )}
        {getRoute() ? <Footer /> : null}

      </div>
    </div>
  );
}
