import React from 'react';
import './Navbar.css'; 
import logo from '../assets/images/logo_bear.jpg';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-title">
          <img src={logo} alt="Logo" />
          <p>ECO FARMING</p>
        </div>
        <ul className="navbar-menu">
          <li><a href="/">♡</a></li>
          <li><a href="/">+</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
