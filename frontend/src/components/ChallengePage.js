import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Share2, Heart } from "lucide-react";
import { FaHeart, FaUser } from "react-icons/fa";
import "./ChallengePage.css";

const ChallengePage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };
  return (
    <div className="challenge-page">
      <div className="image-container">
        <img
          src={require("../assets/images/c1.jpg")}
          alt="Challenge"
          className="challenge-image"
        />
        <div className="header">
          <div className="icon-background" onClick={handleBackClick}>
            <ChevronLeft className="back-button" />
          </div>
          <div className="action-buttons">
            <div className="icon-background">
              <Share2 className="share-button" />
            </div>
            <div className="icon-background">
              <Heart className="heart-button" />
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="challenge-type">공식 챌린지</div>
        <h1 className="challenge-title">안 쓰는 가전제품 콘센트 뽑기</h1>
        <div className="challenge-stats">
          <span className="rating">⭐ 4.8</span>
          <span className="participants">
            • <FaUser /> 현재 26명
          </span>
        </div>
        <div className="challenge-duration">
          <span className="duration-item">주 2일</span>
          <span className="duration-item">2주 동안</span>
        </div>
      </div>
    </div>
  );
};

export default ChallengePage;
