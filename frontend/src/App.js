import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import MainPage from "./components/MainPage";
import ChallengePage from "./components/ChallengePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/challenge/:id" element={<ChallengePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
