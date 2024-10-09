import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./ChallengeFooter.css";
import { CalendarIcon } from "lucide-react";

const OngoingChallengeFooter = ({ challenge }) => {
  // challenge에서 startDate와 endDate를 가져와 사용
  const startDate = new Date(challenge.startDate);
  const endDate = new Date(challenge.endDate);
  
  const navigate = useNavigate(); // navigate 변수 선언
  const today = new Date(); // 현재 날짜

  const formatDate = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
    return `${month}. ${day} (${dayOfWeek})`;
  };

  // 날짜 차이에 따라 버튼 상태를 결정하는 함수
  const getDayDifference = () => {
    if (today < startDate) {
      const diffTime = startDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `${diffDays}일 후 시작`; // 챌린지 시작 전
    }
    if (today > endDate) {
      return "종료된 챌린지"; // 챌린지 종료됨
    }
    return "인증하기"; // 챌린지 진행 중
  };

  // 버튼이 활성화되는지 여부를 결정
  const isButtonActive = today >= startDate && today <= endDate;

  const handleGuideClick = () => {
    const challengeId = challenge.id; // challengeId 정의
    navigate(`/proof/${challengeId}/guide`); 
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
        {/* 버튼 상태 및 텍스트를 getDayDifference 함수로 동적으로 변경 */}
        <button
          className="start-button" 
          onClick={handleGuideClick} 
          disabled={!isButtonActive} // 비활성화 조건 적용
        >
          {getDayDifference()}
        </button>
      </div>
    </footer>
  );
};

export default OngoingChallengeFooter;
