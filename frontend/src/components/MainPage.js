import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
            <Link to={`/challenge/${challenge.challengeId}/1`} key={challenge.challengeId}> {/* userId는 1로 가정 */}
            <Card
              key={challenge.challengeId}
              id={challenge.challengeId}
              thumbnail={challenge.thumbPhotoUrl}
              title={challenge.challengeTitle}
              duration={`${challenge.duration / 7}주 동안`}
              frequency={`${challenge.frequency}일`}
              startDate={`${new Date(challenge.startDate).toLocaleDateString()} 시작`}
              participants={challenge.userCount}
            />
            </Link>
          ))}
          {challenges.ongoingChallenge.map((challenge) => (
            <Link to={`/challenge/${challenge.challengeId}/1`} key={challenge.challengeId}> {/* userId는 1로 가정 */}
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
            />
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainPage;