import React, { useState, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import "./ParticipantProofStatus.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // axios를 import
import emptyImage from "../assets/images/noPhoto.jpg";

// 참가자 인증 현황 컴포넌트
const ParticipantProofStatus = () => {
  const { challengeId, userId } = useParams(); // URL에서 challengeId와 userId를 가져옴
  const apiUrl = process.env.REACT_APP_API_URL; // .env 파일의 API URL 사용
  const [selectedProof, setSelectedProof] = useState(null); // 선택된 인증 정보 상태
  const [showPopup, setShowPopup] = useState(false); // 팝업 보이기 상태
  const [proofImages, setProofImages] = useState([]); // 인증샷 데이터를 저장할 상태
  const [challenge, setChallenge] = useState(null); // 챌린지 정보를 저장할 상태
  const navigate = useNavigate();

  // 모든 참가자 인증 목록 저장
  useEffect(() => {
    const fetchProofImages = async () => {
      try {
        const proofResponse = await axios.get(`${apiUrl}/proof/${challengeId}`); 
        setProofImages(proofResponse.data.proofs);
    
        const challengeResponse = await axios.get(`${apiUrl}/challenges/${challengeId}`);
        setChallenge(challengeResponse.data);
      } catch (error) {
        if (error.proofResponse) {
          console.error("서버 오류 발생:", error.proofResponse.status, error.proofResponse.data);
        } else if (error.request) {
          console.error("네트워크 오류:", error.request);
        } else {
          console.error("오류 발생:", error.message);
        }
      }
    };

    fetchProofImages();
  }, []); // 컴포넌트가 마운트될 때 호출

  // 이미지 클릭 핸들러
  const handleImageClick = (proof) => {
    setSelectedProof(proof); // 선택된 이미지 저장
    setShowPopup(true); // 팝업 보이기
  };

  // 팝업 닫기 핸들러
  const handleClosePopup = () => {
    setShowPopup(false); // 팝업 닫기
    setSelectedProof(null);
  };

  // 신고하기 버튼 클릭 핸들러
  const handleComplaintClick = () => {
    navigate("/complaint", {
      state: {
        proof: selectedProof,
        challenge: challenge
      }
    });
  };  

  return (
    <div className="ParticipantProofStatus">
      <div className="achievement-section">
        <div className="achievement">
          <p>총 참가자수</p>
          <h1>{challenge?.userCount || 0}명</h1>
        </div>
        <div className="achievement">
          <p>평균 예상 달성률</p>
          <h1>80%</h1>
        </div>
      </div>
      <div className="ProofImage">
        <h2>참가자 인증샷</h2>
        <div className="image-grid">
          {proofImages.length > 0 ? (
            proofImages.map((proof, index) => (
              <div
                className="image-wrapper"
                key={proof.proofId}
                onClick={() => handleImageClick(proof)}
              >
                <img
                  src={proof.photoUrl}
                  alt={`인증 이미지 ${index + 1}`}
                  className="image"
                />
              </div>
            ))
          ) : (
            <p className="ParticipantProofStatus-empty-text">현재 인증샷이 없습니다.</p>
          )}
        </div>
      </div>
      {/* 팝업 모달 */}
      {showPopup && selectedProof && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-image-container">
              <img
                src={selectedProof.photoUrl}
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
                  <img src={require('../assets/images/defaultProfile.png')} alt="Profile" />
                </div>
                <span className="popup-username">{selectedProof.userName}</span>
              </div>
              <span className="popup-timestamp">
                {new Date(selectedProof.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="popup-description">오늘하루 | {challenge.title}</p>
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