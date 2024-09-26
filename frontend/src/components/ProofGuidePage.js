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
        <div className="proof">
          <p className="description" style={{ lineHeight: "1.5" }}>
            안 쓰는 가전제품의&nbsp;
            <span style={{ fontWeight: "bold" }}>콘센트를 뽑은 후</span>의
            사진을 찍어 인증해주세요!
          </p>
          <div className="proof-container">
            <div className="image-wrapper">
              <img
                src={require("../assets/images/c1.jpg")}
                alt="Left image"
                className="proof-image"
              />
              <div className="green-bar">O</div>
            </div>
            <div className="image-wrapper">
              <img
                src={require("../assets/images/c1.jpg")}
                alt="Right image"
                className="proof-image"
              />
              <div className="red-bar">X</div>
            </div>
          </div>
        </div>
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
