// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import PhotoLibrary from "@material-ui/icons/PhotoLibrary";
import AccountBalance from "@material-ui/icons/AccountBalance";
import Notifications from "@material-ui/icons/Notifications";
import LocalLibrary from "@material-ui/icons/LocalLibrary";
import QuestionAnswer from "@material-ui/icons/QuestionAnswer";
// core components/views for Admin layout
import ContainerPage from "views/ContainerPage"

import DashboardPage from "views/Dashboard/Dashboard";

//Banner views
import { BannerTablePage, BannerEditPage} from "views/Banner"
import { LawFirmTablePage, LawFirmEditPage } from "views/LawFirm"
import { ServiceCenterTablePage, ServiceCenterEditPage } from "views/ServiceCenter"

//Law firm views

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "控制面板",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/banner",
    name: "轮播顶图",
    icon: PhotoLibrary,
    component: ContainerPage,
    layout: "/admin",
    subRoutes: [
      {
        component: BannerEditPage,
        path:"/:id/edit"
      },
      {
        component: BannerEditPage,
        path:"/new"
      },
      {
        component: BannerTablePage,
        path: "/index"
      }
    ]
  },
  {
    path: "/service-center",
    name: "法律服务站",
    icon: AccountBalance,
    component: ContainerPage,
    layout: "/admin",
    subRoutes: [
      {
        component: ServiceCenterEditPage,
        path:"/:id/edit"
      },
      {
        component: ServiceCenterEditPage,
        path:"/new"
      },
      {
        component: ServiceCenterTablePage,
        path: "/index"
      }
    ],
  },
  {
    path: "/law-firm",
    name: "律所",
    icon: LocalLibrary,
    component: ContainerPage,
    subRoutes: [
      {
        component: LawFirmEditPage,
        path:"/:id/edit"
      },
      {
        component: LawFirmEditPage,
        path:"/new"
      },
      {
        component: LawFirmTablePage,
        path: "/index"
      }
    ],
    layout: "/admin"
  },
  {
    path: "/case-study",
    name: "法律案例",
    icon: QuestionAnswer,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/message",
    name: "用户留言",
    icon: Notifications,
    component: DashboardPage,
    layout: "/admin"
  }
];

export default dashboardRoutes;
