import React from "react";
import "./Navbar.css";
import { ChevronRight, Bell, Settings, ArrowLeft  } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentNavbar = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동

  };
  return (
    <nav className="navbar">
      <div className="navbar-content">
      <div >
          <ArrowLeft size={24} onClick={handleBackClick} className="back-arrow" />
        </div>
        <div className="navbar-title" style={{marginRight:150}}>
          <p>결제하기</p>
        </div>
       
      </div>
    </nav>
  );
};

export default PaymentNavbar;
