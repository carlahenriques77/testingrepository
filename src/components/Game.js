// import / hooks
import { useState, useRef } from "react";

// import / style
import "./Game.css";

const Game = ({
  propVerifyLetter,
  propChoosenWord,
  propOneRandomCategory,
  propJustLetters,
  propRightLetters,
  propWrongLetters,
  propGuessesTries,
  propPlayerScore,
}) => {
  const [gameLetter, setGameLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (stopReload) => {
    stopReload.preventDefault();

    propVerifyLetter(gameLetter);

    setGameLetter("");

    letterInputRef.current.focus();
  };

  const cheatingButton = (cheatingParameter) => {
    cheatingParameter.currentTarget.classList.toggle("showWord");
  };

  return (
    <div className="styleGame">
      <div className="cheatingbutton" onClick={cheatingButton}>
        <p className="hiddenword">{propChoosenWord}</p>
      </div>
      <span className="hintspan">Click above to Show the Word</span>

      <p className="styleScore">
        <span>Score: {propPlayerScore}</span>
      </p>

      <h1>Guess the Word</h1>

      <h3 className="styleTip">
        Category of the Word: <span>{propOneRandomCategory}</span>
      </h3>

      <p>You still have {propGuessesTries} Chance(s) to Guess.</p>

      <ul className="wordContainer">
        {propJustLetters.map((rightLetterSquare, uniqueShowKey) =>
          propRightLetters.includes(rightLetterSquare) ? (
            <li key={uniqueShowKey} className="styleLetter">
              {rightLetterSquare}
            </li>
          ) : (
            <li key={uniqueShowKey} className="styleBlankSquare"></li>
          )
        )}
      </ul>

      <div className="letterContainer">
        <p>Try to Guess a Letter of the Word</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letterInput"
            maxLength={1}
            required
            onChange={(changeEventE) =>
              setGameLetter(changeEventE.target.value)
            }
            value={gameLetter}
            ref={letterInputRef}
          />
          <button>Confirm!</button>
        </form>
      </div>

      <div className="wrongLettersContainer">
        <p>Wrong Letters:</p>
        <ul className="wrongLetterSquare">
          {propWrongLetters.map((showWrongLetters, uniqueWrongKey) => (
            <li key={uniqueWrongKey} className="styleWrongLetter">
              {showWrongLetters}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Game;
