import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import MainPage from "./components/MainPage";
import ChallengePage from "./components/ChallengePage";
import OngoingChallengePage from "./components/OngoingChallengePage";
import ProofPage from "./components/ProofPage";
import MyPage from "./components/MyPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/challenges/:challengeId/:userId"
            element={<ChallengePage />}
          />
          <Route path="/proof" element={<ProofPage />} />
          <Route path="/proof/ongoing" element={<OngoingChallengePage />} />
          <Route path="/users" element={<MyPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
