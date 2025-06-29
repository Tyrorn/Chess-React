import { useEffect, useState } from "react";
import BoardTile from "../components/BoardTile";
import Piece from "../components/Piece.tsx";
import { getImageForPiece } from "../data/pieceImages.ts";
import { pieceMap } from "../data/startingPosition.ts";
import { GameEngine } from "../services/GameEngine.ts";

const COLUMN_KEYS: Array<string> = ["A", "B", "C", "D", "E", "F", "G", "H"];

export type TileData = {
  tileKey: string;
  piece?: React.ReactElement<typeof Piece>;
  isSelected: string;
  isHighlighted: string[];
};

export const useBoard = () => {
  const setUp = (engine: GameEngine) => {
    let newTiles: TileData[] = [];

    for (let row = 8; row > 0; row--) {
      COLUMN_KEYS.forEach((colKey) => {
        const tileKey: string = colKey + row;
        let piece: React.ReactElement<typeof Piece> | undefined;

        if (engine.getPieceAtTile(tileKey)) {
          piece = <Piece image={engine.getPieceAtTile(tileKey)!.getImage()} />;
        }

        newTiles.push({
          tileKey,
          piece: piece,
          isSelected: "",
          isHighlighted: [],
        });
      });
    }
    return newTiles;
  };

  return { setUp };
};
