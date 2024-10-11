import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyPage.css";
import MyPageNavbar from "./MyPageNavbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Headphones,
  Gift,
  Award,
  BarChart2,
  Siren,
  Footprints,
  Ticket,
  LogOut,
} from "lucide-react";

const MenuOptionArrow = ({
  icon,
  text,
  rightIcon = <ChevronRight className="icon" />,
  onClick,
}) => (
  <div className="menu-option" onClick={onClick}>
    <div className="menu-option-left">
      {React.cloneElement(icon, { className: "icon" })}
      <span className="menu-text">{text}</span>
    </div>
    {rightIcon}
  </div>
);

const MenuOption = ({
  icon,
  text,
  rightIcon = <ChevronRight className="icon" />,
  onClick,
}) => (
  <div className="menu-option" onClick={onClick}>
    <div className="menu-option-left">
      {React.cloneElement(icon, { className: "icon" })}
      <span className="menu-text">{text}</span>
    </div>
  </div>
);

function MyPage() {
  // const username = localStorage.getItem('username');
  const apiUrl = process.env.REACT_APP_API_URL;
  const [userData, setUserData] = useState({
    amount: 0,
    prizeAmount: 0,
    upcomingChallengeCount: 0,
    ongoingChallengeCount: 0,
    completedChallengeCount: 0,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users/my-page`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const navigate = useNavigate();
  const handleUpcomingClick = () => {
    navigate(`/users/upcoming`);
  };
  const handleOngoingClick = () => {
    navigate(`/users/ongoing`);
  };
  const handleCompletedClick = () => {
    navigate(`/users/completed`);
  };
  const handleComplaintResultClick = () => {
    navigate(`/users/complaint-result`);
  };

  const handleLogout = async () => {
    try {
      await axios.post("/logout");

      localStorage.removeItem("token"); // 토큰 삭제
      localStorage.removeItem("username");
      localStorage.removeItem("userId");

      // 쿠키에서 refresh token 삭제
      document.cookie =
        "refresh=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;";

      navigate("/login"); // 로그아웃 후 로그인 페이지로 이동
    } catch (error) {}
  };

  return (
    <div className="MyPage">
      <MyPageNavbar />
      <div className="content">
        <div className="profile">
          <div className="profile-image">
            <img
              src={require("../assets/images/logo_bear.jpg")}
              alt="Profile"
            />
          </div>
          <div className="profile-name">
            <span>{localStorage.getItem("username")}</span>
            <ChevronRight size={20} className="chevron" />
          </div>
        </div>

        <div className="wallet-info">
          <div className="wallet-item">
            <img src={require("../assets/images/Deposit2.png")} alt="Deposit" />
            <div className="label">보유금액</div>
            <div className="value">{userData.amount.toLocaleString()}원</div>
          </div>
          <div className="wallet-item">
            <img src={require("../assets/images/Reward2.png")} alt="Reward" />
            <div className="label">상금</div>
            <div className="value">
              {userData.prizeAmount.toLocaleString()}원
            </div>
          </div>
          <div className="wallet-item">
            <img src={require("../assets/images/Rating2.png")} alt="Rating" />
            <div className="label">등급</div>
            <div className="value">1단계</div>
          </div>
        </div>

        <div className="challenge-status">
          <div className="challenge-header">
            <img src={require("../assets/images/dart.png")} alt="Challenge" />
            <span>챌린지 현황</span>
          </div>
          <div className="challenge-info">
            <div className="challenge-item" onClick={handleUpcomingClick}>
              <div className="value">{userData.upcomingChallengeCount}</div>
              <div className="label">시작 전</div>
            </div>
            <div className="challenge-item" onClick={handleOngoingClick}>
              <div className="value">{userData.ongoingChallengeCount}</div>
              <div className="label">참가 중</div>
            </div>
            <div className="challenge-item" onClick={handleCompletedClick}>
              <div className="value">{userData.completedChallengeCount}</div>
              <div className="label">완료</div>
            </div>
          </div>
        </div>
        <hr className="mypageHr" />
        <div className="menu-container">
          <MenuOption icon={<Headphones />} text="문의하기" />
          <MenuOptionArrow
            icon={<Siren />}
            text="인증샷 신고 결과"
            onClick={handleComplaintResultClick}
            style={{ cursor: "pointer" }}
          />
          <MenuOption icon={<Award />} text="내 레벨·배지" />
          <MenuOption icon={<BarChart2 />} text="챌린지 리포트" />
          <MenuOption icon={<Gift />} text="친구 초대" />
          <MenuOption icon={<Footprints />} text="만보기" />
          <MenuOption icon={<Ticket />} text="행운뽑기" />
          <MenuOption
            icon={<LogOut />}
            text="로그아웃"
            onClick={handleLogout}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyPage;
