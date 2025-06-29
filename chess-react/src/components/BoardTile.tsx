import React from "react";
import Piece from "./Piece";

type BoardTileProps = {
  tileKey: string;
  piece?: React.ReactElement<typeof Piece>;
  onClick: (tileKey: string) => void;
};

const BoardTile: React.FC<BoardTileProps> = ({ tileKey, piece, onClick }) => {
  const handleOnClick = () => {
    onClick(tileKey);
  };
  return (
    <div
      className="w-16 h-16 bg-white border border-black p-4"
      onClick={handleOnClick}
    >
      {piece ?? ""}
    </div>
  );
};

export default BoardTile;
