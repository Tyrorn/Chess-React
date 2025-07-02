import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board.tsx";
import ResetGameButton from "./components/ResetGame.tsx";
import { GameEngine } from "./services/GameEngine.ts";
import { Color, GameStatus } from "./types/enums.ts";
import BoardTile from "./components/BoardTile.tsx";
import Piece from "./components/Piece.tsx";
import { ChessPiece } from "./models/ChessPiece.ts";

function App() {
  const [gameEngine, setGameEngine] = useState<GameEngine>(new GameEngine());
  const [userMessage, setUserMessage] = useState<GameStatus>();
  const [whitePiecesTaken, setWhitePiecesTaken] = useState<ChessPiece[]>([]);
  const [blackPiecesTaken, setBlackPiecesTaken] = useState<ChessPiece[]>([]);

  const resetGame = (): void => {
    setGameEngine(new GameEngine());
  };

  const handlePieceTaken = (piecesTaken: ChessPiece[]) => {
    setWhitePiecesTaken(
      piecesTaken.filter((piece) => piece.color === Color.WHITE)
    );

    setBlackPiecesTaken(
      piecesTaken.filter((piece) => piece.color === Color.BLACK)
    );
  };

  return (
    <>
      <div>{userMessage}</div>
      <div className="grid [grid-template-columns:10%_80%_10%]">
        <div className="grid grid-cols-2">
          <header>White</header>
          {whitePiecesTaken.map((piece, index) => (
            <BoardTile
              key={index}
              tileKey={index.toString()}
              piece={<Piece image={piece.image} />}
              isSelected={false}
              isHighlighted={false}
            />
          ))}
        </div>

        <div>
          <Board
            gameEngine={gameEngine}
            updateUserMessage={setUserMessage}
            onPieceTaken={handlePieceTaken}
          />
        </div>

        <div className="grid grid-cols-2">
          <div>black</div>
          {blackPiecesTaken.map((piece, index) => (
            <BoardTile
              key={index}
              tileKey={index.toString()}
              piece={<Piece image={piece.image} />}
              isSelected={false}
              isHighlighted={false}
            />
          ))}
        </div>
      </div>
      <ResetGameButton onClick={resetGame} />
    </>
  );
}

export default App;
