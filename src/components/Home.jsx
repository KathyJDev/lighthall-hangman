import React, { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase-config.js";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { useNavigate, createSearchParams } from "react-router-dom";

import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  function saveName(event) {
    const { name, value } = event.target;
    setName(value.trim());
  }

  async function handleSetName(e) {
    e.preventDefault();
    if (name.trim().length > 0) {
      console.log(name);
      try {
        const userQuery = query(
          collection(db, "users"),
          where("name", "==", name)
        );
        const userRef = await getDocs(userQuery);
        if (userRef.empty) {
          await addDoc(collection(db, "users"), { name, wins: 0 });
        }
        navigate({
          pathname: "game",
          search: createSearchParams({
            name,
          }).toString(),
        });
      } catch (error) {
        toast.error("Something Went wrong");
      }
    } else {
      toast.error("Name Cannot be empty");
    }
  }

  return (
    <div className="home">
      <h1>Welcome to Hangman!</h1>
      <h2>Enter your name and press Start</h2>
      <form>
        <input
          onChange={saveName}
          autoComplete="off"
          name="name"
          placeholder="Enter your name"
        />
        <br />
        <button type="submit" onClick={handleSetName}>
          Start
        </button>
      </form>
    </div>
  );
};

export default Home;
