import React, { useEffect, useState } from "react";
import ArcadeGrid from "../components/ArcadeGrid";
import Navbar from "../components/Navbar";
import "../App.css";

export default function Home() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/games")
      .then(res => res.json())
      .then(data => setGames(data.games || []));
  }, []);

  return (
    <>
      <Navbar />
      <h1 className="neon-title">Arcade Games</h1>
      <ArcadeGrid games={games} />
    </>
  );
}
