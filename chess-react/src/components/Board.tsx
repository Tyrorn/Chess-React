import React, { useEffect, useState } from "react";
import { GameEngine } from "../services/GameEngine";
import { useBoard } from "../hooks/useBoard";
import BoardTile from "./BoardTile";

type BoardProps = {
  gameEngine: GameEngine;
};
const Board: React.FC<BoardProps> = ({ gameEngine }) => {
  const { startNewGame, updateMovingPiece, tiles, playersTurn, tileSelected } =
    useBoard(gameEngine);
  const [isHighlighted, setIsHighlighted] = useState<string[]>([]);
  const [isSelected, setIsSelected] = useState<string>();

  const handleOnClick = (tileKey: string) => {
    updateMovingPiece(tileKey);
  };

  const handleShowAvailableMoves = () => {
    let availableMoves = gameEngine.getAvailableMoves(tileSelected);
    setIsSelected(tileSelected);
    setIsHighlighted([...availableMoves]);
  };

  useEffect(() => {
    handleShowAvailableMoves();
  }, [tileSelected]);

  useEffect(() => {
    startNewGame();
  }, [gameEngine]);

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
