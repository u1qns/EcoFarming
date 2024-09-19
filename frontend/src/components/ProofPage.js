import "./ProofPage.css";
import ProofNavbar from "./ProofNavbar";
import OngoingChallenge from "./OngoingChallenge";
import UpcomingChallenge from "./UpcomingChallenge";
import Footer from "./Footer";

function ProofPage() {
  return (
    <div className="ProofPage">
      <ProofNavbar />
      <div className="content">
        <div style={{ padding: 15, paddingTop: 0 }}>
          <h3>진행 중 챌린지</h3>
          <OngoingChallenge />
          <OngoingChallenge />
        </div>
        <div style={{ padding: 15, paddingTop: 0 }}>
          <h3>시작 전 챌린지</h3>
          <UpcomingChallenge />
          <UpcomingChallenge />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProofPage;
