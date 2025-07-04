import React, { useEffect } from "react";
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
  const { updateMovingPiece, tiles, playersTurn, gameStatus, piecesTaken } =
    useBoard(gameEngine);

  const handleOnClick = (tileKey: string) => {
    updateMovingPiece(tileKey);
  };

  useEffect(() => {
    updateUserMessage(gameStatus);
  }, [gameStatus]);

  useEffect(() => {
    onPieceTaken(piecesTaken);
  }, [piecesTaken]);

  return (
    <>
      <header>Players turn: {playersTurn}</header>
      <div className="grid grid-cols-8 ">
        {tiles.map((tile) => (
          <BoardTile
            key={tile.tileKey}
            tileKey={tile.tileKey}
            pieceImage={tile.piece}
            isSelected={tile.isSelected}
            isHighlighted={tile.isHighlighted}
            onClick={handleOnClick}
          />
        ))}
      </div>
    </>
  );
};

export default Board;
