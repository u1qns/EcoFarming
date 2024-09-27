import React from "react";
import "./ChallengeFooter.css";
import { CalendarIcon } from "lucide-react";

const OngoingChallengeFooter = ({ challenge }) => {
  // challenge에서 startDate와 endDate를 가져와 사용
  const startDate = new Date(challenge.startDate);
  const endDate = new Date(challenge.endDate);
  

  const formatDate = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
    return `${month}. ${day} (${dayOfWeek})`;
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
        <button className="start-button">인증하기</button>
      </div>
    </footer>
  );
};

export default OngoingChallengeFooter;
