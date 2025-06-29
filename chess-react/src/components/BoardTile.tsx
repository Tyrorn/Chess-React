import React, { useState } from "react";
import Piece from "./Piece";

type BoardTileProps = {
  tileKey: string;
  isSelected: boolean;
  isHighlighted: boolean;
  piece?: React.ReactElement<typeof Piece>;
  onClick: (tileKey: string) => void;
};

const BoardTile: React.FC<BoardTileProps> = ({
  isHighlighted,
  isSelected,
  tileKey,
  piece,
  onClick,
}) => {
  const handleOnClick = () => {
    onClick(tileKey);
  };
  return (
    <div
      className={`w-16 h-16 bg-white border border-black p-4
    ${isSelected ? "bg-blue-200" : ""}
     ${isHighlighted ? "border-4 border-yellow-400" : ""}

      `}
      onClick={handleOnClick}
    >
      {piece ?? ""}
    </div>
  );
};

export default BoardTile;
//
