import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, Share2, Heart } from "lucide-react";
import { FaUser } from "react-icons/fa";
import "./OngoingChallengePage.css";
import MyProofStatus from "./MyProofStatus";
import ParticipantProofStatus from "./ParticipantProofStatus";
import OngoingChallengeFooter from "./OngoingChallengeFooter"; // Footer 컴포넌트 임포트
import axios from "axios";

const OngoingChallengePage = () => {
  const { challengeId, userId } = useParams(); // URL에서 challengeId와 userId를 가져옴
  const apiUrl = process.env.REACT_APP_API_URL; // .env 파일의 API URL 사용
  const [challenge, setChallenge] = useState(null); // 챌린지 정보를 저장할 상태
  const navigate = useNavigate();
  const { state } = useLocation();
  const [activeTab, setActiveTab] = useState("myStatus");
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    // 챌린지 정보 가져오기
    const fetchChallenge = async () => {
      try {
        const challengeResponse = await axios.get(
          `${apiUrl}/challenges/${challengeId}`
        );
        setChallenge(challengeResponse.data);
      } catch (error) {
        if (error.response) {
          console.error("서버 오류:", error.response.status, error.response.data);
        } else if (error.request) {
          console.error("네트워크 오류:", error.request);
        } else {
          console.error("오류 발생:", error.message);
        }
      }
    };
    

    fetchChallenge();

    //스크롤시 내브바 배경색 변경 구현
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [apiUrl, challengeId, userId, handleScroll]);

  const handleBackClick = () => {
    navigate("/");
  };

  if (!challenge) {
    return <div className="OngoingChallengePage-loading-spinner"></div>; // 로딩 애니메이션 표시
  }

  return (
    <div className="OngoingChallengePage">
      <div className={`header ${isScrolled ? "scrolled" : ""}`}>
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
      <div className="content">
        <div className="image-container">
          <img
        // state에서 thumbPhotoUrl을 사용하거나, fallback으로 challenge.thumbPhotoUrl 사용 
            src={state?.thumbPhotoUrl || challenge.thumbPhotoUrl}
            alt="Challenge"
            className="challenge-image"
          />
        </div>
        <div className="challenge-content">
          {/* <button>상세페이지로 이동 </button> */}
          <h1 className="challenge-title">{challenge.title}</h1>
          <div className="challenge-stats">
            <span className="rating">⭐ 4.8</span>
            <span className="participants">
              • <FaUser /> 현재 {challenge.userCount}명
            </span>
          </div>
          <div className="challenge-duration">
            <span className="duration-item">주 {challenge.frequency}일</span>
            <span className="duration-item">{challenge.duration / 7}주 동안</span>
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
            {activeTab === "myStatus" && <MyProofStatus challenge={challenge} />}
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

      {/* OngoingChallengeFooter에 challenge와 userId 데이터를 전달 */}
      <OngoingChallengeFooter challenge={challenge} userId={userId} />
    </div>
  );
};

export default OngoingChallengePage;
