import React from 'react';
import './App.css';
import Leaderboard from './components/Leaderboard';
import Home from './components/Home';
import Game from './components/Game';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/leaderboard' element={<Leaderboard />} />
          <Route path='/game' element={<Game />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
