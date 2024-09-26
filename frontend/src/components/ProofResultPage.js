import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./ProofResultPage.css";

const ProofResultPage = () => {
  const navigate = useNavigate();

  const handleGoProofPage = () => {
    navigate("/proof"); // 카메라가 있는 페이지로 이동
  };
  return (
    <div className="proof-result-page">
      <div className="header">
        {/* <ArrowLeft size={24} className="back-arrow" /> */}
        <h1 className="title">인증 완료</h1>
      </div>
      <div className="content">
        <h3>이번 인증으로 80% 달성!</h3>
        <p className="challenge-name">안쓰는 콘센트 뽑기</p>

        {/* 현재 달성률 */}
        <div className="achievement-section">
          <div className="progress-bar">
            <div className="progress" style={{ width: `${80}%` }}></div>
          </div>
          <div className="achievement">
            <h1>80%</h1>
          </div>
        </div>
      </div>
      <div className="footer">
        <button className="proof-finish-button" onClick={handleGoProofPage}>
          완료
        </button>
      </div>
    </div>
  );
};

export default ProofResultPage;
