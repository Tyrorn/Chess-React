import { ChessPiece } from "lib/models/ChessPiece.ts";
import { GameState } from "lib/services/GameEngine.ts";
import { GameStatus } from "lib/types/enums.ts";
import React, { useEffect } from "react";
import { useBoard } from "../hooks/useBoard.tsx";
import BoardTile from "./BoardTile.tsx";

type BoardProps = {
  gameState: GameState;
  updateUserMessage: (gameStatus: GameStatus) => void;
  onPieceTaken: (piecesTaken: ChessPiece[]) => void;
};
const Board: React.FC<BoardProps> = ({
  gameState,
  updateUserMessage,
  onPieceTaken,
}) => {
  const { updateMovingPiece, tiles, playersTurn, gameStatus, piecesTaken } =
    useBoard(gameState);

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
