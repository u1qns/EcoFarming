import React, { useState, useEffect } from "react";
import "./ChallengeFooter.css";
import { CalendarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ChallengeFooter = ({ challenge, userId }) => {
  const navigate = useNavigate();
  const [alreadyParticipated, setAlreadyParticipated] = useState(false); // 참가 여부 확인
  const [isChallengeStarted, setIsChallengeStarted] = useState(false); // 챌린지 시작 여부 확인

  // challenge에서 startDate와 endDate를 가져와 사용
  const startDate = challenge ? new Date(challenge.startDate) : null;
  const endDate = challenge ? new Date(challenge.endDate) : null;
  const today = new Date();

  const formatDate = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
    return `${month}. ${day} (${dayOfWeek})`;
  };

  const getDayDifference = () => {
    if (!startDate) return '';
    const diffTime = startDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 0) return `${diffDays}일 후 시작`;
    if (diffDays === 0) return "오늘부터 시작";
    return "이미 시작됨";
  };

  // useEffect는 항상 호출되며 내부에서 조건에 따라 로직 실행을 결정
  useEffect(() => {
    if (!challenge) return; // challenge가 없으면 로직 실행 중단

    const checkParticipationAndStart = async () => {
      const userId = localStorage.getItem("userId"); // localStorage에서 userId 가져오기
      if (!userId) {
        console.error("userId가 존재하지 않습니다. 로그인 여부를 확인하세요.");
        return;
      }

      try {
        // 유저가 이미 챌린지에 참가했는지 확인
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/challenges/${challenge.id}`);
        const challengeData = response.data;

        if (challengeData.type === "ParticipantChallengeResponseDto") {
          setAlreadyParticipated(true); // 이미 참가한 경우
        }

        // 챌린지가 이미 시작된 경우 확인
        if (startDate <= today) {
          setIsChallengeStarted(true); // 이미 시작된 경우
        }
      } catch (error) {
        console.error("참여 여부 또는 챌린지 시작 확인 중 오류 발생:", error);
      }
    };

    checkParticipationAndStart();
  }, [challenge, startDate, today]); // challenge가 변경될 때만 실행

  const apiUrl = process.env.REACT_APP_API_URL;
  const handlePaymentClick = async () => {
    if (alreadyParticipated) return; // 참가했거나 이미 시작된 경우 중단 -> 참가한 경우만 
    const userId = localStorage.getItem('userId'); // localStorage에서 userId 가져오기
    if (!userId) {
      console.error("userId가 존재하지 않습니다. 로그인 여부를 확인하세요.");
      return;
    }

    try {
      const response = await axios.get(`${apiUrl}/challenges/${challenge.id}/${userId}/payment`);

      if (response.status === 200) {
        navigate("/payment", { 
          state: {
            challengeId: challenge.id,
            title: challenge.title,
            description: challenge.description,
            startDate: challenge.startDate,
            endDate: challenge.endDate,
            frequency: challenge.frequency,
            duration: challenge.duration,
            userCount: challenge.userCount,
            totalBetAmountOption1: challenge.totalBetAmountOption1,
            totalBetAmountOption2: challenge.totalBetAmountOption2,
            balanceId: challenge.balanceId,
            option1Description: challenge.option1Description,
            option2Description: challenge.option2Description,
            thumbPhotoUrl: challenge.thumbPhotoUrl
          } });
      } else {
        console.error("Payment failed");
      }
    } catch (error) {
      console.error("Error occurred during payment:", error);
    }
  };

  // challenge가 없으면 컴포넌트 반환하지 않음
  if (!challenge) {
    return null;
  }

  return (
    <footer className="ChallengeFooter">
      <div className="footer-content">
        <div className="date-info">
          <span>
            {formatDate(startDate)} - {formatDate(endDate)}
            <CalendarIcon size={18} />
          </span>
          <span className="duration">
            주 {challenge.frequency}일, {challenge.duration / 7}주 동안
          </span>
        </div>
        <button className="start-button" onClick={handlePaymentClick} disabled={alreadyParticipated}>
        {alreadyParticipated
            ? "이미 참가한 챌린지" // 이미 참가했을 때 비활성화 및 텍스트 표시
            : getDayDifference()}
        </button>
      </div>
    </footer>
  );
};

export default ChallengeFooter;
