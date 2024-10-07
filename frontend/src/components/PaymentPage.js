import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ChevronLeft } from "lucide-react";
import "./PaymentPage.css"; // 스타일 파일 추가
import { FaUser } from "react-icons/fa";
import PaymentNavbar from "./PaymentNavbar";
import { ArrowLeft } from "lucide-react";



const PaymentPage = () => {
  const { state } = useLocation();
  const challengeId = state?.challengeId;
  const [selectedAmount, setSelectedAmount] = useState(10000); // 선택된 금액 상태
  const [userAmount, setUserAmount] = useState(0); // 사용자 보유 예치금 상태
  const [chargingAmount, setChargingAmount] = useState(0); // 실제 충전할 금액
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 표시 상태
  const [remainingAmount, setRemainingAmount] = useState(0); // 남은 금액 상태
  const [selectedGameOption, setSelectedGameOption] = useState("option1");

  const handleAmountClick = (amount) => {
    setSelectedAmount(amount);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFooterButtonClick = () => {
        handlePaymentClick(); // 결제 처리
  };

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const userId = localStorage.getItem('userId'); // localStorage에서 userId 가져오기
        const apiUrl = process.env.REACT_APP_API_URL;
        
        if (!userId) {
          console.error("userId가 존재하지 않습니다. 로그인 여부를 확인하세요.");
          return;
        }

        // goToPayment API 호출로 userAmount 포함된 데이터 가져오기
        const response = await axios.get(`${apiUrl}/challenges/${challengeId}/${userId}/payment`);
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
      balanceId: 1, // 여기에 실제 balanceId 값 설정
      balanceGamePick: 1, // 여기에 실제 balanceGamePick 값 설정
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

  return (
    <div className="payment-page">
      {/* 상단 헤더 */}
      {/* <div className="header">
        <ChevronLeft className="back-button" />
        <h2>참가하기</h2>
      </div> */}
      <PaymentNavbar />
      {/* 정보 메시지 */}
      <div className="info-message">
        챌린지를 통해 함께 환경을 지켜요!
      </div>

      {/* 챌린지 정보 */}
      <div className="challenge-info">
        <img
          src="https://via.placeholder.com/100" // 임시 이미지 경로
          alt="Challenge Thumbnail"
          className="challenge-image"
        />
        <div className="challenge-details">
          <h3>안 쓰는 가전제품 콘센트 빼기</h3>
          <p className="challenge-duration">주 2일, 2주 동안</p>
          <p className="challenge-dates">8. 26 (월) - 9. 8 (일)<span><FaUser /> 26명</span></p>
        </div>
      </div>


     {/* 예치금 섹션 */}
      <div className="deposit-section">
        <h3>예치금</h3>
        <p>시작 전에 돈을 걸면, 종료시점 달성률에 따라 환급해드려요!</p>
        <div className="selected-amount">
          <h1>{selectedAmount.toLocaleString()}원</h1>
        </div>
        <div className="amount-options">
          <button
            className={`amount-button ${selectedAmount === 10000 ? "selected" : ""}`}
            onClick={() => handleAmountClick(10000)}
          >
            10,000원
          </button>
          <button
            className={`amount-button ${selectedAmount === 30000 ? "selected" : ""}`}
            onClick={() => handleAmountClick(30000)}
          >
            30,000원
          </button>
          <button
            className={`amount-button ${selectedAmount === 50000 ? "selected" : ""}`}
            onClick={() => handleAmountClick(50000)}
          >
            50,000원
          </button>
          <button
            className={`amount-button ${selectedAmount === 100000 ? "selected" : ""}`}
            onClick={() => handleAmountClick(100000)}
          >
            100,000원
          </button>
          <button
            className={`amount-button ${selectedAmount === 150000 ? "selected" : ""}`}
            onClick={() => handleAmountClick(150000)}
          >
            150,000원
          </button>
          <button
            className={`amount-button ${selectedAmount === 200000 ? "selected" : ""}`}
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
              <td>(예상) {selectedAmount.toLocaleString()} ~ {(selectedAmount * 1.1).toLocaleString()}원</td>
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
            <span>-{userAmount.toLocaleString()}원</span>
          </p>
          <p style={{ color: 'gray' }}>
            <span>(현재 보유 예치금: {userAmount.toLocaleString()}원)</span>
          </p>
          <p className="charge-amount">
            <span>충전 금액</span>
            <span>{chargingAmount.toLocaleString()}원</span>
          </p>
        </div>

        <p className="agreement-text">
          결제 조건 및 서비스 약관에 동의합니다.
        </p>

        {/* 약관 링크 */}
        <div className="terms-links">
          <p>챌린지 취소 규정</p>
          <p>참가 규칙</p>
          <p>이용 약관</p>
        </div>
      </div>

 {/* 하단 고정 버튼 */}
 <div className="fixed-footer">
        <button className="fixed-footer-button" onClick={handleFooterButtonClick}>
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
              <p>사용 예치금: {userAmount.toLocaleString()}원</p>
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
