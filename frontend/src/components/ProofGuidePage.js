import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./ProofGuidePage.css";

const ProofGuidePage = () => {
  const navigate = useNavigate();

  const handleStartCamera = () => {
    navigate("/proof-camera"); // 카메라가 있는 페이지로 이동
  };

  return (
    <div className="proof-guide-page">
      <div className="header">
        <ArrowLeft size={24} className="back-arrow" />
        <h1 className="title">인증 방법</h1>
      </div>
      <div className="content">
        <p>이 챌린지에서는 쓰레기 줍깅을 인증해야 합니다.</p>
        <p>사진을 찍은 후 인증 완료 버튼을 눌러 도전을 마무리하세요.</p>
      </div>
      <div className="footer">
        <button className="guide-confirm-button" onClick={handleStartCamera}>
          확인했어요!
        </button>
      </div>
    </div>
  );
};

export default ProofGuidePage;
