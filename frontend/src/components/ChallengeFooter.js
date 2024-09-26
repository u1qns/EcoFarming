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

  const getDayDifference = () => {
    const diffTime = startDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 0) return `${diffDays}일 후 참가`;
    if (diffDays < 0) return "오늘부터 시작";
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
        <button className="start-button">{getDayDifference()}</button>
      </div>
    </footer>
  );
};

export default ChallengeFooter;
