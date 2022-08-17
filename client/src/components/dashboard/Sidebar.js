import React, { Component } from "react";
import { useLocation, NavLink } from "react-router-dom";
import routes from "../../routes";
import { Dropdown, Nav } from "react-bootstrap";

function Sidebar({ color, image }) {
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")"
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <a
            href="/"
            className="simple-text logo-mini mx-1"
          >
            <div className="logo-img" style={{ width: '50px' }}>
              <img src={require("../../assets/img/reactlogo.png")} alt="..." />
            </div>
          </a>
          <a className="simple-text" href="/">
            DoubleD
          </a>
        </div>
        <Nav>
          <li>
            <NavLink className="nav-link" to={"/admin/dashboard"}>
              <p>Dashboard</p>
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to={"/admin/products/1"}>
              <p>Products</p>
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to={"/admin/products/add"}>
              <p>Thêm sản phẩm</p>
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to={"/admin/user"}>
              <p>User Profile</p>
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to={"/admin/table"}>
              <p>Table</p>
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to={"/admin/typography"}>
              <p>Typography</p>
            </NavLink>
          </li>
          <li>
            <NavLink className="nav-link" to={"/admin/notifications"}>
              <p>Notifications</p>
            </NavLink>
          </li>
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
