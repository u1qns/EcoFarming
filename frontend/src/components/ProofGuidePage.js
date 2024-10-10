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
  }, [challengeId]);

  if (loading)return <div className="proof-guide-page-loading-spinner"></div>; // 로딩 애니메이션 표시
  if (error) return <div>Error: {error}</div>;

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const handleStartCamera = () => {
    navigate(`/proof-camera?challengeId=${challengeId}`);
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
                src={ rightGuidePhotoUrl }
                alt="Left image"
                className="proof-image"
              />
              <div className="green-bar">O</div>
            </div>
            <div className="image-wrapper">
              <img
                src={ wrongGuidePhotoUrl }
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
