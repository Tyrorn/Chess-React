import React from "react";
import Piece from "./Piece";

type BoardTileProps = {
  piece?: React.ReactElement<typeof Piece>;
};

const BoardTile: React.FC<BoardTileProps> = ({ piece }) => {
  return (
    <div className="w-16 h-16 bg-white border border-black p-4">
      {piece ?? ""}
    </div>
  );
};

export default BoardTile;
