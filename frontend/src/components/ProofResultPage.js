import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ProofResultPage.css";

const ProofResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 이전 페이지에서 전달된 상태로부터 업로드 결과를 가져옴
  const { description , progress } = location.state?.response || {}; // 상태에서 proofId와 progress 가져오기

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
        <h3>이번 인증으로 { progress }% 달성!</h3>
        {/* <p className="challenge-name">안쓰는 콘센트 뽑기</p> */}

        {/* 현재 달성률 */}
        <div className="achievement-section">
          <div className="progress-bar">
            <div className="progress" style={{ width: `${ progress }%` }}></div>
          </div>
          <div className="achievement">
            <h1>{ progress }%</h1>
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
