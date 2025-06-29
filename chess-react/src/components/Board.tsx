import React from "react";
import { useBoard } from "../hooks/useBoard";

const Board: React.FC = () => {
  const { setUp } = useBoard();

  return <div className="grid grid-cols-8">{setUp()}</div>;
};

export default Board;
