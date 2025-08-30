import React from "react";
import GameCard from "./GameCard";
import "./ArcadeGrid.css";

export default function ArcadeGrid({ games }) {
  return (
    <div className="grid">
      {games.map(game => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}