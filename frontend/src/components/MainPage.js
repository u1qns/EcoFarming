import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MainPage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Card from "./Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";

function MainPage() {
  const [challenges, setChallenges] = useState({
    ongoingChallenge: [],
    upcomingChallenge: [],
  });
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await axios.get("/challenges");
        setChallenges(response.data);
        setLoading(false); // 데이터 불러오면 로딩 상태 해제
      } catch (error) {
        console.error("Error fetching challenges:", error);
        setLoading(false); // 오류 발생 시에도 로딩 상태 해제
      }
    };

    fetchChallenges();
  }, []);

  const carouselImages = [
    require("../assets/images/carousel1.png"),
    require("../assets/images/carousel2.png"),
    require("../assets/images/carousel3.png"),
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  // 특정 날짜에서 오늘까지의 차이를 구하는 함수
  const getDaysUntilStart = (startDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const differenceInTime = start.getTime() - today.getTime(); // 시간 차이 계산 (밀리초)
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); // 차이를 일 단위로 변환
    return differenceInDays;
  };

  // 클릭 시 해당 챌린지로 이동할지 결정하는 함수
  const handleCardClick = async (challengeId, userId, thumbPhotoUrl) => {
    try {
      // API 호출 (참가 여부와 상관없이 동일한 API)
      const response = await axios.get(`/challenges/${challengeId}`);
      const challengeData = response.data;

      // API 응답 확인 (디버깅용 로그)
      console.log("Challenge data:", challengeData);

      // 백엔드에서 반환된 데이터 타입을 기반으로 분기 처리
      if (challengeData.type === "ParticipantChallengeResponseDto") {
        // 참가 중인 경우 OngoingChallengePage로 이동
        navigate(`/ongoing-challenge/${challengeId}/${userId}`, {
          state: { thumbPhotoUrl },
        });
      } else if (challengeData.type === "NoParticipantChallengeResponseDto") {
        // 비참가 중인 경우 ChallengePage로 이동
        navigate(`/challenge/${challengeId}/${userId}`, {
          state: { thumbPhotoUrl }, // thumbPhotoUrl 데이터를 전달
        });
      }
    } catch (error) {
      console.error("챌린지 정보를 불러오는 중 오류 발생:", error);
    }
  };

  return (
    <div className="MainPage">
      <Navbar />
      <div className="content">
        {loading ? ( // 로딩 상태일 때 로딩 애니메이션 표시
          <div className="MainPage-loading-container">
            <div className="MainPage-loading-spinner"></div> {/* 로딩 스피너 */}
            <p>챌린지를 불러오는 중...</p>
          </div>
        ) : (
          <>
            <div className="carousel">
              <Slider {...settings}>
                {carouselImages.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`Slide ${index}`}
                      className="carousel-image"
                    />
                  </div>
                ))}
              </Slider>
              <p>우리는 환경 지킴이!</p>
              <h3>에코파밍 챌린지로 지구를 지켜요~🌍💚</h3>
            </div>
            <div className="card-container">
              {challenges.upcomingChallenge.map((challenge) => {
                const daysUntilStart = getDaysUntilStart(challenge.startDate);
                return (
                  <Card
                    key={challenge.challengeId}
                    id={challenge.challengeId}
                    thumbnail={challenge.thumbPhotoUrl}
                    title={challenge.challengeTitle}
                    duration={`${challenge.duration / 7}주 동안`}
                    frequency={`${challenge.frequency}일`}
                    startDate={
                      daysUntilStart > 0
                        ? `${daysUntilStart}일 뒤 시작`
                        : "오늘 시작"
                } // 며칠 뒤에 시작하는지 표시
                    participants={challenge.userCount}
                    onClick={() =>
                      handleCardClick(
                        challenge.challengeId,
                        localStorage.getItem("userId"),
                        challenge.thumbPhotoUrl
                      )
                    }
                  />
                );
              })}
              {challenges.ongoingChallenge.map((challenge) => (
                <Card
                  key={challenge.challengeId}
                  id={challenge.challengeId}
                  thumbnail={challenge.thumbPhotoUrl}
                  title={challenge.challengeTitle}
                  duration={`${challenge.duration / 7}주 동안`}
                  frequency={`${challenge.frequency}일`}
                  startDate={"진행 중"}
                  participants={challenge.userCount}
                  onClick={() =>
                    handleCardClick(
                      challenge.challengeId,
                      localStorage.getItem("userId"),
                      challenge.thumbPhotoUrl
                    )
                  }
                />
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default MainPage;
