
import Dashboard from "views/Dashboard.js";
import ManageCompany from "views/Components/ManageCompany";
// import SweetAlert from "views/Components/SweetAlertPage.js";
import MajorTables from "views/Forms/MajorTables.js";

import Repairman from "views/Repairman.js";
import MajorFields from "views/MajorFields/MajorFields.js"
import ManageService from "views/ServiceTable/ManageService.js"

import Tips from "views/Tips.js";
import Customer from "views/Customer.js";
import UserPage from "views/Pages/UserPage.js";
// import Sidebar from "views/Sidebar.js";
import RegisterPage from "views/Pages/RegisterPage.js";
import Order from "views/Order";
var routes = [
  

  //Used 
  
  // {
  //   path: "/Sidebar",
  //   layout: "/admin",
  //   name: "Sidebar",
  //   icon: "nc-icon nc-chart-pie-35",
  //   component: Sidebar,
  // },
  // {
  //   collapse: true,
  //   name: "Company",
  //   state: "openComponents",
  //   icon: "nc-icon nc-istanbul",
  //   views: [
  //     {
  //       path: "/Company",
  //       layout: "/admin",
  //       name: "Manage Company",
  //       mini: "GS",
  //       component: ManageCompany,
  //     },
  //   ],
  // },

    // {
  //   collapse: true,
  //   path: "/major",
  //   name: "Major",
  //   state: "openForms",
  //   icon: "nc-icon nc-notes",
  //   views: [
  //     // {
  //     //   path: "/regular-forms",
  //     //   layout: "/admin",
  //     //   name: "Regular Forms",
  //     //   mini: "RF",
  //     //   component: RegularForms,
  //     // },
  //     {
  //       path: "/major",
  //       layout: "/admin",
  //       name: "Manage Major",
  //       mini: "Mt",
  //       component: MajorTables,
  //     },
  //     // {
  //     //   path: "/validation-forms",
  //     //   layout: "/admin",
  //     //   name: "Validation Forms",
  //     //   mini: "VF",
  //     //   component: ValidationForms,
  //     // },
  //   ],
  // },
  //aaaa
  {
    mini: "Management By Objective",
},
  {
    path: "/dashboard",
    layout: "/admin",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
  },
  // manage repairman
 
  {
    path: "/order",
    layout: "/admin",
    name: " Order",
    icon: "nc-icon nc-cart-simple",
    component: Order,
  },
  {
    path: "/customer",
    layout: "/admin",
    name: "Customer",
    icon: "nc-icon nc-badge",
    component: Customer,
  },
  {
    path: "/Company",
    layout: "/admin",
    name: " Company",
    icon: "nc-icon nc-istanbul",
    component: ManageCompany,
  },
  
  {
    path: "/repairman",
    layout: "/admin",
    name: "Repairman",
    // mini: "ST",
    icon: "nc-icon nc-settings-tool-66",

    component: Repairman,
  },
  
  {
      mini: "Services management",
  },
  {
    path: "/service",
    layout: "/admin",
    name: " Service Table",
    icon: "nc-icon nc-paper-2",
    component: ManageService,
  },
  {
    path: "/major",
    layout: "/admin",
    name: " Major",
    icon: "nc-icon nc-layers-3",
    component: MajorTables,
  },
  {
    path: "/fields",
    layout: "/admin",
    name: "Major Fields",
    icon: "nc-icon nc-single-copy-04",

    component: MajorFields,
  },


  // {
  //   collapse: true,
  //   path: "/service",
  //   name: "Service",
  //   state: "openTablesService",
  //   views: [
  //     // {
  //     //   path: "/create/service",
  //     //   layout: "/admin",
  //     //   name: "Create Service",
  //     //   mini: "Cs",
  //     //   component: CreateNewService,
  //     // },
    
  //     {
  //       path: "/service",
  //       layout: "/admin",
  //       name: "Service Table",
  //       mini: "MT",
  //       component: ManageService,
  //     },
  //   ],
  // },
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
      {
        path: "/tip",
        layout: "/admin",
        name: "Tips",
        icon: "nc-icon nc-album-2",
        component: Tips,
      },
  //   ],
  // },
  // {
  //   name: "Manage Company",
  //   mini: "MC: ",

  // },
  
      {
        path: "/user-page",
        layout: "/admin",
        component: UserPage,
      },
      // {
      //   name:"test modal",
      //   path: "/page-test",
      //   layout: "/admin",
      //   component: RegisterPage,
      // },
    
      // {
      //   path: "/lock-screen-page",
      //   layout: "/auth",
      //   name: "Lock Screen Page",
      //   mini: "LSP",
      //   component: LockScreenPage,
      // },
  
];
export default routes;
