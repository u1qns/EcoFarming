import React, { useState } from "react";
import "./ProofPage.css";
import ProofNavbar from "./ProofNavbar";
import OngoingChallenge from "./OngoingChallenge";
import UpcomingChallenge from "./UpcomingChallenge";
import Footer from "./Footer";

function ProofPage() {
  const [activeTab, setActiveTab] = useState("ongoing"); // 기본 탭 설정
  const [ongoingCount, setOngoingCount] = useState(0); // 진행 중 챌린지 개수
  const [upcomingCount, setUpcomingCount] = useState(0); // 시작 전 챌린지 개수

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
            {/* <h3>진행 중 챌린지</h3> */}
            <OngoingChallenge setCount={setOngoingCount} /> {/* 개수 전달 */}
          </div>
        )}
        {activeTab === "upcoming" && (
          <div style={{ padding: 15, paddingTop: 0 }}>
            {/* <h3 style={{ marginTop: 5 }}>시작 전 챌린지</h3> */}
            <UpcomingChallenge setCount={setUpcomingCount} /> {/* 개수 전달 */}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default ProofPage;
