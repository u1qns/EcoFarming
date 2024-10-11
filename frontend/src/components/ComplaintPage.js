import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import "./ComplaintPage.css";
import { submitComplaint } from "../services/complaintService";
import { submitAIResult } from "../services/AIService";
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
    </div>
  </div>
);

const ComplaintPage = () => {
  const location = useLocation();
  const { proof, challenge } = location.state || {};
  const navigate = useNavigate();

  const [selectedReason, setSelectedReason] = useState("인증샷 무효");
  const [detailedReason, setDetailedReason] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [loadingPopup, setLoadingPopup] = useState(false); // 로딩 팝업 상태 추가
  const [error, setError] = useState("");

  const handleReasonSelect = (reason) => {
    setSelectedReason(reason);
  };

  const handleDetailedReasonChange = (e) => {
    setDetailedReason(e.target.value);
  };

  const isSubmitDisabled = detailedReason.length < 10;

  const runPredict = async (complaintId, photoUrl) => {
    try {
      //console.log("[runPredict] 호출");
      const response = await axios.post(
        "https://j11a101.p.ssafy.io/run-predict/",
        { image_url: photoUrl }
      );
      const predictedLabel = response.data.aiPass;
      //console.log("AI 분석 라벨 : ", predictedLabel);
      const aiPass =
        (challenge.category_id === 1 && predictedLabel === "water jug") ||
        (challenge.category_id === 2 && predictedLabel === "shopping basket") ||
        (challenge.category_id === 3 && predictedLabel === "handkerchief");
      console.log("AI 예측 결과 : ", aiPass);
      await submitAIResult({ complaintId, aiPass });
    } catch (error) {
      //console.error("AI 예측 중 오류가 발생했습니다:", error);
    }
  };

  const handleSubmit = async () => {
    if (!isSubmitDisabled) {
      setLoadingPopup(true); // 로딩 팝업 표시
      try {
        const response = await submitComplaint({
          proofId: proof.proofId,
          description: detailedReason,
        });

        setLoadingPopup(false); // 로딩 팝업 종료
        setShowPopup(true); // 완료 팝업 표시
        console.log(proof);

        await runPredict(response.id, proof.photoUrl);
      } catch (error) {
        console.error("신고 제출 중 오류 발생 : ", error);
        setLoadingPopup(false); // 로딩 팝업 종료
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
            maxLength={100} // 100자 제한
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
          onClose={() => handleBackClick()}
        />
      )}
    </div>
  );
};

export default ComplaintPage;
