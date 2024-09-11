import React from "react";
import "./Footer.css";
import proofpageLogo from "../assets/images/proofpage_logo.png";
import mainpageLogo from "../assets/images/mainpage_logo.png";
import mypageLogo from "../assets/images/mypage_logo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <img src={proofpageLogo} alt="Logo" />
          <p>인증</p>
        </div>
        <div>
          <img src={mainpageLogo} alt="Logo" />
          <p>홈</p>
        </div>
        <div>
          <img src={mypageLogo} alt="Logo" />
          <p>마이페이지</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
