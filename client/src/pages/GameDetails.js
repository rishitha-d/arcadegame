import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ReviewSection from "../components/ReviewSection";

export default function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/games/${id}`)
      .then(res => res.json())
      .then(data => setGame(data.game));
  }, [id]);

  if (!game) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <h2>{game.title}</h2>
      <img src={game.thumbnail} alt={game.title} style={{ maxWidth: 300 }} />
      <iframe src={game.embedurl} title={game.title} width="800" height="600" style={{ border: "3px solid #39ff14", borderRadius: 10, margin: 20 }} />
      <ReviewSection gameId={id} />
    </>
  );
}