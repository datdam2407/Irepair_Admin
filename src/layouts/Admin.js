import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory  } from "react-router-dom";
// react-bootstrap components

// core components
import Sidebar from "components/Sidebar/Sidebar.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";

// dinamically create dashboard routes
import routes from "routes.js";

import image1 from "assets/img/full-screen-image-6.jpg";
import image2 from "assets/img/full-screen-image-2.jpg";
import image3 from "assets/img/full-screen-image-3.jpg";
import image4 from "assets/img/full-screen-image-4.jpg";
import firebase from "firebase";
import "firebase/storage";
import 'firebase/firestore';
import 'firebase/auth';
function Admin() {

    // let history = useHistory();

// useEffect(() => {
//     if (localStorage.getItem("token") === null) {
//       history.push("/");
//     }
// }, []);
const [isSignin, setIsSignin]= useState(true);
firebase.auth().onAuthStateChanged((user)=>{
  if (user){
  return setIsSignin(true);}
  setIsSignin(false);
})
if(isSignin === true){
  const [sidebarImage, setSidebarImage] = React.useState(image1);
  const [sidebarBackground, setSidebarBackground] = React.useState("black");
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            key={key}
            component={prop.component}
          />
        );
      } else {
        return null;
      }
    });
  };
  return (
    <>
      <div className="wrapper">
        <Sidebar
          routes={routes}
          image={sidebarImage}
          background={sidebarBackground}
        />
        <div className="main-panel">
          <AdminNavbar />
          <div className="content">
            <Switch>{getRoutes(routes)}</Switch>
          </div>
          <AdminFooter />
          <div
            className="close-layer"
            onClick={() =>
              document.documentElement.classList.toggle("nav-open")
            }
          />
        </div>
      </div>
       
    </>
  );
}else{
  window.location="/"
}

}

export default Admin;
