import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase-config.js';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    async function fetchLeaderboardData() {
      const leaderboardCollection = collection(db, 'users');
      const leaderboardQuery = query(leaderboardCollection, orderBy('wins', 'desc'), limit(10));
      const leaderboardSnapshot = await getDocs(leaderboardQuery);

      const leaderboardData = leaderboardSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setLeaderboardData(leaderboardData);
    }

    fetchLeaderboardData();
  }, []);

  return (
    <div className='leaderboard'>
      <h1>Leaderboard</h1>
      <div className='leaderboard-container'>
        <div><h2>Name</h2></div>
        <div><h2>Wins</h2></div>
      </div>
      {leaderboardData.map((user, index) => (
      <div className='leaderboard-container' key={user.id}>
      <div>{index + 1}. {user.name}</div>
      <div>{user.wins}</div>
      </div>
      ))}
      <button><Link to='/'>Back to Homepage</Link></button>
    </div>
  );
}

export default Leaderboard;
