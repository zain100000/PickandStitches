import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./css/Sidebar.css";

const Sidebar = () => {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();

  const isActiveLink = (path) => location.pathname === path;

  return (
    <aside
      id="sidebar"
      className={`d-flex flex-column bg-dark text-white ${
        isActive ? "active" : ""
      }`}
    >
      <nav className="sidebar-nav">
        <ul className="nav flex-column p-3">
          <li className="nav-item">
            <Link
              to="/dashboard"
              className={`nav-link ${
                isActiveLink("/dashboard") ? "active" : ""
              }`}
            >
              <i className="fas fa-tachometer-alt"></i>
              <span className="d-none d-md-inline"> Dashboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/dashboard/gents_orders"
              className={`nav-link ${
                isActiveLink("/dashboard/gents_orders") ? "active" : ""
              }`}
            >
              <i className="fas fa-male"></i>
              <span className="d-none d-md-inline"> Gents Orders</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/dashboard/ladies_orders"
              className={`nav-link ${
                isActiveLink("/dashboard/ladies_orders") ? "active" : ""
              }`}
            >
              <i className="fas fa-female"></i>
              <span className="d-none d-md-inline"> Ladies Orders</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/dashboard/add_products"
              className={`nav-link ${
                isActiveLink("/dashboard/add_products") ? "active" : ""
              }`}
            >
              <i className="fas fa-plus-circle"></i>
              <span className="d-none d-md-inline"> Add Products</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/dashboard/get_products"
              className={`nav-link ${
                isActiveLink("/dashboard/get_products") ? "active" : ""
              }`}
            >
              <i className="fas fa-tshirt"></i>
              <span className="d-none d-md-inline"> Get Products</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/dashboard/feed_backs"
              className={`nav-link ${
                isActiveLink("/dashboard/feed_backs") ? "active" : ""
              }`}
            >
              <i className="fas fa-file-alt"></i>
              <span className="d-none d-md-inline"> Feedbacks</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
