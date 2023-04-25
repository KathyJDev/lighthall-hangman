import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Modal = (props) => {
  const [userWord, setUserWord] = useState("");
  const [challengeButton, setChallengeButton] = useState(false);

  function saveUserWord(event) {
    const { value } = event.target;
    setUserWord(value.toLowerCase());
  };

  function challengeButtonHandler() {
    setChallengeButton(!challengeButton);
  };

  return (
    <div id="myModal" class="modal">
      <div class="modal-content" >
        <span onClick={() => {
          props.onClose();
          setChallengeButton(false);
        }} class="close">&times;</span>
        <div className={challengeButton === true && "hidden"}>
          <h2>Set a challenge for your friends</h2>
          <input onChange={saveUserWord} autoComplete='off' name='userWord' placeholder='Enter a word' />
          <button onClick={challengeButtonHandler}>Set</button>
        </div>

        <div className={challengeButton === false && "hidden"}>
          <h1>Copy this link and share with your friends</h1>
          <p>{"http://localhost:5173/game/" + userWord}</p>
        </div>
      </div>



    </div>
  )
}

export default Modal