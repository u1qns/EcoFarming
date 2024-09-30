import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import MainPage from "./components/MainPage";
import ChallengePage from "./components/ChallengePage";
import OngoingChallengePage from "./components/OngoingChallengePage";
import ProofPage from "./components/ProofPage";
import ProofGuidePage from "./components/ProofGuidePage";
import ProofCameraPage from "./components/ProofCameraPage";
import ProofResultPage from "./components/ProofResultPage";
import MyPage from "./components/MyPage";
import ComplaintPage from "./components/ComplaintPage";
import ParticipantProofStatus from "./components/ParticipantProofStatus";
import PaymentPage from "./components/PaymentPage";
import MyUpcomingChallengePage from "./components/MyUpcomingChallengePage";
import MyOngoingChallengePage from "./components/MyOngoingChallengePage";
import MyCompletedChallengePage from "./components/MyCompletedChallengePage";
import MyComplaintResultPage from "./components/MyComplaintResultPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/challenge/:challengeId/:userId"
            element={<ChallengePage />}
          />
          <Route
            path="/ongoing-challenge/:challengeId/:userId"
            element={<OngoingChallengePage />}
          />

          <Route path="/proof" element={<ProofPage />} />
          <Route path="/proof/ongoing" element={<OngoingChallengePage />} />
          <Route
            path="/proof/:challengeId/guide"
            element={<ProofGuidePage />}
          />
          <Route path="/proof-camera" element={<ProofCameraPage />} />
          <Route path="/proof-result" element={<ProofResultPage />} />

          <Route path="/complaint" element={<ComplaintPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/users" element={<MyPage />} />
          <Route path="/users/upcoming" element={<MyUpcomingChallengePage />} />
          <Route path="/users/ongoing" element={<MyOngoingChallengePage />} />
          <Route
            path="/users/completed"
            element={<MyCompletedChallengePage />}
          />
          <Route
            path="/users/complaint-result"
            element={<MyComplaintResultPage />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
