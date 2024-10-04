import React from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";
import { FaHeart, FaUser } from "react-icons/fa";

function Card({
  id,
  thumbnail,
  title,
  duration,
  frequency,
  startDate,
  participants,
  onClick, // 클릭 시 호출될 함수
}) {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const handleCardClick = () => {
    navigate(`/challenge/${id}/${userId}`); //UserId // ID를 사용하여 Challenge 페이지로 이동
  };

  return (
    <div className="card" onClick={onClick}> {/* onClick에 전달된 props 사용 */}
      <div className="card-thumbnail-container">
        <img src={thumbnail} alt={title} className="card-thumbnail" />
        <FaHeart className="card-heart-icon" />
      </div>
      <div className="card-body">
        <div className="card-title">
          <span className="challenge-type">공식챌린지</span>
          <div className="card-participants">
            <FaUser /> {participants}명
          </div>
        </div>
        <h3 className="card-main-title">{title}</h3>
        <div className="card-info">
          <span className="card-frequency">주 {frequency}</span>
          <span className="card-duration">{duration}</span>
        </div>
        <div className="card-start">
          <span>{startDate}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
