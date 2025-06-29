import React, { useEffect, useState } from "react";
import { GameEngine } from "../services/GameEngine";
import { TileData, useBoard } from "../hooks/useBoard";
import BoardTile from "./BoardTile";
import Piece from "./Piece";

type BoardProps = {
  engine: GameEngine;
};

const Board: React.FC<BoardProps> = ({ engine }) => {
  const { setUp } = useBoard();
  const [tiles, setTiles] = useState<TileData[]>(setUp(engine));

  const handleOnClick = (tileKey: string) => {
    let availableMoves = engine.getAvailableMoves(tileKey);

    setTiles((prevTiles): TileData[] =>
      prevTiles.map((tile) =>
        tile.tileKey === tileKey
          ? { ...tile, isSelected: tileKey, isHighlighted: [] }
          : { ...tile, isSelected: "", isHighlighted: [...availableMoves] }
      )
    );
  };

  return (
    <div className="grid grid-cols-8">
      {tiles.map((tile) => (
        <BoardTile
          key={tile.tileKey}
          tileKey={tile.tileKey}
          piece={tile.piece}
          isSelected={tile.isSelected === tile.tileKey}
          isHighlighted={tile.isHighlighted.includes(tile.tileKey)}
          onClick={handleOnClick}
        />
      ))}
    </div>
  );
};

export default Board;
