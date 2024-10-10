import React, { useEffect, useState } from "react";
import "./Footer.css";
import { useNavigate, useLocation } from "react-router-dom";
import proofpageLogo from "../assets/images/proofpage_logo.png";
import mainpageLogo from "../assets/images/mainpage_logo.png";
import mypageLogo from "../assets/images/mypage_logo.png";
import proofpageLogoClicked from "../assets/images/proofpage_logo_clicked.png";
import mainpageLogoClicked from "../assets/images/mainpage_logo_clicked.png";
import mypageLogoClicked from "../assets/images/mypage_logo_clicked.png";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 URL 경로에 따라 활성화된 아이콘 결정
  const [activeIcon, setActiveIcon] = useState(location.pathname);

  useEffect(() => {
    // URL 경로를 기준으로 activeIcon 상태를 설정
    if (location.pathname.startsWith("/proof")) {
      setActiveIcon("proof");
    } else if (location.pathname.startsWith("/users")) {
      setActiveIcon("mypage");
    } else {
      setActiveIcon("home");
    }
  }, [location.pathname]); // location.pathname이 변경될 때마다 실행

  // 아이콘 클릭 핸들러
  const handleIconClick = (page) => {
    switch (page) {
      case "proof":
        navigate("/proof");
        break;
      case "home":
        navigate("/");
        break;
      case "mypage":
        navigate("/users");
        break;
      default:
        break;
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div
          onClick={() => handleIconClick("proof")}
          style={{ cursor: "pointer" }}
        >
          <img
            src={activeIcon === "proof" ? proofpageLogoClicked : proofpageLogo}
            alt="Proof Logo"
          />
          <p>인증</p>
        </div>
        <div
          onClick={() => handleIconClick("home")}
          style={{ cursor: "pointer" }}
        >
          <img
            src={activeIcon === "home" ? mainpageLogoClicked : mainpageLogo}
            alt="Main Logo"
          />
          <p>홈</p>
        </div>
        <div
          onClick={() => handleIconClick("mypage")}
          style={{ cursor: "pointer" }}
        >
          <img
            src={activeIcon === "mypage" ? mypageLogoClicked : mypageLogo}
            alt="My Page Logo"
          />
          <p>마이페이지</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
