// import / hooks
import { useCallback, useEffect, useState } from "react";

// import / style
import "./App.css";

// data / words
import { wordsList } from "./data/words";

// import / components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stagesOfTheGame = [
  { stagesId: 1, stageName: "stageStart" },
  { stagesId: 2, stageName: "stageGame" },
  { stagesId: 3, stageName: "stageCover" },
];

const guessesQuantity = 3;

function App() {
  const [gameStage, setGameStage] = useState(stagesOfTheGame[0].stageName);

  const [dataWords] = useState(wordsList);

  const [choosenWord, setChoosenWord] = useState("");
  const [oneRandomCategory, setOneRandomCategory] = useState("");
  const [justLetters, setJustLetters] = useState("");

  const [rightLetters, setRightLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);

  const [guessesTries, setGuessesTries] = useState(guessesQuantity);

  const [playerScore, setPlayerScore] = useState(0);

  const oneRandomCategoryUpperCase =
    oneRandomCategory.charAt(0).toUpperCase() + oneRandomCategory.slice(1);

  const pickWordAndCategory = useCallback(() => {
    const justCategories = Object.keys(dataWords);

    const onlyCategory =
      justCategories[
        Math.floor(Math.random() * Object.keys(justCategories).length)
      ];

    const onlyWord =
      dataWords[onlyCategory][
        Math.floor(Math.random() * dataWords[onlyCategory].length)
      ];

    return { onlyWord, onlyCategory };
  }, [dataWords]);

  const startGame = useCallback(() => {
    clearLetterStates();

    const { onlyWord, onlyCategory } = pickWordAndCategory();

    let arrayOfLetters = onlyWord.split("");

    arrayOfLetters = arrayOfLetters.map((AllLowerCase) =>
      AllLowerCase.toLowerCase()
    );

    setChoosenWord(onlyWord);
    setOneRandomCategory(onlyCategory);
    setJustLetters(arrayOfLetters);
    setGameStage(stagesOfTheGame[1].stageName);
  }, [pickWordAndCategory]);

  const verifyLetter = (verifyProp) => {
    const acceptableLetters = verifyProp.toLowerCase();

    if (
      rightLetters.includes(acceptableLetters) ||
      wrongLetters.includes(acceptableLetters)
    ) {
      return;
    }

    if (justLetters.includes(acceptableLetters)) {
      setRightLetters((currentRightLetters) => [
        ...currentRightLetters,
        acceptableLetters,
      ]);
    } else {
      setWrongLetters((currentWrongLetters) => [
        ...currentWrongLetters,
        acceptableLetters,
      ]);

      setGuessesTries((reducedGuess) => reducedGuess - 1);
    }
  };

  const clearLetterStates = () => {
    setRightLetters([]);
    setWrongLetters([]);
  };

  useEffect(() => {
    if (guessesTries <= 0) {
      clearLetterStates();

      setGameStage(stagesOfTheGame[2].stageName);
    }
  }, [guessesTries]);

  useEffect(() => {
    const uniqueLetters = [...new Set(justLetters)];

    if (
      rightLetters.length === uniqueLetters.length &&
      gameStage === stagesOfTheGame[1].stageName
    ) {
      setPlayerScore((increasePlayerScore) => (increasePlayerScore += 100));
      setPlayerScore((increasePlayerScore) => (increasePlayerScore * 2));

      startGame();
    }

    console.log(uniqueLetters);
  }, [rightLetters, justLetters, startGame, gameStage]);

  const restartGame = () => {
    setPlayerScore(0);
    setGuessesTries(guessesQuantity);
    setGameStage(stagesOfTheGame[0].stageName);
  };

  return (
    <div className="App">
      {gameStage === "stageStart" && <StartScreen propStartGame={startGame} />}
      {gameStage === "stageGame" && (
        <Game
          propVerifyLetter={verifyLetter}
          propChoosenWord={choosenWord}
          propOneRandomCategory={oneRandomCategoryUpperCase}
          propJustLetters={justLetters}
          propRightLetters={rightLetters}
          propWrongLetters={wrongLetters}
          propGuessesTries={guessesTries}
          propPlayerScore={playerScore}
        />
      )}
      {gameStage === "stageCover" && (
        <GameOver propRestartGame={restartGame} propPlayerScore={playerScore} />
      )}
    </div>
  );
}

export default App;
