import "./MainPage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Card from "./Card";

function MainPage() {
  const cardData = [
    { title: "Card 1", content: "This is card 1 content" },
    { title: "Card 2", content: "This is card 2 content" },
    { title: "Card 3", content: "This is card 3 content" },
    { title: "Card 4", content: "This is card 4 content" },
    { title: "Card 5", content: "This is card 5 content" },
    { title: "Card 6", content: "This is card 6 content" },
    { title: "Card 7", content: "This is card 7 content" },
    { title: "Card 8", content: "This is card 8 content" },
    { title: "Card 6", content: "This is card 6 content" },
    { title: "Card 7", content: "This is card 7 content" },
    { title: "Card 8", content: "This is card 8 content" },
  ];

  return (
    <div className="MainPage">
      <Navbar />
      <div className="content">
        하츄핑피리핑핑핑
        <div className="card-container">
          {cardData.map((card, index) => (
            <Card key={index} title={card.title} content={card.content} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainPage;
