import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import "./ComplaintPage.css";
import { submitComplaint } from "../services/complaintService";
import { useNavigate } from "react-router-dom";

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
  const [error, setError] = useState("");

  // TEST DATA
  const proofId = 1;
  const userId = 2;
  const aiPass = true; // TODO: AI

  const handleReasonSelect = (reason) => {
    setSelectedReason(reason);
  };

  const handleDetailedReasonChange = (e) => {
    setDetailedReason(e.target.value);
  };

  const isSubmitDisabled = detailedReason.length < 10;

  const handleSubmit = async () => {
    if (!isSubmitDisabled) {
      try {
        const data = await submitComplaint({
          proofId,
          userId,
          aiPass,
          description: detailedReason,
        });
        console.log("응답 데이터:", JSON.stringify(data, null, 2)); // 2는 들여쓰기 레벨
        setShowPopup(true);
      } catch (error) {
        setError("신고 제출 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div className="complaint-page">
      <div className="header">
        <ArrowLeft size={24} className="back-arrow" onClick={handleBackClick} />
        <h1 className="title">신고하기</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

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
