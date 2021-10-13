import React from "react";
// creates a beautiful scrollbar
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components

import { makeStyles } from "@material-ui/core/styles";
import Footer from "components/Footer/Footer.js";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

// core components
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";
import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";
import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/sag/sagLogo.svg";

import Map from "map/Map.jsx";

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices

  // states and functions
  const [image] = React.useState(bgImage);
  const [color] = React.useState("blue");

  const [mobileOpen, setMobileOpen] = React.useState(false);

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
        {...rest}
      />

      <div className={classes.mainPanel}>
        <div className={classes.layPadding}>
          <Link to="/admin/pedidos" style={{ textDecoration: "none" }}>
            <Button variant="text" startIcon={<ArrowBackIcon />}>
              Atrás
            </Button>
          </Link>

          <div className="ms-5">
            <h3 className="my-2 pb-2">Mapa de la Ciudad en Tiempo Real</h3>
          </div>

          <Map blockSize_p={20} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
