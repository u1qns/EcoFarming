import React from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
import proofpageLogo from "../assets/images/proofpage_logo.png";
import mainpageLogo from "../assets/images/mainpage_logo.png";
import mypageLogo from "../assets/images/mypage_logo.png";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="footer-content">
        <div
          onClick={() => navigate("/challenge-user")}
          style={{ cursor: "pointer" }}
        >
          <img src={proofpageLogo} alt="Logo" />
          <p>인증</p>
        </div>
        <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <img src={mainpageLogo} alt="Logo" />
          <p>홈</p>
        </div>
        <div onClick={() => navigate("/users")} style={{ cursor: "pointer" }}>
          <img src={mypageLogo} alt="Logo" />
          <p>마이페이지</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
