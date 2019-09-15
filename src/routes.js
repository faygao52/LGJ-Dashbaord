// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// import LocationOn from "@material-ui/icons/LocationOn";
// import Notifications from "@material-ui/icons/Notifications";
// import Unarchive from "@material-ui/icons/Unarchive";
// import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "./src/views/Dashboard/Dashboard.js.js";
import UserProfile from "./src/views/UserProfile/UserProfile.js.js";
// import TableList from "./src/views/TableList/TableList.js.js";
// import Typography from "./src/views/Typography/Typography.js.js";
// import Icons from "./src/views/Icons/Icons.js.js";
// import Maps from "./src/views/Maps/Maps.js.js";
// import NotificationsPage from "./src/views/Notifications/Notifications.js.js";
// import UpgradeToPro from "./src/views/UpgradeToPro/UpgradeToPro.js.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  }
];

export default dashboardRoutes;
