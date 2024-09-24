import React from "react";
import "./MyProofStatus.css";

// 나의 인증 현황 컴포넌트
const MyProofStatus = () => {
  return (
    <div className="MyProofStatus">
      <div className="proof-status-container">
        {/* 현재 달성률 */}
        <div className="achievement-section">
          <div className="achievement">
            <p>현재 달성률</p>
            <h1>80%</h1>
          </div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${80}%` }}></div>
          </div>
        </div>

        {/* 인증 성공, 실패, 남은 인증 정보 */}
        <div className="proof-summary-section">
          <div>
            <p>인증 성공</p>
            <h2>1회</h2>
          </div>
          <div>
            <p>인증 실패</p>
            <h2>0회</h2>
          </div>
          <div>
            <p>남은 인증</p>
            <h2>0회</h2>
          </div>
        </div>

        {/* 인증 목록 */}
        <div className="proof-list">
          {Array(7)
            .fill()
            .map((_, index) => (
              <div className="proof-item" key={index}>
                <div className="proof-date">
                  <p>{index + 1}</p>
                </div>
                <div className="proof-info">
                  <p>8.29</p>
                  <p className="success">성공</p>
                  <img
                    src={require("../assets/images/c1.jpg")}
                    alt="인증 이미지"
                    className="proof-image"
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="MyProofImage">
        <h2>나의 인증샷</h2>
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

export default MyProofStatus;
