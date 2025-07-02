import React, { useEffect, useState } from "react";
import { GameEngine } from "../services/GameEngine";
import { TileData, useBoard } from "../hooks/useBoard";
import BoardTile from "./BoardTile";
import { ChessPiece } from "../models/ChessPiece";
import Piece from "./Piece";
import { Color } from "../types/enums";
import ResetGameButton from "./ResetGame";

const Board: React.FC = () => {
  const [gameEngine, setGameEngine] = useState<GameEngine>(new GameEngine());
  const { resetTiles } = useBoard();
  const [tiles, setTiles] = useState<TileData[]>(resetTiles(gameEngine));
  const [pieceMoving, setPieceMoving] = useState<ChessPiece>();
  const [isHighlighted, setIsHighlighted] = useState<string[]>([]);
  const [isSelected, setIsSelected] = useState<string>();
  const [tileSelected, setTileSelected] = useState<string>("");
  const [playersTurn, setPlayersTurn] = useState<string>(Color.WHITE);

  const handleOnClick = (tileKey: string) => {
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

      handlePieceChanges(lastPosition, tileKey);
    } catch (error) {
      console.log(error.message);
    }
    setPlayersTurn(gameEngine.getWhosTurn());
    setTileSelected("");
    setPieceMoving(undefined);
  };

  const handlePieceChanges = (oldPosition: string, newPosition: string) => {
    const piece: React.ReactElement<typeof Piece> = tiles.filter(
      (x) => x.tileKey === oldPosition
    )[0].piece!;

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

  const resetGame = (): void => {
    setGameEngine(new GameEngine());
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
    setTiles(resetTiles(gameEngine));
    setPlayersTurn(gameEngine.getWhosTurn());
    setTileSelected("");
    setPieceMoving(undefined);
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
      <ResetGameButton onClick={resetGame} />
    </>
  );
};

export default Board;
