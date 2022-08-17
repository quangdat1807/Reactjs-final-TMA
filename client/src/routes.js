import Dashboard from "../src/views/Dashboard.js";
import UserProfile from "../src/views/UserProfile.js";
import TableList from "../src/views/TableList.js";
import Typography from "../src/views/Typography.js";
import Icons from "../src/views/Icons.js";
import Notifications from "../src/views/Notifications.js";
import ProductAdmin from "./components/dashboard/ProductAdmin.js";
import Add from "./components/dashboard/Add.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/products/:numberpage",
    name: "List Product",
    icon: "nc-icon nc-circle-09",
    component: ProductAdmin,
    layout: "/admin"
  },
  {
    path: "/products/add",
    name: "Add Product",
    icon: "nc-icon nc-circle-09",
    component: Add,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-notes",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-paper-2",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin"
  }
];

export default dashboardRoutes;
