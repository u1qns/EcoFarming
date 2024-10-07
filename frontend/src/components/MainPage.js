function MainPage() {
  const [challenges, setChallenges] = useState({ ongoingChallenge: [], upcomingChallenge: [] });
  const navigate = useNavigate();

  // 로컬스토리지에서 userId를 가져오기
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await axios.get('/challenges');
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

  const getDaysUntilStart = (startDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const differenceInTime = start.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };

  const handleCardClick = async (challengeId, userId, thumbPhotoUrl) => {
    try {
      const response = await axios.get(`/challenges/${challengeId}`);
      const challengeData = response.data;

      console.log('Challenge data:', challengeData);

      if (challengeData.type === "ParticipantChallengeResponseDto") {
        navigate(`/ongoing-challenge/${challengeId}/${userId}`, {
          state: { thumbPhotoUrl },
        });
      } else if (challengeData.type === "NoParticipantChallengeResponseDto") {
        navigate(`/challenge/${challengeId}/${userId}`, {
          state: { thumbPhotoUrl },
        });
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
                startDate={daysUntilStart > 0
                  ? `${daysUntilStart}일 뒤 시작`
                  : "오늘 시작"}
                participants={challenge.userCount}
                onClick={() => handleCardClick(challenge.challengeId, userId, challenge.thumbPhotoUrl)} // userId 적용
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
              onClick={() => handleCardClick(challenge.challengeId, userId, challenge.thumbPhotoUrl)} // userId 적용
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainPage;
