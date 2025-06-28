import React from "react";

const Board: React.FC = () => {
  const squares: React.ReactNode[] = [];
  const colKeys: Array<string> = ["A", "B", "C", "D", "E", "F", "G", "H"];

  for (let row = 8; row > -1; row--) {
    colKeys.forEach((colKey) => {
      squares.push(
        <div
          key={colKey + row}
          className="w-16 h-16 bg-white border border-black p-4"
        >
          {colKey + row}
        </div>
      );
    });
  }

  return <div className="grid grid-cols-8">{squares}</div>;
};

export default Board;
