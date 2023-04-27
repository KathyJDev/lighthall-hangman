import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase-config.js";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { useLocation } from "react-router-dom";
const Leaderboard = (props) => {
  const location = useLocation();
  const state = location.state;
  // console.log(state);
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    async function fetchLeaderboardData() {
      const leaderboardCollection = collection(db, "users");
      const leaderboardQuery = query(
        leaderboardCollection,
        orderBy("wins", "desc"),
        limit(10)
      );
      const leaderboardSnapshot = await getDocs(leaderboardQuery);

      const leaderboardData = leaderboardSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLeaderboardData(leaderboardData);
    }

    fetchLeaderboardData();
  }, []);

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <div className="leaderboard-container">
        <div>
          <h2>Name</h2>
        </div>
        <div>
          <h2>Wins</h2>
        </div>
      </div>
      {leaderboardData.map((user) => (
        <div className="leaderboard-container" key={user.id}>
          <div>{user.name}</div>
          <div>{user.wins}</div>
        </div>
      ))}
      <button>
        <Link to={`/game?name=${state.name}`}>Back to Game</Link>
      </button>
    </div>
  );
};

export default Leaderboard;
