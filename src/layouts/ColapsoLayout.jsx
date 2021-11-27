import React from "react";
// creates a beautiful scrollbar
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components

import { makeStyles } from "@material-ui/core/styles";
import Footer from "components/Footer/Footer.js";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

// core components
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";
import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";
import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/sag/sagLogo.svg";

import axios from "axios";
import url from "../config";

const useStyles = makeStyles(styles);

export default function ColapsoLayout({ props }) {
  const location = useLocation();
  const { info } = location.state;

  // styles
  const classes = useStyles();

  // ref to help us initialize PerfectScrollbar on windows devices

  // states and functions
  const [image] = React.useState(bgImage);
  const [color] = React.useState("blue");

  const [mobileOpen, setMobileOpen] = React.useState(false);

  var hojaRuta = null;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
      />

      <div className={classes.mainPanel}>
        <div className={classes.layPadding}>
          <Link to="/admin/simulacion" style={{ textDecoration: "none" }}>
            <Button variant="text" startIcon={<ArrowBackIcon />}>
              Atrás
            </Button>
          </Link>

          <div className="ms-5">
            <h3 className="my-2 pb-2">Información del Colapso</h3>
          </div>
          <button
            onClick={() => {
              console.log(info);
            }}
          >
            Boton
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
