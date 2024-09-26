import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import MainPage from "./components/MainPage";
import ChallengePage from "./components/ChallengePage";
import OngoingChallengePage from "./components/OngoingChallengePage";
import ProofPage from "./components/ProofPage";
import MyPage from "./components/MyPage";
import ComplaintPage from "./components/ComplaintPage";
import ParticipantProofStatus from "./components/ParticipantProofStatus";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/challenge/:challengeId/:userId" element={<ChallengePage />} />
          <Route path="/ongoing-challenge/:challengeId/:userId" element={<OngoingChallengePage />} />

          <Route path="/proof" element={<ProofPage />} />
          <Route path="/proof/ongoing" element={<OngoingChallengePage />} />

          <Route path="/complaint" element={<ComplaintPage />} />

          <Route path="/users" element={<MyPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
