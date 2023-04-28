import React, { useEffect } from 'react';
import { checkWin } from '../helpers/helpers';
import { db } from '../../firebase-config.js';
import { collection, query, where, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';

const Popup = ({ correctLetters, wrongLetters, selectedWord, setPlayable, playAgain, name, id }) => {
  let finalMessage = '';
  let finalMessageRevealWord = '';
  let playable = true;

  const winningStatus = checkWin(correctLetters, wrongLetters, selectedWord);

  if (correctLetters.length > 0 && winningStatus === 'win') {
    // Update user's wins in the database
    const updateWins = async () => {
      const userQuery = query(collection(db, 'users'), where('name', '==', name));
      const userRef = await getDocs(userQuery);
      const userId = userRef.docs[0].id;
      const userDoc = doc(db, 'users', userId);
      const user = (await getDoc(userDoc)).data();
      await updateDoc(userDoc, { wins: user.wins + 1 });
    }
    updateWins();
  }

  if (correctLetters.length > 0 && winningStatus === 'win') {
    finalMessage = 'Congratulations! You won! 😃';
    playable = false;

  } else if (winningStatus === 'lose') {
    finalMessage = 'Unfortunately you lost. 😕';
    finalMessageRevealWord = `...the word was: ${selectedWord}`;
    playable = false;
  }

  useEffect(() => {
    setPlayable(playable);
  });

  return (
    <div
      className="popup-container"
      style={finalMessage !== "" ? { display: "flex" } : {}}
    >
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        <button onClick={playAgain}>{id ? "Join Us" : "Play Again"}</button>
      </div>
    </div>
  );
};

export default Popup;
