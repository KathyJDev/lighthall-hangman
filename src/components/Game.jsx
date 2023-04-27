import React, { useState, useEffect } from "react";
import Header from "./Header";
import Figure from "./Figure";
import WrongLetters from "./WrongLetters";
import Word from "./Word";
import Popup from "./Popup";
import Notification from "./Notification";
import { showNotification as show, checkWin } from "../helpers/helpers";
import Keyboard from "./Keyboard";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { db } from "../../firebase-config.js";
import { doc, getDoc } from "firebase/firestore";
import Modal from "./Modal";
import { toast } from "react-toastify";

const words = ["monitor", "program", "application", "keyboard", "javascript", "gaming", "network", "interface", "wizard", "server", "database", "algorithm", "debug", "cache", "firewall", "router", "cyberspace", "bandwidth", "code", "encryption", "hacker", "malware", "metadata", "protocol", "serverless", "spam", "telemetry", "upload", "virtualization", "wiki"]

const hints = {
  monitor: "a device for displaying visual output from a computer",
  program: "a set of instructions that a computer follows to perform a task",
  application: "a computer program designed for a specific purpose",
  keyboard: "an input device used to enter text and commands into a computer",
  javascript: "a programming language used to create interactive effects on websites",
  gaming: "the activity of playing video games",
  network: "a group of interconnected computers or devices",
  interface: "a point of interaction between a computer system and a user",
  wizard: "a software tool that guides users through a complex process",
  server: "a computer or system that provides resources or services to other computers or devices",
  database: "a collection of data that is organized for easy access, retrieval, and management",
  algorithm: "a set of steps or rules used to solve a problem or perform a task",
  debug: "the process of finding and fixing errors or problems in computer code",
  cache: "a component that stores data so that future requests for that data can be served faster",
  firewall: "a security system that monitors and controls incoming and outgoing network traffic",
  router: "a networking device that forwards data packets between computer networks",
  cyberspace: "the virtual environment created by computer systems and networks",
  bandwidth: "the maximum amount of data that can be transmitted over a network or internet connection",
  code: "a set of instructions or statements in a computer program",
  encryption: "the process of converting information or data into a code to prevent unauthorized access",
  hacker: "a person who uses computer systems to gain unauthorized access to data",
  malware: "software that is designed to harm computer systems or data",
  metadata: "information about other data, such as the format, author, or creation date",
  protocol: "a set of rules for communicating data between computer systems",
  serverless: "a model of computing where a third-party provider manages server infrastructure",
  spam: "unwanted or unsolicited email messages",
  telemetry: "the process of collecting and transmitting data from remote devices",
  upload: "the process of transferring data from a local computer to a remote computer or server",
  virtualization: "the creation of a virtual version of something, such as a computer system or network",
  wiki: "a collaborative website that allows users to contribute and edit content"
};
//let selectedWord = words[Math.floor(Math.random() * words.length)];

const Game = () => {
  // for modal
  const [isOpened, setIsOpened] = useState(false);

  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedWord, setSelectedWord] = useState("");

  // fetch name for leaderboard update
  const location = useLocation();
  const name = new URLSearchParams(location.search).get("name");

  const { id } = useParams();

  useEffect(() => {
    const fetchUserWord = async () => {
      if (id) {
        const wordRef = doc(db, "custom-words", id);
        const wordDoc = await getDoc(wordRef);
        setSelectedWord(wordDoc.data().word);
        console.log(selectedWord, wordDoc.data());
        console.log(selectedWord);
        // if (wordDoc.exists()) {
        //   setSelectedWord(wordDoc.data().word);
        // }
      } else {
        setSelectedWord(words[Math.floor(Math.random() * words.length)]);
      }
    };

    fetchUserWord();
  }, [id]);
  const navigate = useNavigate();
  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    };
    if (isOpened === false) {
      window.addEventListener("keydown", handleKeydown);
    }

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    if (id) {
      navigate("/");
    }
    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    setSelectedWord(words[random]);
  }

  function toggleModal() {
    setIsOpened(!isOpened);
  }

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>

      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
        name={name}
        id={id}
      />
      <Notification showNotification={showNotification} />
      {id ? (
        ""
      ) : (
        <>
          <div style={{ display: "flex", gap: "20px" }}>
            <button>
              <Link
                to="/leaderboard"
                state={{
                  name,
                }}
              >
                View Leaderboard
              </Link>
            </button>
            <button onClick={toggleModal}>Challenge a Friend!</button>
          </div>
          <button onClick={() => {
            toast.info(hints[selectedWord]);
          }}>Hint</button>

          <div style={{ display: isOpened === false && "none" }}>
            <Modal onClose={toggleModal} />
          </div>
        </>
      )}
    </>
  );
};

export default Game;
