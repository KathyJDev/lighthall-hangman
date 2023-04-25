import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { db } from '../../firebase-config.js';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';


const Home = () => {
  const [name, setName] = useState("");

  function saveName(event) {
    const { name, value } = event.target;
    setName(value);
  };

  async function handleSetName() {
    if (name) {
      const userQuery = query(collection(db, 'users'), where('name', '==', name));
      const userRef = await getDocs(userQuery);
      if (userRef.empty) {
        await addDoc(collection(db, 'users'), { name, wins: 0})
      }
    }
  }

  return (
    <div className='home'>
      <h1>Welcome to Hangman!</h1>
      <h2>Enter your name and press Start</h2>
      <input onChange={saveName} autoComplete='off' name='name' placeholder='Enter your name' />
      <button type='button' onClick={handleSetName}><Link to='/game'>Start</Link></button>

    </div>
  )
}

export default Home