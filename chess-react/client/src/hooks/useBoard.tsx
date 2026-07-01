import { ChessPiece } from "lib/models/ChessPiece.ts";
import { GameState } from "lib/services/GameEngine.ts";
import { COLOR, GAME_STATUS, GameStatus } from "lib";
import { useEffect, useRef, useState } from "react";
import SuperJSON from "superjson";

const COLUMN_KEYS: Array<string> = ["A", "B", "C", "D", "E", "F", "G", "H"];

export type TileData = {
  tileKey: string;
  piece?: string;
  isHighlighted: boolean;
  isSelected: boolean;
};

export const useBoard = (gameState: GameState) => {
  const [tiles, setTiles] = useState<TileData[]>([]);
  const [pieceMoving, setPieceMoving] = useState<ChessPiece>();
  const [tileSelected, setTileSelected] = useState<string>("");
  const [playersTurn, setPlayersTurn] = useState<string>(COLOR.WHITE);
  const [gameStatus, setGameStatus] = useState<GameStatus>(
    GAME_STATUS.GAME_STARTED,
  );
  const [piecesTaken, setPiecesTaken] = useState<ChessPiece[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const wsUrl = `ws://localhost:3000/game-ws`;
    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("⚡ WebSocket Handshake Successful");
      setIsReady(true); // Signal that it is safe to interact
    };
    socketRef.current.onmessage = (event) => {
      const message = SuperJSON.parse(event.data);

      switch (message.type) {
        case "ROOM_STATE_UPDATE":
          // 填入: Map the server's snapshot directly to your visual states
          // setBoardLayout(message.payload.yourBoardArray);
          // setCurrentTurn(message.payload.yourTurnVariable);
          console.log("got here", message);
          break;

        case "MOVE_REJECTED":
          alert(`Rejected: ${message.payload.reason}`);
          break;
      }
    };

    socket.onclose = () => {
      console.log("❌ Socket closed");
      setIsReady(false);
    };

    return () => {
      socket.close();
    };
  }, []);

  const startNewGame = async () => {
    let newTiles: TileData[] = [];

    if (!isReady || !socketRef.current) return;

    socketRef.current?.send(
      JSON.stringify({
        type: "START_NEW_GAME",
        payload: {},
      }),
    );

    // for (let row = 8; row > 0; row--) {
    //   COLUMN_KEYS.forEach((colKey) => {
    //     const tileKey: string = colKey + row;
    //     let pieceImage: string | undefined;

    //     if (getPieceAtTile(tileKey)) {
    //       pieceImage = getImageForPiece(getPieceAtTile(tileKey));
    //     }

    //     newTiles.push({
    //       tileKey,
    //       piece: pieceImage,
    //       isHighlighted: false,
    //       isSelected: false,
    //     });
    //   });
    // }
    // resetInternalState();
    // setTiles(newTiles);
    // setPiecesTaken([]);
    // setGameStatus(gameState.status);
  };

  const getPieceAtTile = (tileKey: string): ChessPiece | undefined => {
    if (gameState.blackPieces.has(tileKey))
      return gameState.blackPieces.get(tileKey);
    if (gameState.whitePieces.has(tileKey))
      return gameState.whitePieces.get(tileKey);
    return undefined;
  };

  useEffect(() => {
    startNewGame();
  }, [gameState]);

  const updateMovingPiece = (tileKey: string) => {
    const piece: ChessPiece | undefined = getPieceAtTile(tileKey);
    setTileSelected(tileKey);

    //When selecting a piece that doesn't belong to the current player
    if (
      pieceMoving === undefined &&
      piece !== undefined &&
      playersTurn !== piece.color
    ) {
      setPieceMoving(undefined);
      return;
    }
    //When first selecting your piece, or selecting an empty tile
    if (pieceMoving === undefined) {
      setPieceMoving(piece);
      return;
    }

    //If selecting a different piece of the same color
    if (pieceMoving.color === piece?.color) {
      setPieceMoving(piece);
      return;
    }

    try {
      let lastPosition: string = pieceMoving.position;
      //TODO attempt move piece api request
      // gameEngine.updateGameState(pieceMoving, tileKey);
      updatePiecesTaken();
      setGameStatus(gameState.status);

      updateBoardTiles(lastPosition, tileKey);
    } catch (error) {
      console.log(error.message);
    }
    resetInternalState();
  };

  const updatePiecesTaken = () => {
    //TODO, is in gameState
    // setPiecesTaken(gameEngine.getTakenPieces());
  };

  const resetInternalState = () => {
    setPlayersTurn(gameState.whosTurn);
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
      }),
    );
  };

  // useEffect(() => {
  //   // TODO, not sure if I like tis as a server request but will see
  //   let availableMoves = gameEngine.getAvailableMoves(tileSelected);
  //   setTiles((prevTiles): TileData[] =>
  //     prevTiles.map((tile) => {
  //       return {
  //         ...tile,
  //         isHighlighted: availableMoves.includes(tile.tileKey),
  //         isSelected: tile.tileKey === tileSelected,
  //       };
  //     }),
  //   );
  // }, [tileSelected]);

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
