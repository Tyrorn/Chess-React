import { pieceMap } from "../data/startingPosition";
import { ChessPiece } from "../models/ChessPiece";
import { Color, GameStatus, PieceType } from "../types/enums";
import { PieceFactory } from "../factories/PieceFactory";
import { KingChessPiece } from "../models/KingChessPiece";

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

  protected _movePieceToTile(piece: ChessPiece, newPosition: string) {
    if (!this.isValidMove(piece, newPosition)) {
      throw new Error("Move is invalid");
    }
    this.updatePiecePosition(piece, newPosition);

    if (this.isCurrentPlayerInCheck()) {
      throw new Error("Player put self in check.... oops");
    }
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
    return this._getAvailableMoves(piece.color, piece.position).includes(
      newPosition
    );
  }

  public getAvailableMoves(tileKey: string): string[] {
    return this._getAvailableMoves(this.getWhosTurn(), tileKey);
  }

  protected _getAvailableMoves(color: Color, tileKey: string): string[] {
    let playersPieces: Map<string, ChessPiece>;
    playersPieces =
      color === Color.WHITE
        ? this.gameState.whitePieces
        : this.gameState.blackPieces;

    const playersPiece = playersPieces.get(tileKey);
    if (!playersPiece) {
      return [];
    }

    const availableMoves = playersPiece.getAvailableMoves(this.gameState);

    if (playersPiece.type !== PieceType.KING) {
      return availableMoves;
    }

    const enemyMoves = this.getEnemyMoves(color);

    for (let i = 0; i < availableMoves.length; i++) {
      if (enemyMoves.includes(availableMoves[i])) {
        availableMoves.splice(i, 1);
        i--;
      }
    }

    return availableMoves;
  }

  protected getEnemyMoves(color: Color): string[] {
    const enemyMoves: string[] =
      color === Color.WHITE ? this.getAllBlackMoves() : this.getAllWhiteMoves();

    return enemyMoves;
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

  protected isKingNowInCheck(color: Color): boolean {
    if (color === Color.BLACK) {
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

  protected enemyHasAvailableMoves(color: Color): boolean {
    if (this.getKingAvailableMoves(color).length > 0) return true;

    if (this.piecesCanSaveKing(color)) return true;

    return false;
  }

  protected piecesCanSaveKing(color: Color): boolean {
    const pieces =
      color === Color.WHITE
        ? this.gameState.whitePieces
        : this.gameState.blackPieces;
    const tempState: GameState = this.createTempGameState();

    for (const [position, piece] of pieces as Map<string, ChessPiece>) {
      const availableMoves = piece.getAvailableMoves(this.gameState);
      const length = availableMoves.length;
      for (let i = 0; i < length; i++) {
        try {
          this._movePieceToTile(piece, availableMoves[i]);
        } catch (error) {
          this.gameState = tempState;
        }
        if (!this.isKingNowInCheck(color)) {
          this.gameState = tempState;
          return true;
        }
        this.gameState = tempState;
      }
    }

    return false;
  }

  protected getKingAvailableMoves(color: Color): string[] {
    const king: ChessPiece =
      color === Color.WHITE ? this.getWhiteKing() : this.getBlackKing();

    return this._getAvailableMoves(king.color, king.position);
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

    const tempState: GameState = this.createTempGameState();

    try {
      this._movePieceToTile(piece, newPosition);
      this.checkAndSetGameStatus();
      this.changePlayer();
    } catch (error) {
      //Move was invalid
      this.gameState = tempState;
      throw new Error("Can't do mvoe");
    }
  }

  protected checkAndSetGameStatus() {
    const enemyColor: Color =
      this.gameState.whosTurn === Color.WHITE ? Color.BLACK : Color.WHITE;

    if (this.isKingNowInCheck(enemyColor)) {
      if (!this.enemyHasAvailableMoves(enemyColor)) {
        this.setGameStatus(GameStatus.CHECKMATE);
        return;
      }
      this.setGameStatus(GameStatus.CHECK);
    }
    this.setGameStatus(GameStatus.ONGOING);
  }

  protected setGameStatus(status: GameStatus) {
    this.gameStatus = status;
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
