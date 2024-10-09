import React from "react";
import "./Navbar.css";
import logo from "../assets/images/favicon.png";
import { ChevronRight, Bell, Settings } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-title">
          <img src={logo} alt="Logo" />
          <p>ECO FARMING</p>
        </div>
        <ul className="navbar-menu">
          <li>
            <Bell size={24} />
          </li>
          <li>
            <Settings size={24} />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
