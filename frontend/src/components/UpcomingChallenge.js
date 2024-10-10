import React, { useState, useEffect } from "react";
import axios from "axios"; // Axios 추가
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import "./OngoingChallenge.css"; // 스타일 파일 재사용

const UpcomingChallenge = ({ setCount }) => { // setCount prop 추가
  const [challenges, setChallenges] = useState([]); // 챌린지 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const navigate = useNavigate(); // navigate 함수 추가

  const handleChallengeClick = (challengeId) => {
    const userId = localStorage.getItem('userId');
    navigate(`/ongoing-challenge/${challengeId}/${userId}`); // 해당 챌린지 상세 페이지로 이동
  };

  useEffect(() => {
    const fetchUpcomingChallenges = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/challenge-user/upcoming`
        );
        setChallenges(response.data); // 받아온 데이터를 상태에 저장
        setCount(response.data.length); // 부모 컴포넌트에 챌린지 개수 전달
      } catch (error) {
        console.error("Error fetching upcoming challenges:", error);
      } finally {
        setLoading(false); // 데이터를 가져오면 로딩 종료
      }
    };

    fetchUpcomingChallenges();
  }, [setCount]); // setCount가 변경되면 다시 실행

  if (loading) {
    return <div className="ongoing-challenge-loading-spinner"></div>; // 로딩 애니메이션 표시
  }

  return (
    <div className="ongoing-challenge-container">
      {/* 챌린지가 하나도 없을 때 메시지 표시 */}
      {challenges.length === 0 ? (
        <div className="ongoing-challenge-no-challenge">
          <p className="ongoing-challenge-no-challenge-message">현재 진행 전인 챌린지가 없습니다.</p>
        </div>
      ) : (
        challenges.map((challenge) => (
          <div key={challenge.challengeId} className="ongoing-challenge-card"
          onClick={() => handleChallengeClick(challenge.challengeId)} // 실제 userId를 전달
          style={{ cursor: "pointer" }}>
            <div className="ongoing-challenge-content">
              <div className="ongoing-challenge-image">
                <img
                  src={challenge.thumbPhotoUrl} // API에서 받아온 이미지 경로 사용
                  alt="Challenge icon"
                />
              </div>
              <div className="ongoing-challenge-details">
                <div className="ongoing-challenge-header">
                  <h2>{challenge.title}</h2>
                  <ChevronRight className="chevron-icon" />
                </div>
                <p className="ongoing-challenge-date">
                  {new Date(challenge.startDate).toLocaleDateString()} ~{" "}
                  {new Date(challenge.endDate).toLocaleDateString()}
                </p>
                <p className="ongoing-challenge-time">
                  인증 빈도: 주 {challenge.frequency}회
                </p>
                <div className="ongoing-challenge-stats">
                  <div>
                    <p className="stat-value">{challenge.successRate}%</p>
                    <p className="stat-label">달성률</p>
                  </div>
                  <div>
                    <p className="stat-value">{challenge.totalParticipationCount}번</p>
                    <p className="stat-label">누적 참가 횟수</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UpcomingChallenge;
