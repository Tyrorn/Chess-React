import React from "react";
import { useBoard } from "../hooks/useBoard";
import { GameEngine } from "../services/GameEngine";

type BoardProps = {
  engine: GameEngine;
};

const Board: React.FC<BoardProps> = ({ engine }) => {
  const { setUp } = useBoard();

  return <div className="grid grid-cols-8">{setUp(engine)}</div>;
};

export default Board;
