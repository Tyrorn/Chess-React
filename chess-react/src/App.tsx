import "./App.css";
import Board from "./components/Board.tsx";
import { GameEngine } from "./services/GameEngine.ts";

function App() {
  let gameEngine: GameEngine = new GameEngine();

  return <Board engine={gameEngine} />;
}

export default App;
