import "./MainPage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Card from "./Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function MainPage() {
  const cardData = [
    {
      thumbnail: require("../assets/images/c1.jpg"),
      title: "안 쓰는 가전제품 콘센트 빼기",
      duration: "2주 동안",
      frequency: "2일",
      startDate: "오늘부터 시작",
      participants: 26,
    },
    {
      thumbnail: require("../assets/images/c2.jpg"),
      title: "제로 웨이스트 실천하기",
      duration: "2주 동안",
      frequency: "3일",
      startDate: "오늘부터 시작",
      participants: 7,
    },
    {
      thumbnail: require("../assets/images/c3.jpg"),
      title: "카페에서 텀블러 쓰기",
      duration: "2주 동안",
      frequency: "2일",
      startDate: "오늘부터 시작",
      participants: 7,
    },
    {
      thumbnail: require("../assets/images/c4.jpg"),
      title: "오늘하루 | 쓰레기 줍기 실천하기",
      duration: "2주 동안",
      frequency: "3일",
      startDate: "오늘부터 시작",
      participants: 7,
    },
    {
      thumbnail: require("../assets/images/c5.jpg"),
      title: "일회용 빨대 사용 줄이기",
      duration: "4주 동안",
      frequency: "1일",
      startDate: "내일부터 시작",
      participants: 14,
    },
    {
      thumbnail: require("../assets/images/c6.jpg"),
      title: "용기내 챌린지",
      duration: "3주 동안",
      frequency: "매일",
      startDate: "오늘부터 시작",
      participants: 18,
    },
    {
      thumbnail: require("../assets/images/c7.jpg"),
      title: "재활용 분리배출 정확히 하기",
      duration: "1주 동안",
      frequency: "5일",
      startDate: "모레부터 시작",
      participants: 12,
    },
    {
      thumbnail: require("../assets/images/c8.jpg"),
      title: "기후 위기/환경 기사 읽기",
      duration: "2주 동안",
      frequency: "매일",
      startDate: "오늘부터 시작",
      participants: 9,
    },
  ];

  const carouselImages = [
    require("../assets/images/tiniping.jpg"),
    require("../assets/images/tiniping2.jpg"),
    require("../assets/images/tiniping3.jpg"),
    require("../assets/images/tiniping4.jpg"),
  ];
  const settings = {
    dots: true, // 아래에 점을 표시해 이미지 순서를 알려줌
    infinite: true, // 무한 반복
    speed: 500, // 슬라이드 전환 속도
    slidesToShow: 1, // 한 번에 표시할 슬라이드 수
    slidesToScroll: 1, // 한 번에 스크롤될 슬라이드 수
    autoplay: true, // 자동 재생
    autoplaySpeed: 2500, // 자동 재생 속도 (3초)
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
          {cardData.map((card, index) => (
            <Card
              key={index}
              thumbnail={card.thumbnail}
              title={card.title}
              duration={card.duration}
              frequency={card.frequency}
              startDate={card.startDate}
              participants={card.participants}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainPage;
