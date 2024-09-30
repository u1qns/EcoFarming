import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { fetchProofGuide } from "../services/proofService";
import "./ProofGuidePage.css";

const ProofGuidePage = () => {
  const navigate = useNavigate();
  const { challengeId } = useParams(); // URL에서 challengeId 가져오기
  const location = useLocation(); // URL에서 쿼리 스트링을 가져오기 위한 훅
  const [guideText, setGuideText] = useState("");
  const [rightGuidePhotoUrl, setRightGuidePhotoUrl] = useState("");
  const [wrongGuidePhotoUrl, setWrongGuidePhotoUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 쿼리 스트링에서 userId 가져오기
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");

  useEffect(() => {
    const fetchGuideData = async () => {
      try {
        const data = await fetchProofGuide(challengeId);
        const { guideText, rightGuidePhotoUrl, wrongGuidePhotoUrl } = data;

        setGuideText(guideText);
        setRightGuidePhotoUrl(rightGuidePhotoUrl);
        setWrongGuidePhotoUrl(wrongGuidePhotoUrl);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGuideData();

    // 전달받은 challengeId와 userId를 로그로 출력
    console.log("Challenge ID:", challengeId);
    console.log("User ID:", userId);
  }, [challengeId, userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const handleStartCamera = () => {
    // userId와 challengeId를 URL에 포함하여 ProofCameraPage로 전달
    navigate(`/proof-camera?challengeId=${challengeId}&userId=${userId}`);
  };

  return (
    <div className="proof-guide-page">
      <div className="header">
        <ArrowLeft size={24} className="back-arrow" onClick={handleBackClick} />
        <h1 className="title">인증 방법</h1>
      </div>
      <div className="content">
        <div className="proof">
          <p className="description" style={{ lineHeight: "1.5" }}>
            {guideText}
          </p>
          <div className="proof-container">
            <div className="image-wrapper">
              <img
                src={wrongGuidePhotoUrl}
                alt="Left image"
                className="proof-image"
              />
              <div className="green-bar">O</div>
            </div>
            <div className="image-wrapper">
              <img
                src={rightGuidePhotoUrl}
                alt="Right image"
                className="proof-image"
              />
              <div className="red-bar">X</div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <button className="guide-confirm-button" onClick={handleStartCamera}>
          확인했어요!
        </button>
      </div>
    </div>
  );
};

export default ProofGuidePage;
