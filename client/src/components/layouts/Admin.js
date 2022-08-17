import React, { Component } from "react";
import { useLocation, Route, Routes } from "react-router-dom";

import AdminNavbar from "../dashboard/AdminNavbar";
// import Footer from "components/Footer/Footer";
import Sidebar from "../dashboard/Sidebar";
import FixedPlugin from "../dashboard/FixedPlugin";

import routes from "../../routes";

import sidebarImage from "../../assets/img/sidebar-3.jpg";
import Dashboard from "../../views/Dashboard";

function Admin() {
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  const mainPanel = React.useRef(null);

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);
  return (
    <>
      <div className="wrapper">
        <Sidebar color={color} image={hasImage ? image : ""} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Routes>
              {routes.map((prop, index) => {
                return (
                  <Route key={index} path={prop.path} element={<prop.component />}/>
                )
              })}
              
            </Routes>
          </div>
          {/* <Footer /> */}
        </div>
      </div>
      <FixedPlugin
        hasImage={hasImage}
        setHasImage={() => setHasImage(!hasImage)}
        color={color}
        setColor={(color) => setColor(color)}
        image={image}
        setImage={(image) => setImage(image)}
      />
    </>
  );
}

export default Admin;
