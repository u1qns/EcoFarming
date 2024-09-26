import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./MainPage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Card from "./Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from 'axios';

function MainPage() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [challenges, setChallenges] = useState({ ongoingChallenge: [], upcomingChallenge: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await axios.get(`${apiUrl}/challenges`);
        setChallenges(response.data);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    };

    fetchChallenges();
  }, []);

  const carouselImages = [
    require("../assets/images/subinPing.png"),
    require("../assets/images/tiniping.jpg"),
    require("../assets/images/tiniping2.jpg"),
    require("../assets/images/tiniping3.jpg"),
    require("../assets/images/tiniping4.jpg"),
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

  // 클릭 시 해당 챌린지로 이동할지 결정하는 함수
  const handleCardClick = async (challengeId, userId) => {
    try {
      // API 호출 (참가 여부와 상관없이 동일한 API)
      const response = await axios.get(`${apiUrl}/challenges/${challengeId}/${userId}`);
      const challengeData = response.data;

      // API 응답 확인 (디버깅용 로그)
      console.log('Challenge data:', challengeData);

      // 백엔드에서 반환된 데이터 타입을 기반으로 분기 처리
      if (challengeData.type === "ParticipantChallengeResponseDto") {
        // 참가 중인 경우 OngoingChallengePage로 이동
        navigate(`/ongoing-challenge/${challengeId}/${userId}`);
      } else if (challengeData.type === "NoParticipantChallengeResponseDto") {
        // 비참가 중인 경우 ChallengePage로 이동
        navigate(`/challenge/${challengeId}/${userId}`);
      }
    } catch (error) {
      console.error('챌린지 정보를 불러오는 중 오류 발생:', error);
    }
  };

  return (
    <div className="MainPage">
      <Navbar />
      <div className="content">
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
          <p>나는야 에코핑!</p>
          <h3>에코파밍 챌린지로 환경을 지켜chu~💕</h3>
        </div>
        <div className="card-container">
          {challenges.upcomingChallenge.map((challenge) => (
            <Card
              key={challenge.challengeId}
              id={challenge.challengeId}
              thumbnail={challenge.thumbPhotoUrl}
              title={challenge.challengeTitle}
              duration={`${challenge.duration / 7}주 동안`}
              frequency={`${challenge.frequency}일`}
              startDate={`${new Date(challenge.startDate).toLocaleDateString()} 시작`}
              participants={challenge.userCount}
              onClick={() => handleCardClick(challenge.challengeId, 1)} //TODO : userId
            />
          ))}
          {challenges.ongoingChallenge.map((challenge) => (
            <Card
              key={challenge.challengeId}
              id={challenge.challengeId}
              thumbnail={challenge.thumbPhotoUrl}
              title={challenge.challengeTitle}
              duration={`${challenge.duration / 7}주 동안`}
              frequency={`${challenge.frequency}일`}
              //startDate={`${new Date(challenge.startDate).toLocaleDateString()} 시작`}
              startDate={"진행 중"}
              participants={challenge.userCount}
              onClick={() => handleCardClick(challenge.challengeId, 1)} //TODO : userId
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainPage;