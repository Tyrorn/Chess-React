import { useState } from "react";
import BoardTile from "../components/BoardTile";
import Piece from "../components/Piece.tsx";
import { getImageForPiece } from "../data/pieceImages.ts";
import { pieceMap } from "../data/startingPosition.ts";
import { GameEngine } from "../services/GameEngine.ts";

const colKeys: Array<string> = ["A", "B", "C", "D", "E", "F", "G", "H"];

export const useBoard = () => {
  const [gameState, setGameState] = useState<Array<typeof BoardTile>>([]);

  const setUp = (engine: GameEngine) => {
    const squares: React.ReactNode[] = [];

    for (let row = 8; row > 0; row--) {
      colKeys.forEach((colKey) => {
        const tileKey = colKey + row;
        let piece: React.ReactElement<typeof Piece> | undefined;

        //if piece exists in the game engine state, create a piece component to display in board tile
        const pieceRef: string = pieceMap.get(colKey + row) ?? "";
        if (engine.blackPieces.get(tileKey))
          piece = <Piece image={getImageForPiece(pieceRef)} />;
        if (engine.whitePieces.get(tileKey))
          piece = <Piece image={getImageForPiece(pieceRef)} />;

        squares.push(<BoardTile key={colKey + row} piece={piece} />);
      });
    }
    return squares;
  };

  return { setUp };
};
