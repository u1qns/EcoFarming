import "./MyComplaintResultPage.css";
import MyComplaintResult from "./MyComplaintResult";
import Footer from "./Footer";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function MyComplaintResultPage() {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };
  return (
    <div className="MyComplaintResultPage">
      <div className="header">
        <ArrowLeft size={24} className="back-arrow" onClick={handleBackClick} />
        <h1 className="title">인증샷 신고 결과</h1>
      </div>
      <div className="content">
        <div style={{ marginBottom: 20 }}></div>
        <div style={{ padding: 15, paddingTop: 0 }}>
          <MyComplaintResult />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyComplaintResultPage;
