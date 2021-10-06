
import Dashboard from "views/Dashboard.js";
import ManageCompany from "views/Components/ManageCompany";
import CreateNewCompany from "views/Components/CreateNewCompany.js";
// import SweetAlert from "views/Components/SweetAlertPage.js";
import Notifications from "views/Components/Notifications.js";
import Icons from "views/Components/Icons.js";
import Typography from "views/Components/Typography.js";
import RegularForms from "views/Forms/RegularForms.js";
import MajorTables from "views/Forms/MajorTables.js";
import ValidationForms from "views/Forms/ValidationForms.js";
import CreateNewService from "views/Forms/CreateNewService.js";
import CreateNewMajor from "views/Forms/CreateNewMajor.js";
import CreateNewRepairMan from "views/Tables/CreateNewRepairMan.js";
import RepairmanTable from "views/Tables/RepairmanTable.js";
import MajorFields from "views/MajorFields/MajorFields.js"
import CreateNewMajorFields from "views/MajorFields/CreateNewMajorFields.js"
import GoogleMaps from "views/Maps/GoogleMaps.js";
import FullScreenMap from "views/Maps/FullScreenMap.js";
import VectorMap from "views/Maps/VectorMap.js";
import Customer from "views/Customer.js";
import Calendar from "views/Calendar.js";
import UserPage from "views/Pages/UserPage.js";
// import Sidebar from "views/Sidebar.js";
import RegisterPage from "views/Pages/RegisterPage.js";
// import LockScreenPage from "views/Pages/LockScreenPage.js";
import img1 from "../src/assets/img/company.png"
var routes = [
  

  //aaaa
  {
    path: "/dashboard",
    layout: "/admin",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
  },
  
  // {
  //   path: "/Sidebar",
  //   layout: "/admin",
  //   name: "Sidebar",
  //   icon: "nc-icon nc-chart-pie-35",
  //   component: Sidebar,
  // },
  {
    collapse: true,
    name: "Company",
    state: "openComponents",
    icon: "nc-icon nc-istanbul",
    views: [
      {
        path: "/Company",
        layout: "/admin",
        name: "Manage Company",
        mini: "GS",
        component: ManageCompany,
      },
      {
        path: "/create/company",
        layout: "/admin",
        name: "Create Company",
        mini: "CC",
        component: CreateNewCompany,
      },
      // {
      //   path: "/notifications",
      //   layout: "/admin",
      //   name: "Notifications",
      //   mini: "N",
      //   component: Notifications,
      // },
      // {
      //   path: "/icons",
      //   layout: "/admin",
      //   name: "Icons",
      //   mini: "I",
      //   component: Icons,
      // },
      // {
      //   path: "/typography",
      //   layout: "/admin",
      //   name: "Typography",
      //   mini: "T",
      //   component: Typography,
      // },
    ],
  },
  {
    collapse: true,
    path: "/major",
    name: "Major",
    state: "openForms",
    icon: "nc-icon nc-notes",
    views: [
      // {
      //   path: "/regular-forms",
      //   layout: "/admin",
      //   name: "Regular Forms",
      //   mini: "RF",
      //   component: RegularForms,
      // },
      {
        path: "/major",
        layout: "/admin",
        name: "Major Table",
        mini: "Mt",
        component: MajorTables,
      },
      // {
      //   path: "/validation-forms",
      //   layout: "/admin",
      //   name: "Validation Forms",
      //   mini: "VF",
      //   component: ValidationForms,
      // },
      // {
      //   path: "/create/major",
      //   layout: "/admin",
      //   name: "Create Major",
      //   mini: "Cm",
      //   component: CreateNewMajor,
      // },
     
    ],
  },
  {
    collapse: true,
    path: "/repairman",
    name: "RepairMan",
    state: "openTables",
    icon: "nc-icon nc-settings-tool-66",
    views: [
      {
        path: "/create/repairman",
        layout: "/admin",
        name: "Create Repairman",
        mini: "CR",
        component: CreateNewRepairMan,
      },
    
      {
        path: "/repairman",
        layout: "/admin",
        name: "Repairman Table",
        mini: "ST",
        component: RepairmanTable,
      },
    ],
  },
  {
    collapse: true,
    path: "/majorfield",
    name: "Major Field",
    state: "openTablesFields",
    icon: "nc-icon nc-layers-3",
    views: [
      {
        path: "/create/fields",
        layout: "/admin",
        name: "Major Fields",
        mini: "CMr",
        component: CreateNewMajorFields,
      },
    
      {
        path: "/fields",
        layout: "/admin",
        name: "MajorFieds Table",
        mini: "MT",
        component: MajorFields,
      },
    ],
  },
  {
    collapse: true,
    path: "/service",
    name: "Service",
    state: "openTablesService",
    icon: "nc-icon nc-single-copy-04",
    views: [
      {
        path: "/create/service",
        layout: "/admin",
        name: "Create Service",
        mini: "Cs",
        component: CreateNewService,
      },
    
      {
        path: "/fields",
        layout: "/admin",
        name: "Service Table",
        mini: "MT",
        component: MajorFields,
      },
    ],
  },
  // {
  //   collapse: true,
  //   path: "/maps",
  //   name: "Maps",
  //   state: "openMaps",
  //   icon: "nc-icon nc-pin-3",
  //   views: [
  //     {
  //       path: "/google-maps",
  //       layout: "/admin",
  //       name: "Google Maps",
  //       mini: "GM",
  //       component: GoogleMaps,
  //     },
  //     {
  //       path: "/full-screen-maps",
  //       layout: "/admin",
  //       name: "Full Screen Map",
  //       mini: "FSM",
  //       component: FullScreenMap,
  //     },
  //     {
  //       path: "/vector-maps",
  //       layout: "/admin",
  //       name: "Vector Map",
  //       mini: "VM",
  //       component: VectorMap,
  //     },
  //   ],
  // },
  {
    path: "/customer",
    layout: "/admin",
    name: "Manage Customer",
    icon: "nc-icon nc-badge",
    component: Customer,
  },
  // {
  //   path: "/calendar",
  //   layout: "/admin",
  //   name: "Calendar",
  //   icon: "nc-icon nc-single-copy-04",
  //   component: Calendar,
  // },
  {
    collapse: true,
    path: "/pages",
    name: "Pages",
    state: "openPages",
    icon: "nc-icon nc-puzzle-10",
    views: [
      {
        path: "/user-page",
        layout: "/admin",
        name: "User Page",
        mini: "UP",
        component: UserPage,
      },
      {
        path: "/register-page",
        layout: "/auth",
        name: "Register",
        mini: "RP",
        component: RegisterPage,
      },
      // {
      //   path: "/lock-screen-page",
      //   layout: "/auth",
      //   name: "Lock Screen Page",
      //   mini: "LSP",
      //   component: LockScreenPage,
      // },
    ],
  },
];
export default routes;
