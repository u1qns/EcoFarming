import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import PaymentNavbar from "./PaymentNavbar";
import "./PaymentPage.css"; // 스타일 파일 추가

const PaymentPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    challengeId,
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
    thumbPhotoUrl,
  } = state || {};

  const [currentBetAmountOption1, setCurrentBetAmountOption1] = useState(
    totalBetAmountOption1
  );
  const [currentBetAmountOption2, setCurrentBetAmountOption2] = useState(
    totalBetAmountOption2
  );
  const [selectedAmount, setSelectedAmount] = useState(0); // 선택된 금액 상태
  const [userAmount, setUserAmount] = useState(0); // 사용자 보유 예치금 상태
  const [chargingAmount, setChargingAmount] = useState(0); // 실제 충전할 금액
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 표시 상태
  const [remainingAmount, setRemainingAmount] = useState(0); // 남은 금액 상태

  const handleAmountClick = (amount) => {
    setSelectedAmount(amount);
    // 선택된 카드에 해당 금액을 즉시 반영
    if (selectedCard === 1) {
      setCurrentBetAmountOption1(totalBetAmountOption1 + amount); // 옵션1에 금액 반영
    } else if (selectedCard === 2) {
      setCurrentBetAmountOption2(totalBetAmountOption2 + amount); // 옵션2에 금액 반영
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate("/users");
  };

  const validateSelection = () => {
    if (selectedCard === null) {
      alert("밸런스 게임을 반드시 선택해주세요 🎰");
      return false;
    }
    if (selectedAmount <= 0) {
      alert("예치금을 넣어주세요! 🌍");
      return false;
    }
    return true;
  };

  const handleFooterButtonClick = () => {
    if(!validateSelection()) {
      return;
    }
    handlePaymentClick(); // 결제 처리
  };

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const userId = localStorage.getItem("userId"); // localStorage에서 userId 가져오기
        const apiUrl = process.env.REACT_APP_API_URL;

        if (!userId) {
          console.error(
            "userId가 존재하지 않습니다. 로그인 여부를 확인하세요."
          );
          return;
        }

        // goToPayment API 호출로 userAmount 포함된 데이터 가져오기
        const response = await axios.get(
          `${apiUrl}/challenges/${challengeId}/${userId}/payment`
        );
        setUserAmount(response.data.amount); // 가져온 amount를 상태로 설정
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };

    fetchPaymentData();
  }, [challengeId]); // 컴포넌트 로드 시 한 번만 실행

  useEffect(() => {
    setChargingAmount(Math.max(selectedAmount - userAmount, 0)); // chargingAmount를 계산하여 설정
  }, [selectedAmount, userAmount]);

  const handlePaymentClick = async () => {
    const userId = localStorage.getItem("userId");
    const apiUrl = process.env.REACT_APP_API_URL;

    if (!userId) {
      console.error("userId가 존재하지 않습니다.");
      return;
    }

    const paymentData = {
      balanceId: balanceId,
      balanceGamePick: selectedCard === 1 ? 1 : 2, 
      chargingAmount,
      betAmount: selectedAmount,
    };

    try {
      const response = await axios.post(
        `${apiUrl}/challenges/${challengeId}/${userId}/payment`,
        paymentData
      );

      if (response.status === 200) {
        const newRemainingAmount = userAmount - selectedAmount + chargingAmount;
        setRemainingAmount(newRemainingAmount); // 남은 금액 업데이트
        setIsModalOpen(true); // 모달 열기
      } else {
        console.error("결제에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error occurred during payment:", error);
    }
  };

  const card1 = { title: option1Description, amount: totalBetAmountOption1 };
  const card2 = { title: option2Description, amount: totalBetAmountOption2 };

  const getFillHeight = (amount1, amount2) => {
    const total = amount1 + amount2;
    if (total === 0) return "50%"; // 양쪽 모두 0일 때는 기본적으로 50%

    const percentage1 = (amount1 / total) * 100;
    return `${percentage1}%`;
  };

  const [selectedCard, setSelectedCard] = useState(null);
  const handleCardClick = (cardNumber) => {
    setSelectedCard(cardNumber); // 선택된 카드를 업데이트

    // 선택된 카드가 옵션 1일 때
    if (cardNumber === 1) {
      setCurrentBetAmountOption1(totalBetAmountOption1 + selectedAmount); // 선택한 금액을 옵션 1에 반영
      setCurrentBetAmountOption2(totalBetAmountOption2); // 옵션 2는 원래 값 유지
    }

    // 선택된 카드가 옵션 2일 때
    if (cardNumber === 2) {
      setCurrentBetAmountOption2(totalBetAmountOption2 + selectedAmount); // 선택한 금액을 옵션 2에 반영
      setCurrentBetAmountOption1(totalBetAmountOption1); // 옵션 1은 원래 값 유지
    }
  };

  return (
    <div className="payment-page">
      {/* 상단 헤더 */}
      {/* <div className="header">
        <ChevronLeft className="back-button" />
        <h2>참가하기</h2>
      </div> */}
      <PaymentNavbar />
      {/* 정보 메시지 */}
      <div className="info-message">챌린지를 통해 함께 환경을 지켜요!</div>

      {/* 챌린지 정보 */}
      <div className="challenge-info">
        <img
          src={thumbPhotoUrl || "https://via.placeholder.com/100"} // thumbPhotoUrl 사용, 없으면 기본 이미지
          alt="Challenge Thumbnail"
          className="challenge-image"
        />
        <div className="challenge-details">
          <h3>{title}</h3> {/* 실제 챌린지 제목 */}
          <p className="challenge-duration">
            주 {frequency}일, {Math.ceil(duration / 7)}주 동안
          </p>
          <p className="challenge-dates">
            {new Date(startDate).toLocaleDateString()} -{" "}
            {new Date(endDate).toLocaleDateString()} {/* 날짜 형식으로 변환 */}
            <span>
              <FaUser /> {userCount}명
            </span>
          </p>
        </div>
      </div>

      {/* 예치금 섹션 */}
      <div className="deposit-section">
        {/* <h3>예치금</h3> */}
        <h3>예치금을 걸고싶은 옵션을 선택해주세요.</h3>
        <div className="ballance-container">
          <div>
            <div
              className={`ballance-card ${selectedCard === 1 ? "choice" : ""}`}
              onClick={() => handleCardClick(1)}
            >
              <p className="ballance-card-text ">{`${option1Description}`}</p>
              <div
                className="ballance-fill-bar"
                style={{
                  height: getFillHeight(
                    currentBetAmountOption1,
                    currentBetAmountOption2
                  ),
                }}
              ></div>
            </div>
            <div className="ballance-amount">
              {currentBetAmountOption1.toLocaleString()}원
            </div>
          </div>
          <div>
            <div
              className={`ballance-card ${selectedCard === 2 ? "choice" : ""}`}
              onClick={() => handleCardClick(2)}
            >
              <p className="ballance-card-text ">{`${option2Description}`}</p>
              <div
                className="ballance-fill-bar"
                style={{
                  height: getFillHeight(
                    currentBetAmountOption2,
                    currentBetAmountOption1
                  ),
                }}
              ></div>
            </div>
            <div className="ballance-amount">
              {currentBetAmountOption2.toLocaleString()}원
            </div>
          </div>
        </div>

        <p>
          시작 전에 돈을 걸면,
          <br /> 종료시점 달성률에 따라 환급해드려요!
        </p>
        <div className="selected-amount">
          <h1>{selectedAmount.toLocaleString()}원</h1>
        </div>
        <div className="amount-options">
          <button
            className={`amount-button ${
              selectedAmount === 10000 ? "selected" : ""
            }`}
            onClick={() => handleAmountClick(10000)}
          >
            10,000원
          </button>
          <button
            className={`amount-button ${
              selectedAmount === 30000 ? "selected" : ""
            }`}
            onClick={() => handleAmountClick(30000)}
          >
            30,000원
          </button>
          <button
            className={`amount-button ${
              selectedAmount === 50000 ? "selected" : ""
            }`}
            onClick={() => handleAmountClick(50000)}
          >
            50,000원
          </button>
          <button
            className={`amount-button ${
              selectedAmount === 100000 ? "selected" : ""
            }`}
            onClick={() => handleAmountClick(100000)}
          >
            100,000원
          </button>
          <button
            className={`amount-button ${
              selectedAmount === 150000 ? "selected" : ""
            }`}
            onClick={() => handleAmountClick(150000)}
          >
            150,000원
          </button>
          <button
            className={`amount-button ${
              selectedAmount === 200000 ? "selected" : ""
            }`}
            onClick={() => handleAmountClick(200000)}
          >
            200,000원
          </button>
        </div>
        <p className="note">최소 1만원 ~ 최대 20만원</p>
      </div>

      {/* 결제 정보 섹션 */}
      <div className="refund-info">
        <table className="refund-table">
          <tbody>
            <tr>
              <td>100% 성공</td>
              <td>
                (예상) {selectedAmount.toLocaleString()} ~{" "}
                {(selectedAmount * 1.1).toLocaleString()}원
              </td>
            </tr>
            <tr>
              <td>85% 이상 성공</td>
              <td>{selectedAmount.toLocaleString()}원</td>
            </tr>
            <tr>
              <td>85% 미만 성공</td>
              <td>예치금 일부 환급 (성공률 만큼)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 예치금 충전 및 결제 섹션 */}
      <div className="payment-section">
        <h3>예치금 충전 및 결제</h3>
        <div className="payment-details">
          <p>
            <span>참가 예치금</span>
            <span>{selectedAmount.toLocaleString()}원</span>
          </p>
          <p>
            <span>사용 예치금</span>
            <span>-{Math.min(selectedAmount, userAmount).toLocaleString()}원</span>
          </p>
          <p style={{ color: "gray" }}>
            <span>(현재 보유 예치금: {userAmount.toLocaleString()}원)</span>
          </p>
          <p className="charge-amount">
            <span>충전 금액</span>
            <span>{chargingAmount.toLocaleString()}원</span>
          </p>
        </div>

        <p className="agreement-text">결제 조건 및 서비스 약관에 동의합니다.</p>

        {/* 약관 링크 */}
        <div className="terms-links">
          <p>챌린지 취소 규정</p>
          <p>참가 규칙</p>
          <p>이용 약관</p>
        </div>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed-footer">
        <button
          className="fixed-footer-button"
          onClick={handleFooterButtonClick}
        >
          {chargingAmount.toLocaleString()}원 충전하기
        </button>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <div className="payment-popup">
          <div className="popup-overlay">
            <div className="popup-content">
              <h2>결제가 완료되었습니다.</h2>
              <p>충전한 금액: {chargingAmount.toLocaleString()}원</p>
              <p>사용 예치금: {Math.min(selectedAmount, userAmount).toLocaleString()}원</p>
              <p>남은 금액: {remainingAmount.toLocaleString()}원</p>

              <button className="popup-button" onClick={handleModalClose}>
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
