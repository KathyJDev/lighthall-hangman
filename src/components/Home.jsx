import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  const [name, setName] = useState("");


  function saveName(event) {
    const { name, value } = event.target;
    setName(value);
  };


  return (
    <div className='home'>
      <h1>Welcome to Hangman!</h1>
      <h2>Enter your name and press Start</h2>
      <input onChange={saveName} autoComplete='off' name='name' placeholder='Enter your name' />
      <button type='button'><Link to='/game'>Start</Link></button>

    </div>
  )
}

export default Home