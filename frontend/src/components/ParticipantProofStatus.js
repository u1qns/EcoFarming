import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import "./ParticipantProofStatus.css";
import { useNavigate } from "react-router-dom";

// 참가자 인증 현황 컴포넌트
const ParticipantProofStatus = () => {
  const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지 상태
  const [showPopup, setShowPopup] = useState(false); // 팝업 보이기 상태
  const navigate = useNavigate();

  // 이미지 배열
  const images = Array(7)
    .fill()
    .map((_, index) => require(`../assets/images/c1.jpg`));

  // 이미지 클릭 핸들러
  const handleImageClick = (image) => {
    setSelectedImage(image); // 선택된 이미지 저장
    setShowPopup(true); // 팝업 보이기
  };

  // 팝업 닫기 핸들러
  const handleClosePopup = () => {
    setShowPopup(false); // 팝업 닫기
    setSelectedImage(null);
  };

  // 신고하기 버튼 클릭 핸들러
  const handleComplaintClick = () => {
    navigate("/complaint"); // navigate를 통해 /complaint 경로로 이동
  };

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
          {images.map((image, index) => (
            <div
              className="image-wrapper"
              key={index}
              onClick={() => handleImageClick(image)}
            >
              <img
                src={image}
                alt={`인증 이미지 ${index + 1}`}
                className="image"
              />
            </div>
          ))}
        </div>
      </div>
      {/* 팝업 모달 */}
      {showPopup && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-image-container">
              <img
                src={selectedImage}
                alt="선택된 이미지"
                className="popup-image"
              />
              <button className="popup-close-button" onClick={handleClosePopup}>
                X
              </button>
            </div>
            <div className="popup-details">
              <div className="popup-user-info">
                <div className="popup-profile-pic">
                  <img src="/api/placeholder/40/40" alt="Profile" />
                </div>
                <span className="popup-username">복숭아도령</span>
              </div>
              <span className="popup-timestamp">2024.8.29 오전 8:46</span>
            </div>
            <p className="popup-description">오늘하루 | 쓰레기 줍깅 실천하기</p>
            <div className="popup-actions">
              <button className="popup-action-button popup-like-button">
                좋아요
              </button>
              <button className="popup-action-button popup-comment-button">
                댓글
              </button>
              <button
                className="popup-action-button popup-report-button"
                onClick={(e) => {
                  e.stopPropagation(); // 이벤트 전파 방지
                  handleComplaintClick();
                }}
              >
                신고하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParticipantProofStatus;
