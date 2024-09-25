import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import "./ComplaintPage.css";

const PopupModal = ({ onClose }) => (
  <div className="popup-overlay">
    <div className="popup-content">
      <h2>신고가 접수되었습니다</h2>
      <p>
        신고 결과는 '마이페이지 > 인증샷
        <br />
        신고 결과'에서 확인 하실 수 있습니다.
      </p>
      <button className="popup-button" onClick={onClose}>
        확인
      </button>
    </div>
  </div>
);

const ComplaintPage = () => {
  const [selectedReason, setSelectedReason] = useState("");
  const [detailedReason, setDetailedReason] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleReasonSelect = (reason) => {
    setSelectedReason(reason);
  };

  const handleDetailedReasonChange = (e) => {
    setDetailedReason(e.target.value);
  };

  const isSubmitDisabled = detailedReason.length < 10;

  const handleSubmit = () => {
    if (!isSubmitDisabled) {
      setShowPopup(true);
    }
  };

  return (
    <div className="complaint-page">
      <div className="header">
        <ArrowLeft size={24} className="back-arrow" />
        <h1 className="title">신고하기</h1>
      </div>

      <div className="content">
        <div className="reason-buttons">
          <button
            className={`reason-button ${
              selectedReason === "인증샷 무효" ? "selected" : ""
            }`}
            onClick={() => handleReasonSelect("인증샷 무효")}
          >
            인증샷 무효 신고
          </button>
          <button
            className={`reason-button ${
              selectedReason === "악성 유저" ? "selected" : ""
            }`}
            onClick={() => handleReasonSelect("악성 유저")}
          >
            악성 유저로 신고
          </button>
        </div>

        <div className="reason-textarea">
          <textarea
            placeholder="정확한 처리를 위해 신고하시는 구체적인 사유를 적어주세요. (최소 10자 이상)"
            value={detailedReason}
            onChange={handleDetailedReasonChange}
          ></textarea>
        </div>
      </div>

      <div className="footer">
        <button
          className={`submit-button ${isSubmitDisabled ? "disabled" : ""}`}
          disabled={isSubmitDisabled}
          onClick={handleSubmit}
        >
          신고하기
        </button>
      </div>
      {showPopup && <PopupModal onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default ComplaintPage;
