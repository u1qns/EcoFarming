import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./ChallengeFooter.css";
import { CalendarIcon } from "lucide-react";

const OngoingChallengeFooter = ({ challenge }) => {
  // challenge에서 startDate와 endDate를 가져와 사용
  const startDate = new Date(challenge.startDate);
  const endDate = new Date(challenge.endDate);
  
  const navigate = useNavigate(); // navigate 변수 선언

  const formatDate = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
    return `${month}. ${day} (${dayOfWeek})`;
  };

  const handleGuideClick = () => {
    const challengeId = challenge.id; // challengeId 정의
    navigate(`/proof/${challengeId}/guide`); // challengeId를 포함한 경로로 이동
  };

  return (
    <footer className="ChallengeFooter">
      <div className="footer-content">
        <div className="date-info">
          <span>
            {formatDate(startDate)} - {formatDate(endDate)}
            <CalendarIcon size={18} />
          </span>
          <span className="duration">
            주 {challenge.frequency}일, {challenge.duration}일 동안
          </span>
        </div>
        <button className="start-button" onClick={handleGuideClick}>인증하기</button>
      </div>
    </footer>
  );
};

export default OngoingChallengeFooter;
