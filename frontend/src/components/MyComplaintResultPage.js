import "./MyComplaintResultPage.css";
import MyComplaintResult from "./MyComplaintResult";
import Footer from "./Footer";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchComplaints } from "../services/myComplaintService"

function MyComplaintResultPage() {
  const [complaints, setComplaints] = useState([]); // 신고 리스트 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  useEffect(() => {
    const loadComplaints = async () => {
      try {
        const data = await fetchComplaints();
        setComplaints(data); // 상태 업데이트
        JSON.stringify(data, null, 2);
      } catch (err) {
        setError(err.message); // 에러 메시지 설정
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    loadComplaints(); // 신고 리스트 로드
  }, []); // 빈 배열로 설정하여 컴포넌트가 처음 마운트될 때만 호출

  // // 로딩 중일 때 표시할 UI
  // if (loading) {
  //   return <p>로딩 중...</p>;
  // }

  // // 에러 발생 시 표시할 UI
  // if (error) {
  //   return <p>오류: {error}</p>;
  // }

  return (
    <div className="MyComplaintResultPage">
      <div className="header">
        <ArrowLeft size={24} className="back-arrow" onClick={handleBackClick} />
        <h1 className="title">인증샷 신고 결과</h1>
      </div>
      <div className="content">
        <div style={{ marginBottom: 20 }}></div>
        <div style={{ padding: 15, paddingTop: 0 }}>
          <MyComplaintResult complaints={complaints} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyComplaintResultPage;
