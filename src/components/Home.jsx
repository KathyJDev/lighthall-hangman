import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  const [name, setName] = useState("");
  const [userWord, setUserWord] = useState("");

  function saveName(event) {
    const { name, value } = event.target;
    setName(value);
  };

  function saveUserWord(event) {
    const { name, value } = event.target;
    setUserWord(value);
  };



  return (
    <div className='home'>
      <h1>Welcome to Hangman!</h1>
      <h2>Enter your name and press Start</h2>
      <input onChange={saveName} autoComplete='off' name='name' placeholder='Enter your name' />
      <button type='button'><Link to='/game'>Start</Link></button>


      <h2>or set a challenge for your friends</h2>
      <input onChange={saveUserWord} autoComplete='off' name='userWord' placeholder='Enter a word' />
      <button><Link to={'/' + userWord}>Set</Link></button>
    </div>
  )
}

export default Home