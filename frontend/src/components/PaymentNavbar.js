import React from "react";
import "./Navbar.css";
import { ChevronRight, Bell, Settings } from "lucide-react";

const PaymentNavbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-title">
          <p>결제하기</p>
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

export default PaymentNavbar;
