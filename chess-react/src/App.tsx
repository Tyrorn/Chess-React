import { useState } from "react";
import "./App.css";
import Board from "./components/Board.tsx";
import ResetGameButton from "./components/ResetGame.tsx";
import { GameEngine } from "./services/GameEngine.ts";
import { GameStatus } from "./types/enums.ts";

function App() {
  const [gameEngine, setGameEngine] = useState<GameEngine>(new GameEngine());
  const [userMessage, setUserMessage] = useState<GameStatus>();

  const resetGame = (): void => {
    setGameEngine(new GameEngine());
  };

  return (
    <>
      <div>{userMessage}</div>
      {/* <div>{userMessage === GameStatus.ONGOING ? "" : userMessage}</div> */}
      <Board gameEngine={gameEngine} updateUserMessage={setUserMessage} />
      <ResetGameButton onClick={resetGame} />
    </>
  );
}

export default App;
