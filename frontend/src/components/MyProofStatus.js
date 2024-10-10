import React, { useState, useEffect } from "react";
import "./MyProofStatus.css";
import { useParams } from "react-router-dom";
import axios from "axios";

// 나의 인증 현황 컴포넌트
const MyProofStatus = ({ challenge }) => {
  const { challengeId, userId } = useParams(); // URL에서 challengeId와 userId를 가져옴
  const apiUrl = process.env.REACT_APP_API_URL; // .env 파일의 API URL 사용
  const [myProofs, setMyProofs] = useState([]); // 나의 인증 정보를 저장할 상태
  const [achievementRate, setAchievementRate] = useState(0); // 달성률 상태
  const [proofSummary, setProofSummary] = useState({
    successCount: 0,
    failCount: 0,
    remainingCount: 0,
  });

  // 나의 인증 정보 및 요약 정보 가져오기
  useEffect(() => {
    const fetchMyProofs = async () => {
      try {
        // API 호출
        const response = await axios.get(
          `${apiUrl}/proof/${challengeId}/${userId}`
        );
        const proofsData = response.data.proofs; // 인증 데이터
        setMyProofs(proofsData); // 나의 인증 정보 저장

        // 달성률 계산
        const successCount = proofsData.filter((proof) => proof.isValid).length;
        const totalProofs = proofsData.length;
        const failCount = totalProofs - successCount;
        const remainingCount = Math.max(0, challenge.frequency - totalProofs); // 남은 인증 횟수 (예시로 7일 기준)

        setProofSummary({
          successCount: successCount,
          failCount: failCount,
          remainingCount: remainingCount,
        });

        setAchievementRate(Math.floor(successCount * 100 / challenge.frequency)); // 내림하여 소수점 없는 값으로 설정
      } catch (error) {
        console.error("Error fetching proof data:", error);
      }
    };

    fetchMyProofs();
  }, [apiUrl, challengeId, userId]); // challengeId와 userId가 변경될 때마다 호출

  return (
    <div className="MyProofStatus">
      <div className="proof-status-container">
        {/* 현재 달성률 */}
        <div className="achievement-section">
          <div className="achievement">
            <p>현재 달성률</p>
            <h1>{achievementRate}%</h1> {/* 달성률 표시 */}
          </div>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${achievementRate}%` }}
            ></div>
          </div>
        </div>

        {/* 인증 성공, 실패, 남은 인증 정보 */}
        <div className="proof-summary-section">
          <div>
            <p>인증 성공</p>
            <h2>{proofSummary.successCount}회</h2> {/* 성공한 인증 횟수 */}
          </div>
          <div>
            <p>인증 실패</p>
            <h2>{proofSummary.failCount}회</h2> {/* 실패한 인증 횟수 */}
          </div>
          <div>
            <p>남은 인증</p>
            <h2>{proofSummary.remainingCount}회</h2> {/* 남은 인증 횟수 */}
          </div>
        </div>

        {/* 인증 목록 */}
        <div className="proof-list">
          {myProofs.length > 0 ? (
            myProofs.map((proof, index) => (
              <div className="proof-item" key={proof.proofId}>
                <div className="proof-date">
                  <p>{index + 1}</p>
                </div>
                <div className="proof-info">
                  <p
                    style={{
                      fontSize: "13px",
                      paddingLeft: "6px",
                      paddingTop: "3px",
                    }}
                  >
                    {new Date(proof.createdAt).toLocaleDateString()}
                  </p>{" "}
                  {/* 인증 날짜 */}
                  <p className={proof.isValid ? "success" : "fail"}>
                    {proof.isValid ? "성공" : "실패"} {/* 성공/실패 상태 */}
                  </p>
                  <img
                    src={proof.photoUrl}
                    alt={`인증 이미지 ${index + 1}`}
                    className="proof-image"
                  />
                </div>
              </div>
            ))
          ) : (
            <p>인증 기록이 없습니다.</p> // 인증 데이터가 없을 때 표시
          )}
        </div>
      </div>

      <div className="MyProofImage">
        <h2>나의 인증샷</h2>
        <div className="image-grid">
          {myProofs.length > 0 ? (
            myProofs.map((proof, index) => (
              <div className="image-wrapper" key={proof.proofId}>
                <img
                  src={proof.photoUrl}
                  alt={`인증 이미지 ${index + 1}`}
                  className="image"
                />
              </div>
            ))
          ) : (
            <p className="MyProofStatus-empty-text">현재 인증샷이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProofStatus;
