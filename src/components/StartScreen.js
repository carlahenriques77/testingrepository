// import / style
import "./StartScreen.css";

const StartScreen = ({ propStartGame }) => {
  return (
    <div className="styleStart">
      <h1>Secret Love</h1>
      <p>Click Below to Start Playing</p>
      <button onClick={propStartGame}>Start the Game</button>
      {/* When the Button is Clicked, it will "Change the Stage of the Game / Page" to the "Game Stage" page */}
    </div>
  );
};

export default StartScreen;
