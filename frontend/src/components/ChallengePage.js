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

  const bars = [
    { deposit: 100, refund: 0, reward: 0 },
    { deposit: 90, refund: 10, reward: 0 },
    { deposit: 75, refund: 25, reward: 0 },
    { deposit: 50, refund: 50, reward: 0 },
    { deposit: 25, refund: 75, reward: 0 },
    { deposit: 0, refund: 100, reward: 0 }, // 100% 환급
    { deposit: 0, refund: 100, reward: 10 }, // 100% 환급 + 10% 상금
  ];

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

      <hr />
      <div className="challenge-content">
        <div style={{ padding: 15 }}>
          <h2>돈을 걸면 무조건 하게 됩니다.</h2>
          <p style={{ lineHeight: "1.5" }}>
            나를 움직이는 강력한 알람, 돈!
            <br />
            챌린지 시작 전 예치금을 걸어두세요.
            <br />
            <span style={{ fontWeight: "bold" }}>
              85% 이상만 성공해도 예치금을 그대로 돌려받을 수 있어요!&nbsp;
            </span>
            혼자만의 결심으로 하기 힘든 일이라면 돈을 걸고 챌린지를 시작해
            보세요.
          </p>
        </div>
        <hr />
        <div style={{ padding: 15 }}>
          <h2>챌린지 환급 안내</h2>
          <table className="refund-table">
            <tbody>
              <tr>
                <td>100% 성공</td>
                <td>예치금 전액 환급 + 상금</td>
              </tr>
              <tr>
                <td>85% 이상 성공</td>
                <td>예치금 전액 환급</td>
              </tr>
              <tr>
                <td>85% 미만 성공</td>
                <td>예치금 일부 환급 (성공률 만큼)</td>
              </tr>
            </tbody>
          </table>
          <div className="graph">
            <div className="progress-chart">
              {bars.map((bar, index) => (
                <div
                  key={index}
                  className="progress-bar"
                  style={{ height: index === bars.length - 1 ? "100%" : "90%" }}
                >
                  <div
                    className="success"
                    style={{ height: `${bar.refund}%` }}
                  ></div>
                  <div
                    className="deposit"
                    style={{ height: `${bar.deposit}%` }}
                  ></div>
                  {bar.reward > 0 && (
                    <div
                      className="bonus"
                      style={{ height: `${bar.reward}%` }}
                    ></div>
                  )}
                </div>
              ))}
            </div>
            <div className="progress-labels">
              <span>0%</span>
              <span></span> <span></span> <span></span> <span></span>
              <span></span> <span></span> <span></span> <span></span>
              <span></span> <span></span>
              <span>85%</span>
              <span>100%</span>
            </div>
            <div className="legend">
              <div>
                <span className="deposit-color"></span> 예치금
              </div>
              <div>
                <span className="success-color"></span> 성공률에 따른 예치금
                환급
              </div>
              <div>
                <span className="bonus-color"></span> 상금
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default ChallengePage;
