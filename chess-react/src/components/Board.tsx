import React, { useEffect, useState } from "react";
import { GameEngine } from "../services/GameEngine";
import { TileData, useBoard } from "../hooks/useBoard";
import BoardTile from "./BoardTile";
import { ChessPiece } from "../models/ChessPiece";
import Piece from "./Piece";

type BoardProps = {
  engine: GameEngine;
};

const Board: React.FC<BoardProps> = ({ engine }) => {
  const { setUp } = useBoard();
  const [tiles, setTiles] = useState<TileData[]>(setUp(engine));
  const [pieceMoving, setPieceMoving] = useState<ChessPiece>();
  const [isHighlighted, setIsHighlighted] = useState<string[]>([]);
  const [isSelected, setIsSelected] = useState<string>();
  const [tileSelected, setTileSelected] = useState<string>("");

  const handleOnClick = (tileKey: string) => {
    const piece: ChessPiece | undefined = engine.getPieceAtTile(tileKey);
    setTileSelected(tileKey);

    //Scenario: No previously selected piece, we are starting a move
    if (pieceMoving === undefined) {
      setPieceMoving(piece);
      return;
    }
    setPieceMoving(undefined);

    //Scenario: a piece has been selected, we are moving to an empty tile
    if (piece === undefined) {
      // setPieceMoving(undefined);
      if (pieceMoving === undefined) {
        console.log("do nothing");
        return;
      }
      //At this stage, we are not validating if valid move
      let lastPosition: string = pieceMoving.position;
      try {
        engine.movePieceToTile(pieceMoving!, tileKey);
        handlePieceChanges(lastPosition, tileKey);
        setTileSelected("");
      } catch (error) {
        console.log(error);
      }
      return;
    }

    //Scenario: a piece has been selected, we are moving to a tile with a piece
    let lastPosition: string = pieceMoving.position;

    try {
      engine.movePieceToTile(pieceMoving!, tileKey);
      handlePieceChanges(lastPosition, tileKey);
      setTileSelected("");
    } catch (error) {
      console.log(error);
    }

    // engine.movePieceToTile(pieceMoving.position, tileKey);
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

  const handleShowAvailableMoves = () => {
    let availableMoves = engine.getAvailableMoves(tileSelected);
    setIsSelected(tileSelected);
    setIsHighlighted([...availableMoves]);
  };

  useEffect(() => {
    handleShowAvailableMoves();
  }, [tileSelected]);

  return (
    <>
      <header>Players turn: {engine.gameState.whosTurn}</header>
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
