import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Share2, Heart } from "lucide-react";
import { FaHeart, FaUser } from "react-icons/fa";
import "./ChallengePage.css";
import ChallengeFooter from "./ChallengeFooter";

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
    <div className="ChallengePage">
      <div className="content">
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
        <div className="challenge-content">
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
        <div style={{ padding: 15 }}>
          <h2>돈을 걸면 무조건 하게 됩니다</h2>
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
        <div style={{ padding: 15 }} className="proof">
          <h2>이렇게 인증해주세요</h2>
          <p style={{ lineHeight: "1.5" }}>
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
        <hr />
        <div style={{ padding: 15 }}>
          <h2>챌린지 진행 시 꼭 알아주세요!</h2>
          <p>
            ✔&nbsp; 00시 00분 ~ 23시 59분 사이에 인증 하셔야
            <br /> &nbsp; &nbsp; 합니다.
          </p>
          <p>✔&nbsp; 사진첩을 사용하실 수 없습니다.</p>
          <p>✔&nbsp; 인증샷이 참가자에게만 공개됩니다.</p>
        </div>
      </div>
      <ChallengeFooter />
    </div>
  );
};

export default ChallengePage;
