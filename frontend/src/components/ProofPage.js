import React, { useState, useEffect } from "react";
import "./ProofPage.css";
import ProofNavbar from "./ProofNavbar";
import OngoingChallenge from "./OngoingChallenge";
import UpcomingChallenge from "./UpcomingChallenge";
import Footer from "./Footer";
import axios from "axios"; // Axios를 이용해 데이터를 불러옴

function ProofPage() {
  const [activeTab, setActiveTab] = useState("ongoing"); // 기본 탭 설정
  const [ongoingCount, setOngoingCount] = useState(0); // 진행 중 챌린지 개수
  const [upcomingCount, setUpcomingCount] = useState(0); // 시작 전 챌린지 개수
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  // useEffect로 데이터를 처음부터 다 불러옴
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 예시: 진행 중 챌린지와 시작 전 챌린지를 동시에 불러오는 비동기 요청
        // 진행 중 챌린지 데이터 요청
        const ongoingResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/challenge-user/ongoing`
        );
        setOngoingCount(ongoingResponse.data.length); // 진행 중 챌린지 개수 설정

        // 시작 전 챌린지 데이터 요청
        const upcomingResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/challenge-user/upcoming`
        );
        setUpcomingCount(upcomingResponse.data.length); // 시작 전 챌린지 개수 설정

        setLoading(false); // 데이터 로드가 완료되면 로딩 상태 해제
      } catch (error) {
        console.error("데이터를 불러오는 중 오류가 발생했습니다.", error);
        setLoading(false); // 오류 발생 시에도 로딩 상태 해제
      }
    };

    fetchData(); // 데이터를 불러오는 함수 호출
  }, []);

  return (
    <div className="ProofPage">
      <ProofNavbar />
      <div className="tab-container">
        {/* 탭 버튼 */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === "ongoing" ? "active" : ""}`}
            onClick={() => setActiveTab("ongoing")}
          >
            진행 중 ({ongoingCount})
          </button>
          <button
            className={`tab ${activeTab === "upcoming" ? "active" : ""}`}
            onClick={() => setActiveTab("upcoming")}
          >
            시작 전 ({upcomingCount})
          </button>
        </div>
      </div>

      {/* 탭에 따른 컨텐츠 */}
      <div className="content">
        {activeTab === "ongoing" && (
          <div style={{ padding: 15, paddingTop: 0 }}>
            {/* 진행 중 챌린지 렌더링 */}
            <OngoingChallenge setCount={setOngoingCount} /> {/* 개수 전달 */}
          </div>
        )}
        {activeTab === "upcoming" && (
          <div style={{ padding: 15, paddingTop: 0 }}>
            {/* 시작 전 챌린지 렌더링 */}
            <UpcomingChallenge setCount={setUpcomingCount} /> {/* 개수 전달 */}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default ProofPage;
