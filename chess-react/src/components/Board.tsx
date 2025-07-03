import React, { useEffect, useState } from "react";
import { GameEngine } from "../services/GameEngine";
import { useBoard } from "../hooks/useBoard";
import BoardTile from "./BoardTile";
import { GameStatus } from "../types/enums";
import { ChessPiece } from "../models/ChessPiece";

type BoardProps = {
  gameEngine: GameEngine;
  updateUserMessage: (gameStatus: GameStatus) => void;
  onPieceTaken: (piecesTaken: ChessPiece[]) => void;
};
const Board: React.FC<BoardProps> = ({
  gameEngine,
  updateUserMessage,
  onPieceTaken,
}) => {
  const {
    startNewGame,
    updateMovingPiece,
    tiles,
    playersTurn,
    tileSelected,
    gameStatus,
    piecesTaken,
  } = useBoard(gameEngine);

  const [isHighlighted, setIsHighlighted] = useState<string[]>([]);
  const [isSelected, setIsSelected] = useState<string>();

  const handleOnClick = (tileKey: string) => {
    updateMovingPiece(tileKey);
  };

  useEffect(() => {
    let availableMoves = gameEngine.getAvailableMoves(tileSelected);
    setIsSelected(tileSelected);
    setIsHighlighted([...availableMoves]);
  }, [tileSelected]);

  useEffect(() => {
    startNewGame();
  }, [gameEngine]);

  useEffect(() => {
    updateUserMessage(gameStatus);
  }, [gameStatus]);

  useEffect(() => {
    onPieceTaken(piecesTaken);
  }, [piecesTaken]);

  return (
    <>
      <header>Players turn: {playersTurn}</header>
      <div className="grid grid-cols-8 gap-x-1">
        {tiles.map((tile) => (
          <BoardTile
            key={tile.tileKey}
            tileKey={tile.tileKey}
            pieceImage={tile.piece}
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
