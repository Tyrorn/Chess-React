import { useState } from "react";
import "./App.css";
import Board from "./components/Board.tsx";
import { GameEngine } from "./services/GameEngine.ts";
import Piece from "./components/Piece.tsx";
import { getImageForPiece } from "./data/pieceImages.ts";

function App() {
  let gameEngine: GameEngine = new GameEngine();

  const handleOnClick = (tileKey: string) => {
    if (gameEngine.blackPieces.has(tileKey))
      console.log(gameEngine.blackPieces.get(tileKey));
    if (gameEngine.whitePieces.has(tileKey))
      gameEngine.whitePieces.get(tileKey)?.moveType();
  };

  return <Board engine={gameEngine} onClickTile={handleOnClick} />;
}

export default App;
