import React, { useEffect } from 'react'

const Keyboard = (props) => {
  const letters = [];

  function generateLetters() {
    const a = 65;
    const z = 91;
    for (let i = a; i < z; i++) {
      letters.push((String.fromCharCode(i)).toLowerCase());
    }
  }
  generateLetters();

  return (
    <div className='keyboard'>
      {letters.map((letter, index) => {
        return <button onClick={(letter) => { props.clicked(letter) }} className='keyboard-btn' name={letter} value={letter}>{letter}</button>
      })}
    </div>
  )
}

export default Keyboard;