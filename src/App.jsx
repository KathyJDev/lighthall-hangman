import React from "react";
import "./App.css";
import Leaderboard from "./components/Leaderboard";
import Home from "./components/Home";
import Game from "./components/Game";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/game" element={<Game />} />
          <Route path="/game/:id" element={<Game />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
