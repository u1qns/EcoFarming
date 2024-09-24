import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Share2, Heart } from "lucide-react";
import { FaHeart, FaUser } from "react-icons/fa";
import "./OngoingChallengePage.css";
import MyProofStatus from "./MyProofStatus";
import ParticipantProofStatus from "./ParticipantProofStatus";
import OngoingChallengeFooter from "./OngoingChallengeFooter";

const OngoingChallengePage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  const [activeTab, setActiveTab] = useState("myStatus");

  return (
    <div className="OngoingChallengePage">
      <div className="content">
        <div className="image-container">
          <img
            src={require("../assets/images/c1.jpg")}
            alt="Challenge"
            className="challenge-image"
          />
          <div className="header">
            <div className="icon-background" onClick={handleBackClick}>
              <ChevronLeft className="back-button" />
            </div>
            <div className="action-buttons">
              <div className="icon-background">
                <Share2 className="share-button" />
              </div>
              <div className="icon-background">
                <Heart className="heart-button" />
              </div>
            </div>
          </div>
        </div>
        <div className="challenge-content">
          <button>상세페이지로 이동 </button>
          <h1 className="challenge-title">안 쓰는 가전제품 콘센트 뽑기</h1>
          <div className="challenge-stats">
            <span className="rating">⭐ 4.8</span>
            <span className="participants">
              • <FaUser /> 현재 26명
            </span>
          </div>
          <div className="challenge-duration">
            <span className="duration-item">주 2일</span>
            <span className="duration-item">2주 동안</span>
          </div>
        </div>

        <hr />
        <div style={{ padding: 15 }} className="proofStatus">
          <div className="proofStatus-tabs">
            <div
              className={`tab ${activeTab === "myStatus" ? "active" : ""}`}
              onClick={() => setActiveTab("myStatus")}
            >
              나의 인증 현황
            </div>
            <div
              className={`tab ${
                activeTab === "participantStatus" ? "active" : ""
              }`}
              onClick={() => setActiveTab("participantStatus")}
            >
              참가자 인증 현황
            </div>
          </div>

          <div className="proofStatus-content">
            {activeTab === "myStatus" && <MyProofStatus />}
            {activeTab === "participantStatus" && <ParticipantProofStatus />}
          </div>
        </div>

        <hr />
        <div style={{ padding: 15 }}>
          <h2>챌린지 진행 시 꼭 알아주세요!</h2>
          <p className="description">
            ✔&nbsp; 00시 00분 ~ 23시 59분 사이에 인증 하셔야
            <br /> &nbsp; &nbsp; 합니다.
          </p>
          <p className="description">✔&nbsp; 사진첩을 사용하실 수 없습니다.</p>
          <p className="description">
            ✔&nbsp; 인증샷이 참가자에게만 공개됩니다.
          </p>
        </div>
      </div>
      <OngoingChallengeFooter />
    </div>
  );
};

export default OngoingChallengePage;
