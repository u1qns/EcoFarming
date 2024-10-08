import "./MyOngoingChallengePage.css";
import OngoingChallenge from "./OngoingChallenge";
import Footer from "./Footer";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function MyOngoingChallengePage() {
  const [count, setCount] = useState(0); // 챌린지 개수를 저장할 상태 추가
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };
  return (
    <div className="MyOngoingChallengePage">
      <div className="header">
        <ArrowLeft size={24} className="back-arrow" onClick={handleBackClick} />
        <h1 className="title">참가 중 챌린지</h1>
      </div>
      <div className="content">
        <div style={{ marginBottom: 20 }}></div>
        <div style={{ padding: 15, paddingTop: 0 }}>
          <OngoingChallenge setCount={setCount}/>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyOngoingChallengePage;
