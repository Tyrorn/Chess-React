import React, { useEffect, useState } from "react";
import { GameEngine } from "../services/GameEngine";
import { useBoard } from "../hooks/useBoard";
import BoardTile from "./BoardTile";
import { GameStatus } from "../types/enums";

type BoardProps = {
  gameEngine: GameEngine;
  updateUserMessage: (gameStatus: GameStatus) => void;
};
const Board: React.FC<BoardProps> = ({ gameEngine, updateUserMessage }) => {
  const {
    startNewGame,
    updateMovingPiece,
    tiles,
    playersTurn,
    tileSelected,
    gameStatus,
  } = useBoard(gameEngine);
  const [isHighlighted, setIsHighlighted] = useState<string[]>([]);
  const [isSelected, setIsSelected] = useState<string>();

  const handleOnClick = (tileKey: string) => {
    updateMovingPiece(tileKey);
  };

  const updateTileState = () => {
    let availableMoves = gameEngine.getAvailableMoves(tileSelected);
    setIsSelected(tileSelected);
    setIsHighlighted([...availableMoves]);
  };

  useEffect(() => {
    updateTileState();
  }, [tileSelected]);

  useEffect(() => {
    startNewGame();
  }, [gameEngine]);

  useEffect(() => {
    updateUserMessage(gameStatus);
  }, [gameStatus]);

  return (
    <>
      <header>Players turn: {playersTurn}</header>
      <div className="grid grid-cols-8">
        {tiles.map((tile) => (
          <BoardTile
            key={tile.tileKey}
            tileKey={tile.tileKey}
            piece={tile.piece}
            isSelected={tile.tileKey === isSelected}
            isHighlighted={isHighlighted.includes(tile.tileKey)}
            onClick={handleOnClick}
          />
        ))}
      </div>
    </>
  );
};

export default Board;
