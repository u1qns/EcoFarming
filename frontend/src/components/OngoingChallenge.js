import React from "react";
import { ChevronRight } from "lucide-react";
import "./OngoingChallenge.css";

const OngoingChallenge = () => {
  return (
    <div className="ongoing-challenge-card">
      <div className="ongoing-challenge-content">
        <div className="ongoing-challenge-image">
          <img src={require("../assets/images/c1.jpg")} alt="Challenge icon" />
        </div>
        <div className="ongoing-challenge-details">
          <div className="ongoing-challenge-header">
            <h2>안 쓰는 가전제품 콘센트 뽑기</h2>
            <ChevronRight className="chevron-icon" />
          </div>
          <p className="ongoing-challenge-date">9. 19 (목) 까지 1일,</p>
          <p className="ongoing-challenge-time">
            인증시간: 00:00:00 ~ 23:59:59
          </p>
          <div className="ongoing-challenge-stats">
            <div>
              <p className="stat-value">100%</p>
              <p className="stat-label">예상 달성률</p>
            </div>
            <div>
              <p className="stat-value">0원</p>
              <p className="stat-label">예상 환급액</p>
            </div>
          </div>
          <button className="ongoing-challenge-button">인증하기</button>
        </div>
      </div>
    </div>
  );
};

export default OngoingChallenge;
