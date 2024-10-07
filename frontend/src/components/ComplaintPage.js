import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import "./ComplaintPage.css";
import { submitComplaint } from "../services/complaintService";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const PopupModal = ({ message, onClose }) => (
  <div className="complaint-popup">
  <div className="popup-overlay">
    <div className="popup-content">
      <h2>{message}</h2>
      {message === "신고가 접수되었습니다" && (
        <p>
          신고 결과는 '마이페이지 > 인증샷
          <br />
          신고 결과'에서 확인 하실 수 있습니다.
        </p>
      )}
      {message !== "신고 처리 중입니다..." && (
        <button className="popup-button" onClick={onClose}>
          확인
        </button>
      )}
    </div>
  </div></div>
);

const ComplaintPage = () => {
  const location = useLocation();
  const { proof, challenge } = location.state || {};
  const navigate = useNavigate();

  const [selectedReason, setSelectedReason] = useState("");
  const [detailedReason, setDetailedReason] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [loadingPopup, setLoadingPopup] = useState(false); // 로딩 팝업 상태 추가
  const [error, setError] = useState("");

  const proofId = 1; // TODO

  const handleReasonSelect = (reason) => {
    setSelectedReason(reason);
  };

  const handleDetailedReasonChange = (e) => {
    setDetailedReason(e.target.value);
  };

  const isSubmitDisabled = detailedReason.length < 10;

  const runPredict = async (photoUrl) => {
    try {
      const response = await axios.post("http://localhost:5000/run-predict", {
        image_url: photoUrl,
      });
      const predictedLabel = response.data.aiPass;

      if (
        (challenge.title === "카테고리1" && predictedLabel === "water jug") ||
        (challenge.title === "카테고리2" &&
          predictedLabel === "shopping basket") ||
        (challenge.title === "카테고리3" && predictedLabel === "handkerchief")
      ) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("AI 예측 중 오류가 발생했습니다:", error);
      alert("AI 예측 중 오류가 발생했습니다. 다시 신고해 주세요."); // 사용자에게 알림
      return false; // TODO: 임시
    }
  };

  const handleSubmit = async () => {
    if (!isSubmitDisabled) {
      setLoadingPopup(true); // 로딩 팝업 표시
      try {
        const aiPass = await runPredict(proof.photoUrl);
        const data = await submitComplaint({
          proofId: proofId,
          aiPass: aiPass, // TODO: 수정
          description: detailedReason,
        });
        console.log("응답 데이터:", JSON.stringify(data, null, 2));
        setLoadingPopup(false); // 로딩 팝업 종료
        setShowPopup(true); // 완료 팝업 표시
      } catch (error) {
        setLoadingPopup(false); // 로딩 팝업 종료
        setError("신고 제출 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="complaint-page">
      <div className="header">
        <ArrowLeft size={24} className="back-arrow" onClick={handleBackClick} />
        <h1 className="title">신고하기</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="content">
        {/* {proof && (
          <div>
            <img src={proof.photoUrl} alt="신고할 이미지" />
            <p>신고할 사용자: {proof.userName}</p>
            <p>챌린지 제목: {challenge?.title}</p>
          </div>
        )} */}
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

      {/* 로딩 팝업 표시 */}
      {loadingPopup && (
        <PopupModal
          message="신고 처리 중입니다..."
          onClose={() => {}} // 로딩 중일 때는 팝업을 닫을 수 없게 처리
        />
      )}

      {/* 신고 완료 팝업 표시 */}
      {showPopup && (
        <PopupModal
          message="신고가 접수되었습니다"
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default ComplaintPage;
