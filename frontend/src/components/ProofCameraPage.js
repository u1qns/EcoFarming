import React, { useState, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { uploadProof } from "../services/proofService";
import "./ProofCameraPage.css";

const ProofCameraPage = () => {
  const [capturedImage, setCapturedImage] = useState(null); // 촬영된 이미지 저장
  const [isUploading, setIsUploading] = useState(false);
  const videoRef = useRef(null); // 비디오 참조
  const canvasRef = useRef(null); // 캔버스 참조
  const navigate = useNavigate();
  const location = useLocation();

  // 쿼리 스트링에서 challengeId와 userId 가져오기
  const queryParams = new URLSearchParams(location.search);
  const challengeId = queryParams.get("challengeId");

  // 카메라 시작 함수
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream; // 비디오 요소에 카메라 피드 연결
      }
    } catch (error) {
      console.error("카메라 접근 실패:", error);
    }
  };

  // 페이지가 렌더링되면 카메라 시작
  React.useEffect(() => {
    startCamera();
  }, []);

  // 사진 촬영 함수
  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0); // 비디오 내용을 캔버스에 그리기
      const image = canvasRef.current.toDataURL("image/png"); // 이미지 데이터 추출
      setCapturedImage(image); // 촬영된 이미지 저장
      stopCamera(); // 카메라 종료
    }
  };

  // 카메라 종료 함수
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop()); // 모든 카메라 트랙 중지
      videoRef.current.srcObject = null; // 비디오 소스를 제거
    }
  };

  // 데이터 URL을 File 객체로 변환하는 함수
  const dataURLtoFile = (dataURL, filename) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  // 인증 완료 페이지로 이동 함수
  const handleCompleteVerification = async () => {
    try {
      setIsUploading(true);
      // 업로드 함수 호출
      const filename = "tmp-image-file.png";
      const response = await uploadProof(
        challengeId,
        dataURLtoFile(capturedImage, filename)
      );
      navigate("/proof-result", { state: { response } }); // 인증 완료 페이지로 이동
    } catch (error) {
      console.error("업로드 실패:", error);
    }
  };

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div className="proof-camera-page">
      <div className="header">
        <ArrowLeft size={24} className="back-arrow" onClick={handleBackClick} />
        <h1 className="title">촬영하기</h1>
      </div>
      {!capturedImage && (
        <div style={{ display: "contents" }}>
          <div className="content">
            <video ref={videoRef} autoPlay playsInline></video>
          </div>
          <div className="footer">
            <button className="camera-button" onClick={capturePhoto}>
              촬영
            </button>
          </div>
        </div>
      )}
      {capturedImage && (
        <div style={{ display: "contents" }}>
          <div className="content">
            <img src={capturedImage} alt="Captured" />{" "}
          </div>
          <div className="footer">
            <button
              className="finish-button"
              onClick={ handleCompleteVerification }
              disabled={ isUploading }
            >
              {isUploading ? "업로드 중..." : "업로드"}
              </button>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  );
};

export default ProofCameraPage;
