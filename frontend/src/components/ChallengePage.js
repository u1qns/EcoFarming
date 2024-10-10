import React, { useState, useEffect }  from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, Share2, Heart } from "lucide-react";
import { FaHeart, FaUser } from "react-icons/fa";
import "./ChallengePage.css";
import ChallengeFooter from "./ChallengeFooter";
import axios from "axios";
import { fetchProofGuide } from "../services/proofService";

const ChallengePage = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { state } = useLocation();
  const [challengeData, setChallengeData] = useState(null);
  const [balanceData, setBalanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [guideText, setGuideText] = useState("");
  const [rightGuidePhotoUrl, setRightGuidePhotoUrl] = useState("");
  const [wrongGuidePhotoUrl, setWrongGuidePhotoUrl] = useState("");
  const { challengeId } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchChallengeData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/challenges/${challengeId}`
        );
        setChallengeData(response.data);
        setLoading(false);
      } catch (err) {
        setError("챌린지 데이터를 불러오는데 실패했습니다.");
        setLoading(false);
      }
    };
    const fetchGuideData = async () => {
      try {
        const data = await fetchProofGuide(challengeId);
        const { guideText, rightGuidePhotoUrl, wrongGuidePhotoUrl } = data;

        setGuideText(guideText);
        setRightGuidePhotoUrl(rightGuidePhotoUrl);
        setWrongGuidePhotoUrl(wrongGuidePhotoUrl);
      } catch (error) {
        setError("인증 가이드를 불러오는데 실패했습니다.");
      }
    };

    fetchChallengeData();
    fetchGuideData(); 

  }, [challengeId, userId]);
  if (loading) return <div className="challenge-page-loading-spinner"></div>;
  if (error) return <div>{error}</div>;
  if (!challengeData) return null;

  const {
    title,
    description,
    startDate,
    endDate,
    frequency,
    duration,
    userCount,
    totalBetAmountOption1,
    totalBetAmountOption2,
    balanceId,
    option1Description,
    option2Description,
    thumbPhotoUrl
  } = challengeData;

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

  const card1 = { title: option1Description, amount: totalBetAmountOption1 };
  const card2 = { title: option2Description, amount: totalBetAmountOption2 };

  const getFillHeight = (amount1, amount2) => {
    if (amount1 === amount2) return "50%";
    return amount1 > amount2 ? "60%" : "40%";
  };

  return (
    <div className="ChallengePage">
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
      <div className="content">
        <div className="image-container">
          <img
             src={state?.thumbPhotoUrl || challengeData.thumbPhotoUrl}
            alt="Challenge"
            className="challenge-image"
          />
        </div>
        <div className="challenge-content">
          <div className="challenge-type">공식 챌린지</div>
          <h1 className="challenge-title">{title}</h1>
          <div className="challenge-stats">
            <span className="rating">⭐ 4.8</span>
            <span className="participants">
              • <FaUser /> 현재 {userCount}명
            </span>
          </div>
          <div className="challenge-duration">
            <span className="duration-item">주 {frequency}일</span>
            <span className="duration-item">{duration / 7}주 동안</span>
          </div>
        </div>

        <div style={{ padding: 15 }}>
          <div className="ballance-container">
            <div>
              <div className="ballance-card">
                <p className="ballance-card-text ">{`${card1.title}`}</p>
                <div
                  className="ballance-fill-bar"
                  style={{ height: getFillHeight(card1.amount, card2.amount) }}
                ></div>
              </div>
              <div className="ballance-amount">
                {card1.amount.toLocaleString()}원
              </div>
            </div>
            <div>
              <div className="ballance-card">
                <p className="ballance-card-text ">{`${card2.title}`}</p>
                <div
                  className="ballance-fill-bar"
                  style={{ height: getFillHeight(card2.amount, card1.amount) }}
                ></div>
              </div>
              <div className="ballance-amount">
                {card2.amount.toLocaleString()}원
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div style={{ padding: 15 }}>
          <h2>돈을 걸면 무조건 하게 됩니다</h2>
          <p className="description" style={{ lineHeight: "1.5" }}>
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
          <p className="description" style={{ lineHeight: "1.5" }}>
            {guideText}
          </p>
          <div className="proof-container">
            <div className="image-wrapper">
              <img
                src={rightGuidePhotoUrl}
                alt="Left image"
                className="proof-image"
              />
              <div className="green-bar">O</div>
            </div>
            <div className="image-wrapper">
              <img
                src={wrongGuidePhotoUrl}
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
          <p className="description">
            ✔&nbsp; 00시 00분 ~ 23시 59분 사이에 인증 하셔야
            <br /> &nbsp; &nbsp; 합니다.
          </p>
          <p className="description">✔&nbsp; 사진첩을 사용하실 수 없습니다.</p>
          <p className="description">
            ✔&nbsp; 인증샷이 참가자에게만 공개됩니다.
          </p>
        </div>
      </div>
      <ChallengeFooter challenge={challengeData} />
    </div>
  );
};

export default ChallengePage;
