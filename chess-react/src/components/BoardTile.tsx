import React, { useState } from "react";
import Piece from "./Piece";

type BoardTileProps = {
  tileKey: string;
  isSelected: boolean;
  isHighlighted: boolean;
  pieceImage?: string;
  onClick?: (tileKey: string) => void;
};

const BoardTile: React.FC<BoardTileProps> = ({
  isHighlighted,
  isSelected,
  tileKey,
  pieceImage,
  onClick,
}) => {
  const handleOnClick = () => {
    if (onClick) {
      onClick(tileKey);
    }
  };
  return (
    <div
      className={`w-18 h-18 bg-white  border border-black  p-3
    ${isSelected ? "bg-blue-200" : ""}
     ${isHighlighted ? " border-3 border-yellow-400" : ""}

      `}
      onClick={handleOnClick}
    >
      {pieceImage ? <Piece image={pieceImage} /> : ""}
    </div>
  );
};

export default BoardTile;
//
// ${+tileKey.split("")[1] % 2 === 0 ? "bg-white" : "bg-black"}
