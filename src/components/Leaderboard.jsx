import React from 'react'
import { Link } from 'react-router-dom';

const Leaderboard = () => {
  return (
    <div className='leaderboard'>
      <h1>Leaderboard</h1>
      <div className='leaderboard-container'>
        <div><h2>Name</h2>
        </div>
        <div><h2>Wins</h2>
        </div>
      </div>
      <button><Link to='/'>Back to Homepage</Link></button>
    </div>
  )
}

export default Leaderboard;