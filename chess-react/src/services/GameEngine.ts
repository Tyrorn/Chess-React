import { pieceMap } from "../data/startingPosition";
import { ChessPiece } from "../models/ChessPiece";
import { Color, GameStatus, PieceType } from "../types/enums";
import { PieceFactory } from "../factories/PieceFactory";

export type GameState = {
  whitePieces: Map<string, ChessPiece>;
  blackPieces: Map<string, ChessPiece>;
  whosTurn: Color;
  whitePiecesTaken: ChessPiece[];
  blackPiecesTaken: ChessPiece[];
};

export class GameEngine {
  gameState: GameState;
  gameStatus: GameStatus;

  constructor() {
    this.gameState = {
      whitePieces: new Map(),
      blackPieces: new Map(),
      whosTurn: Color.WHITE,
      whitePiecesTaken: [],
      blackPiecesTaken: [],
    };
    this.gameStatus = GameStatus.GAME_STARTED;

    this._setUpPiecesState();
  }

  private _setUpPiecesState() {
    const pieceFactory = PieceFactory();
    pieceMap.forEach((value, key) => {
      const position = key;
      const color: Color = value.split(" - ")[0] as Color;
      const pieceType: PieceType = value.split(" - ")[1] as PieceType;
      const newPiece: ChessPiece = pieceFactory.create(
        pieceType,
        color,
        position
      );

      color === Color.WHITE
        ? this.gameState.whitePieces.set(position, newPiece)
        : this.gameState.blackPieces.set(position, newPiece);
    });
  }

  public getTakenPieces(): ChessPiece[] {
    return this.gameState.blackPiecesTaken.concat(
      this.gameState.whitePiecesTaken
    );
  }

  protected movePieceToTile(piece: ChessPiece, newPosition: string) {
    if (!this.isValidMove(piece, newPosition)) {
      throw new Error("Move is invalid");
    }
    this.updatePiecePosition(piece, newPosition);
  }

  protected updatePiecePosition(piece: ChessPiece, newPosition: string) {
    const pieceAtNewPosition: ChessPiece | undefined =
      this.getPieceAtTile(newPosition);

    if (pieceAtNewPosition) {
      this.takeEnemyPiece(newPosition);
    }
    this.setPieceInNewLocation(piece, newPosition);
  }

  protected takeEnemyPiece(position: string) {
    //Permanently remove enemy piece
    if (
      this.gameState.whosTurn === Color.WHITE &&
      this.gameState.blackPieces.has(position)
    ) {
      this.gameState.blackPiecesTaken.push(
        this.gameState.blackPieces.get(position)!
      );
      this.gameState.blackPieces.delete(position);
    }

    if (
      this.gameState.whosTurn === Color.BLACK &&
      this.gameState.whitePieces.has(position)
    ) {
      this.gameState.whitePiecesTaken.push(
        this.gameState.whitePieces.get(position)!
      );
      this.gameState.whitePieces.delete(position);
    }
  }

  protected setPieceInNewLocation(piece: ChessPiece, newPosition: string) {
    //Temporarily remove piece
    this.gameState.whosTurn === Color.WHITE
      ? this.gameState.whitePieces.delete(piece.position)
      : this.gameState.blackPieces.delete(piece.position);

    //Set piece in new location
    piece.setPosition(newPosition);
    this.gameState.whosTurn === Color.WHITE
      ? this.gameState.whitePieces.set(newPosition, piece)
      : this.gameState.blackPieces.set(newPosition, piece);
  }

  protected isValidMove(piece: ChessPiece, newPosition: string): boolean {
    return this._getAvailableMoves(piece.position).includes(newPosition);
  }

  public getAvailableMoves(tileKey: string): string[] {
    return this._getAvailableMoves(tileKey);
  }

  protected _getAvailableMoves(tileKey: string): string[] {
    let playersPieces: Map<string, ChessPiece>;
    playersPieces =
      this.gameState.whosTurn === Color.WHITE
        ? this.gameState.whitePieces
        : this.gameState.blackPieces;

    if (!playersPieces.has(tileKey)) {
      return [];
    }
    return playersPieces.get(tileKey)?.getAvailableMoves(this.gameState) || [];
  }

  protected isCurrentPlayerInCheck(): boolean {
    if (this.gameState.whosTurn === Color.WHITE) {
      const whiteKing = this.getWhiteKing();
      const blackMoves = this.getAllBlackMoves();

      return blackMoves.includes(whiteKing.position);
    }

    const blackKing = this.getBlackKing();
    const whiteMoves = this.getAllWhiteMoves();

    return whiteMoves.includes(blackKing.position);
  }

  protected isEnemyNowInCheck(): boolean {
    if (this.gameState.whosTurn === Color.WHITE) {
      const blackKing = this.getBlackKing();
      const whiteMoves = this.getAllWhiteMoves();

      return whiteMoves.includes(blackKing.position);
    }

    const whiteKing = this.getWhiteKing();
    const blackMoves = this.getAllBlackMoves();

    return blackMoves.includes(whiteKing.position);
  }

  protected getBlackKing(): ChessPiece {
    for (const [key, value] of this.gameState.blackPieces) {
      if (value.type === PieceType.KING) {
        return value;
      }
    }
    throw new Error("Black King not found — this should never happen");
  }

  protected getWhiteKing(): ChessPiece {
    for (const [key, value] of this.gameState.whitePieces) {
      if (value.type === PieceType.KING) {
        return value;
      }
    }
    throw new Error("White King not found — this should never happen");
  }

  protected getAllBlackMoves(): string[] {
    let availableBlackMoves: string[] = [];
    this.gameState.blackPieces.forEach(
      (piece) =>
        (availableBlackMoves = availableBlackMoves.concat(
          piece.getAvailableMoves(this.gameState)
        ))
    );
    return availableBlackMoves;
  }

  protected enemyHasAvailableMoves(): boolean {
    const enemyPieces =
      this.getWhosTurn() === Color.WHITE
        ? this.gameState.blackPieces
        : this.gameState.whitePieces;

    return true;
  }

  protected getAllWhiteMoves(): string[] {
    let availableWhiteMoves: string[] = [];
    this.gameState.whitePieces.forEach(
      (piece) =>
        (availableWhiteMoves = availableWhiteMoves.concat(
          piece.getAvailableMoves(this.gameState)
        ))
    );
    return availableWhiteMoves;
  }

  protected changePlayer() {
    this.gameState.whosTurn === Color.WHITE
      ? this.setWhosTurn(Color.BLACK)
      : this.setWhosTurn(Color.WHITE);
  }

  protected setWhosTurn(player: Color) {
    this.gameState.whosTurn = player;
  }

  public getWhosTurn(): Color {
    return this.gameState.whosTurn;
  }

  public getPieceAtTile(tileKey: string): ChessPiece | undefined {
    if (this.gameState.blackPieces.has(tileKey))
      return this.gameState.blackPieces.get(tileKey);
    if (this.gameState.whitePieces.has(tileKey))
      return this.gameState.whitePieces.get(tileKey);
    return undefined;
  }

  public updateGameState(piece: ChessPiece, newPosition: string) {
    if (piece === undefined) {
      console.log("do nothing");
      return;
    }

    //create temp game state
    const tempState: GameState = this.createTempGameState();

    try {
      this.movePieceToTile(piece, newPosition);
    } catch (error) {
      throw new Error("Invalid move");
    }

    //check if game state is now valid
    //If moving piece results in check, return no moves
    if (this.isCurrentPlayerInCheck()) {
      this.gameState = tempState;
      throw new Error("Can't put yourself in check");
    }

    if (this.isEnemyNowInCheck()) {
      if (!this.enemyHasAvailableMoves()) {
        console.log("Checkmate!");
        this.gameStatus = GameStatus.CHECKMATE;
        return;
      }
      console.log("check");
      this.gameStatus = GameStatus.CHECK;
    }

    //if yes, great
    //if no, is it check, checkmate, or stalemate?

    this.changePlayer();
  }

  public getGameStatus(): GameStatus {
    return this.gameStatus;
  }
  protected createTempGameState(): GameState {
    return {
      whitePieces: new Map(
        Array.from(this.gameState.whitePieces, ([key, piece]) => [
          key,
          piece.clone(),
        ])
      ),
      blackPieces: new Map(
        Array.from(this.gameState.blackPieces, ([key, piece]) => [
          key,
          piece.clone(),
        ])
      ),
      whosTurn: this.gameState.whosTurn,
      whitePiecesTaken: [...this.gameState.whitePiecesTaken],
      blackPiecesTaken: [...this.gameState.blackPiecesTaken],
    };
  }
}
