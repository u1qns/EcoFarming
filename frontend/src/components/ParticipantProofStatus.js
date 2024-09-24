import React from "react";
import "./ParticipantProofStatus.css";

// 참가자 인증 현황 컴포넌트
const ParticipantProofStatus = () => {
  return (
    <div className="ParticipantProofStatus">
      <div className="achievement-section">
        <div className="achievement">
          <p>총 참가자수</p>
          <h1>34명</h1>
        </div>
        <div className="achievement">
          <p>평균 예상 달성률</p>
          <h1>80%</h1>
        </div>
      </div>
      <div className="ProofImage">
        <h2>참가자 인증샷</h2>
        <div className="image-grid">
          {Array(7)
            .fill()
            .map((_, index) => (
              <div className="image-wrapper" key={index}>
                <img
                  src={require("../assets/images/c1.jpg")}
                  alt={`인증 이미지 ${index + 1}`}
                  className="image" // CSS 클래스 추가
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ParticipantProofStatus;
