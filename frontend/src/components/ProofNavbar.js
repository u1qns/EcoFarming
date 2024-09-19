import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-title">
          <p>인증</p>
        </div>
        <ul className="navbar-menu">
          <li>
            <a href="/">♡</a>
          </li>
          <li>
            <a href="/">+</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
