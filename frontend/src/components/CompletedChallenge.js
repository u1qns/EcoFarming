import React, { useState, useEffect } from "react";
import axios from "axios"; // Axios 추가
import { ChevronRight } from "lucide-react";
import "./OngoingChallenge.css"; // 스타일 파일 재사용

const CompletedChallenge = () => {
  const [challenges, setChallenges] = useState([]); // 챌린지 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    // 유저 ID에 따라 데이터를 불러옴
    const fetchUpcomingChallenges = async () => {
      try {
        const userId = 1; // 예시로 유저 ID 설정
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/challenge-user/${userId}/upcoming`
        );
        setChallenges(response.data); // 받아온 데이터를 상태에 저장
      } catch (error) {
        console.error("Error fetching upcoming challenges:", error);
      } finally {
        setLoading(false); // 데이터를 가져오면 로딩 종료
      }
    };

    fetchUpcomingChallenges();
  }, []); // 컴포넌트가 마운트될 때만 실행

  if (loading) {
    return <p>로딩 중...</p>; // 로딩 중일 때 표시
  }

  return (
    <div className="ongoing-challenge-container">
      {/* 챌린지가 하나도 없을 때 메시지 표시 */}
      {challenges.length === 0 ? (
        <p>시작 예정인 챌린지가 없습니다.</p>
      ) : (
        challenges.map((challenge) => (
          <div key={challenge.challengeId} className="ongoing-challenge-card">
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
                  인증 빈도: {challenge.frequency}일마다
                </p>
                <div className="ongoing-challenge-stats">
                  <div>
                    <p className="stat-value">{challenge.successRate}%</p>
                    <p className="stat-label">예상 달성률</p>
                  </div>
                  <div>
                    <p className="stat-value">
                      {challenge.totalParticipationCount}번
                    </p>
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

export default CompletedChallenge;
