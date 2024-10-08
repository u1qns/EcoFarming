import "./MyUpcomingChallengePage.css";
import UpcomingChallenge from "./UpcomingChallenge";
import Footer from "./Footer";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";



function MyUpcomingChallengePage() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };
  return (
    <div className="MyUpcomingChallengePage">
      <div className="header">
        <ArrowLeft size={24} className="back-arrow" onClick={handleBackClick} />
        <h1 className="title">시작 전 챌린지</h1>
      </div>
      <div className="content">
        <div style={{ marginBottom: 20 }}></div>
        <div style={{ padding: 15, paddingTop: 0 }}>
          <UpcomingChallenge setCount={setCount}/> {/* setCount prop 전달 */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyUpcomingChallengePage;
