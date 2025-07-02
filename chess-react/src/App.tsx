import { useState } from "react";
import "./App.css";
import Board from "./components/Board.tsx";
import ResetGameButton from "./components/ResetGame.tsx";
import { GameEngine } from "./services/GameEngine.ts";

function App() {
  const [gameEngine, setGameEngine] = useState<GameEngine>(new GameEngine());

  const resetGame = (): void => {
    setGameEngine(new GameEngine());
  };

  return (
    <>
      <Board gameEngine={gameEngine} />
      <ResetGameButton onClick={resetGame} />
    </>
  );
}

export default App;
