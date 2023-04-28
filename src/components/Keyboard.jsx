import React, { useEffect } from "react";

const Keyboard = (props) => {
  const letters = [];

  function generateLetters() {
    const a = 65;
    const z = 91;
    for (let i = a; i < z; i++) {
      letters.push(String.fromCharCode(i).toLowerCase());
    }
  }
  generateLetters();

  return (
    <div className="keyboard">
      {letters.map((letter) => {
        return (
          <button
            onClick={() => {
              props.clicked(letter.charCodeAt(0));
            }}
            className={props.correctLetters.includes(letter) ? "keyboard-btn active" : props.wrongLetters.includes(letter) ? "keyboard-btn inactive" : "keyboard-btn"}
            key={letter}
            name={letter}
            id={letter.charCodeAt(0)}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
};

export default Keyboard;
