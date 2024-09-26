import React from "react";
import "./ChallengeFooter.css";
import { CalendarIcon } from "lucide-react";

const ChallengeFooter = () => {
  const startDate = new Date("2024-09-16");
  const endDate = new Date("2024-09-29");
  const today = new Date();

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
          <span className="duration">주 2일, 2주 동안</span>
        </div>
        <button className="start-button">인증하기</button>
      </div>
    </footer>
  );
};

export default ChallengeFooter;
