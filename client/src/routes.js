import Dashboard from "../src/views/Dashboard.js";
import UserProfile from "../src/views/UserProfile.js";
import ListCheckout from "./views/ListCheckout.js";
import Typography from "../src/views/Typography.js";
import Notifications from "../src/views/Notifications.js";
import ProductAdmin from "./components/dashboard/ProductAdmin.js";
import Add from "./components/dashboard/Add.js";
import Edit from "./components/dashboard/Edit.js";

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
    name: "Danh sách sản phẩm",
    icon: "nc-icon nc-circle-09",
    component: ProductAdmin,
    layout: "/admin"
  },
  {
    path: "/products/add",
    name: "Thêm sản phẩm",
    icon: "nc-icon nc-circle-09",
    component: Add,
    layout: "/admin"
  },
  {
    path: "/product/edit/:id",
    name: "Sửa sản phẩm",
    icon: "nc-icon nc-circle-09",
    component: Edit,
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
    path: "/listcheckout",
    name: "Đơn đặt hàng",
    icon: "nc-icon nc-notes",
    component: ListCheckout,
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
