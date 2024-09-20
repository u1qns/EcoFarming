import React from "react";
import "./MyPage.css";
import MyPageNavbar from "./MyPageNavbar";
import Footer from "./Footer";
import {
  ChevronRight,
  Headphones,
  Gift,
  Award,
  BarChart2,
  Siren,
  Footprints,
  Ticket,
  MailWarningIcon,
} from "lucide-react";

const MenuOption = ({
  icon,
  text,
  rightIcon = <ChevronRight className="icon" />,
}) => (
  <div className="menu-option">
    <div className="menu-option-left">
      {React.cloneElement(icon, { className: "icon" })}
      <span className="menu-text">{text}</span>
    </div>
    {rightIcon}
  </div>
);

function MyPage() {
  return (
    <div className="MyPage">
      <MyPageNavbar />
      <div className="content">
        <div className="profile">
          <div className="profile-image">
            <img
              src={require("../assets/images/berryhachuping.png")}
              alt="Profile"
            />
          </div>
          <div className="profile-name">
            <span>아임리쥬</span>
            <ChevronRight size={20} className="chevron" />
          </div>
        </div>

        <div className="wallet-info">
          <div className="wallet-item">
            <img src={require("../assets/images/Deposit2.png")} alt="Deposit" />
            <div className="label">보유금액</div>
            <div className="value">14,000원</div>
          </div>
          <div className="wallet-item">
            <img src={require("../assets/images/Reward2.png")} alt="Reward" />
            <div className="label">상금</div>
            <div className="value">8,000원</div>
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
            <div className="challenge-item">
              <div className="value">2</div>
              <div className="label">참가중</div>
            </div>
            <div className="challenge-item">
              <div className="value">2</div>
              <div className="label">시작전</div>
            </div>
            <div className="challenge-item">
              <div className="value">1</div>
              <div className="label">완료</div>
            </div>
          </div>
        </div>
        <hr className="mypageHr" />
        <div className="menu-container">
          <MenuOption icon={<Headphones />} text="문의하기" />
          <MenuOption icon={<Siren />} text="인증샷 신고 결과" />
          <MenuOption icon={<Award />} text="내 레벨·배지" />
          <MenuOption icon={<BarChart2 />} text="챌린지 리포트" />
          <MenuOption icon={<Gift />} text="친구 초대" />
          <MenuOption icon={<Footprints />} text="만보기" />
          <MenuOption icon={<Ticket />} text="행운뽑기" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyPage;
