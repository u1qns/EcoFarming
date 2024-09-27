import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./ChallengeFooter.css";
import { CalendarIcon } from "lucide-react";

const ChallengeFooter = ({ challengeId }) => {
  const startDate = new Date("2024-09-16");
  const endDate = new Date("2024-09-29");
  const navigate = useNavigate();
  const today = new Date();

  const formatDate = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
    return `${month}. ${day} (${dayOfWeek})`;
  };
  const handleGuideClick = () => {
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
          <span className="duration">주 2일, 2주 동안</span>
        </div>
        <button className="start-button" onClick={handleGuideClick}>인증하기</button>
      </div>
    </footer>
  );
};

export default ChallengeFooter;
