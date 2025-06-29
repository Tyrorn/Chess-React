import React from "react";
import { useBoard } from "../hooks/useBoard";
import { GameEngine } from "../services/GameEngine";

type BoardProps = {
  engine: GameEngine;
  onClickTile: (tileKey: string) => void;
};

const Board: React.FC<BoardProps> = ({ engine, onClickTile }) => {
  const { setUp } = useBoard();

  return <div className="grid grid-cols-8">{setUp(engine, onClickTile)}</div>;
};

export default Board;
