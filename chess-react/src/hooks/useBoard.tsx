import { useState } from "react";
import Piece from "../components/Piece.tsx";

import { GameEngine } from "../services/GameEngine.ts";
import { ChessPiece } from "../models/ChessPiece.ts";
import { Color, GameStatus } from "../types/enums.ts";

const COLUMN_KEYS: Array<string> = ["A", "B", "C", "D", "E", "F", "G", "H"];

export type TileData = {
  tileKey: string;
  piece?: string;
};

export const useBoard = (gameEngine: GameEngine) => {
  const [tiles, setTiles] = useState<TileData[]>([]);
  const [pieceMoving, setPieceMoving] = useState<ChessPiece>();
  const [tileSelected, setTileSelected] = useState<string>("");
  const [playersTurn, setPlayersTurn] = useState<string>(Color.WHITE);
  const [gameStatus, setGameStatus] = useState<GameStatus>(
    GameStatus.GAME_STARTED
  );
  const [piecesTaken, setPiecesTaken] = useState<ChessPiece[]>([]);

  const startNewGame = () => {
    let newTiles: TileData[] = [];

    for (let row = 8; row > 0; row--) {
      COLUMN_KEYS.forEach((colKey) => {
        const tileKey: string = colKey + row;
        let pieceImage: string | undefined;

        if (gameEngine.getPieceAtTile(tileKey)) {
          pieceImage = gameEngine.getPieceAtTile(tileKey)!.getImage();
        }

        newTiles.push({
          tileKey,
          piece: pieceImage,
        });
      });
    }
    resetInternalState();
    setTiles(newTiles);
    setPiecesTaken([]);
    setGameStatus(GameStatus.GAME_STARTED);
  };

  const updateMovingPiece = (tileKey: string) => {
    const piece: ChessPiece | undefined = gameEngine.getPieceAtTile(tileKey);
    setTileSelected(tileKey);

    if (
      pieceMoving === undefined &&
      piece !== undefined &&
      playersTurn !== piece.color
    ) {
      setPieceMoving(undefined);
      return;
    }

    if (pieceMoving === undefined) {
      setPieceMoving(piece);
      return;
    }

    try {
      let lastPosition: string = pieceMoving.position;
      gameEngine.updateGameState(pieceMoving, tileKey);
      updatePiecesTaken();

      updateBoardTiles(lastPosition, tileKey);
    } catch (error) {
      console.log(error.message);
    }
    resetInternalState();
  };

  const updatePiecesTaken = () => {
    setPiecesTaken(gameEngine.getTakenPieces());
  };

  const resetInternalState = () => {
    setPlayersTurn(gameEngine.getWhosTurn());
    setTileSelected("");
    setPieceMoving(undefined);
  };

  const updateBoardTiles = (oldPosition: string, newPosition: string) => {
    const piece: string = tiles.filter((x) => x.tileKey === oldPosition)[0]
      .piece!;

    setTiles((prevTiles): TileData[] =>
      prevTiles.map((tile) => {
        return tile.tileKey === oldPosition || tile.tileKey === newPosition
          ? tile.tileKey === oldPosition
            ? { ...tile, piece: undefined }
            : { ...tile, piece: piece }
          : { ...tile };
      })
    );
  };

  return {
    startNewGame,
    updateBoardTiles,
    tiles,
    updateMovingPiece,
    playersTurn,
    tileSelected,
    gameStatus,
    piecesTaken,
  };
};
