import React from "react";
import { useNavigate } from "react-router-dom";
import "./GameCard.css";

export default function GameCard({ game }) {
  const navigate = useNavigate();
  return (
    <div className="card" onClick={() => navigate(`/games/${game.id}`)}>
      <img src={game.thumbnail} alt={game.title} />
      <h3>{game.title}</h3>
      <p>Tags: {game.tags}</p>
    </div>
  );
}
