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
// @material-ui/icons
// import Dashboard from "@material-ui/icons/Dashboard";
// import Person from "@material-ui/icons/Person";
// import DashboardPage from "views/Dashboard/Dashboard.js";
// import UserProfile from "views/UserProfile/UserProfile.js";

//Antigua tablelist
/* import TableList from "views/TableList/TableList.js"; */
import OrderList from "views/TableList/OrderList";
import BloqueosList from "views/TableList/BloqueosList";
import CamionesList from "views/TableList/CamionesList";
import PlantasList from "views/TableList/PlantasList";
import MantenimientoPreventivoList from "views/TableList/MantenimientoPreventivoList";
import Simulacion from "views/Simulacion/Simulacion.jsx";
import Reportes from "views/Dashboard/Reportes"
import DiagramaPastel from "components/Graficas/DiagramaPastel"
import Login from "views/Login/Login"
import Dashboard from "views/Dashboard/Dashboard"


// import LibraryBooks from "@material-ui/icons/LibraryBooks";
// import BubbleChart from "@material-ui/icons/BubbleChart";
// import LocationOn from "@material-ui/icons/LocationOn";
// import Notifications from "@material-ui/icons/Notifications";
// import Unarchive from "@material-ui/icons/Unarchive";
// import Language from "@material-ui/icons/Language";
// // core components/views for Admin layout

// import Typography from "views/Typography/Typography.js";
// import Icons from "views/Icons/Icons.js";
// import Maps from "views/Maps/Maps.js";
// import NotificationsPage from "views/Notifications/Notifications.js";
// import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// // core components/views for RTL layout
// import RTLPage from "views/RTLPage/RTLPage.js";

// const dashboardRoutes = [
//   {
//     path: "/dashboard",
//     name: "Dashboard",
//     rtlName: "لوحة القيادة",
//     icon: Dashboard,
//     component: DashboardPage,
//     layout: "/admin",
//   },
//   {
//     path: "/user",
//     name: "User Profile",
//     rtlName: "ملف تعريفي للمستخدم",
//     icon: Person,
//     component: UserProfile,
//     layout: "/admin",
//   },
//   {
//     path: "/pedidos",
//     name: "Lista de Pedidos",
//     rtlName: "قائمة الجدول",
//     icon: "content_paste",
//     component: TableList,
//     layout: "/admin",
//   },
//   {
//     path: "/typography",
//     name: "Typography",
//     rtlName: "طباعة",
//     icon: LibraryBooks,
//     component: Typography,
//     layout: "/admin",
//   },
//   {
//     path: "/icons",
//     name: "Icons",
//     rtlName: "الرموز",
//     icon: BubbleChart,
//     component: Icons,
//     layout: "/admin",
//   },
//   {
//     path: "/maps",
//     name: "Maps",
//     rtlName: "خرائط",
//     icon: LocationOn,
//     component: Maps,
//     layout: "/admin",
//   },
//   {
//     path: "/notifications",
//     name: "Notifications",
//     rtlName: "إخطارات",
//     icon: Notifications,
//     component: NotificationsPage,
//     layout: "/admin",
//   },
//   {
//     path: "/rtl-page",
//     name: "RTL Support",
//     rtlName: "پشتیبانی از راست به چپ",
//     icon: Language,
//     component: RTLPage,
//     layout: "/rtl",
//   },
//   {
//     path: "/upgrade-to-pro",
//     name: "Upgrade To PRO",
//     rtlName: "التطور للاحترافية",
//     icon: Unarchive,
//     component: UpgradeToPro,
//     layout: "/admin",
//   },
// ];


const sagRoutes = [
  {
    path: "/pedidos",
    name: "Pedidos",
    icon: "content_paste",
    component: OrderList,
    layout: "/admin",
  },
  {
    path: "/simulacion",
    name: "Simulación",
    icon: "content_paste",
    component: Simulacion,
    layout: "/admin",
  },
  {
    path: "/bloqueos",
    name: "Bloqueos",
    icon: "content_paste",
    component: BloqueosList,
    layout: "/admin",
  },
  {
    path: "/camiones",
    name: "Camiones Cisterna",
    icon: "content_paste",
    component: CamionesList,
    layout: "/admin",
  },
  {
    path: "/mantenimientoPreventivo",
    name: "Mantenimientos",
    icon: "content_paste",
    component: MantenimientoPreventivoList,
    layout: "/admin",
  },
  {
    path: "/plantas",
    name: "Plantas",
    icon: "content_paste",
    component: PlantasList,
    layout: "/admin",
  },
  {
    path: "/reportes",
    name: "Reportes",
    icon: "content_paste",
    component: Reportes,
    layout: "/admin",
  }/* ,
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "content_paste",
    component: Dashboard,
    layout: "/admin",
  }, */
  /* {
    path: "/login",
    name: "Cerrar Cesión",
    icon: "content_paste",
    component: Login,
    layout: "/admin",
  }, */

];

export default sagRoutes;
