import React from "react";

// import / style
import "./GameOver.css";

const GameOver = ({ propRestartGame, propPlayerScore }) => {
  return (
    <div>
      <h1>Game Over</h1>
      <h2>
        Your Score: <span>{propPlayerScore}</span>
      </h2>
      <button onClick={propRestartGame}>Restart Game</button>
    </div>
  );
};

export default GameOver;
