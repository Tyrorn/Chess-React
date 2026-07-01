import { ChessPiece } from "lib/models/ChessPiece.ts";
import { GameState } from "lib/services/GameEngine.ts";
import { COLOR, GAME_STATUS, GameStatus } from "lib";
import { useState } from "react";
import Board from "./components/Board.tsx";
import ResetGameButton from "./components/ResetGame.tsx";
import "./App.css";

function App() {
  const [userMessage, setUserMessage] = useState<GameStatus>();
  const [gameState, setGameState] = useState<GameState>({
    whitePieces: new Map(),
    blackPieces: new Map(),
    whosTurn: COLOR.WHITE,
    whitePiecesTaken: [],
    blackPiecesTaken: [],
    status: GAME_STATUS.GAME_STARTED,
  });
  const [whitePiecesTaken, setWhitePiecesTaken] = useState<ChessPiece[]>([]);
  const [blackPiecesTaken, setBlackPiecesTaken] = useState<ChessPiece[]>([]);

  const resetGame = (): void => {
    // setGameEngine(new GameEngine());
    //TODO send request to reset gamestate and update below
    setGameState({
      whitePieces: new Map(),
      blackPieces: new Map(),
      whosTurn: COLOR.WHITE,
      whitePiecesTaken: [],
      blackPiecesTaken: [],
      status: GAME_STATUS.GAME_STARTED,
    });
  };

  const handlePieceTaken = (piecesTaken: ChessPiece[]) => {
    setWhitePiecesTaken(
      piecesTaken.filter((piece) => piece.color === COLOR.WHITE),
    );

    setBlackPiecesTaken(
      piecesTaken.filter((piece) => piece.color === COLOR.BLACK),
    );
  };

  return (
    <>
      <div>{userMessage}</div>
      <div className="grid [grid-template-columns:10%_80%_10%]">
        <div className="grid grid-cols-2">
          <header>White</header>
          {/* {whitePiecesTaken.map((piece, index) => (
            <BoardTile
              key={index}
              tileKey={index.toString()}
              pieceImage={piece.image ? piece.image : ""}
              isSelected={false}
              isHighlighted={false}
            />
          ))} */}
        </div>

        <div>
          <Board
            gameState={gameState}
            updateUserMessage={setUserMessage}
            onPieceTaken={handlePieceTaken}
          />
        </div>

        <div className="grid grid-cols-2">
          <div>black</div>
          {/* {blackPiecesTaken.map((piece, index) => (
            <BoardTile
              key={index}
              tileKey={index.toString()}
              pieceImage={piece.image}
              isSelected={false}
              isHighlighted={false}
            />
          ))} */}
        </div>
      </div>
      <ResetGameButton onClick={resetGame} />
    </>
  );
}

export default App;
