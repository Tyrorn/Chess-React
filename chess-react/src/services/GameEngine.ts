import { pieceMap } from "../data/startingPosition";
import { ChessPiece } from "../models/ChessPiece";
import { Color, PieceType } from "../types/enums";
import { PieceFactory } from "../factories/PieceFactory";

export type GameState = {
  whitePieces: Map<string, ChessPiece>;
  blackPieces: Map<string, ChessPiece>;
  whosTurn: Color;
};

export class GameEngine {
  gameState: GameState;

  constructor() {
    this.gameState = {
      whitePieces: new Map(),
      blackPieces: new Map(),
      whosTurn: Color.WHITE,
    };

    this._setUpPiecesState();
  }

  private _setUpPiecesState() {
    const pieceFactory = PieceFactory();
    pieceMap.forEach((value, key) => {
      const position = key;
      const color: Color = value.split(" - ")[0] as Color;
      const pieceType: PieceType = value.split(" - ")[1] as PieceType;
      const newPiece = pieceFactory.create(pieceType, color, position);

      color === Color.WHITE
        ? this.gameState.whitePieces.set(position, newPiece)
        : this.gameState.blackPieces.set(position, newPiece);
    });
  }

  public movePieceToTile(piece: ChessPiece, newPosition: string) {
    if (!this.isValidMove(piece, newPosition)) {
      throw new Error("Move is invalid");
    }
    this.updatePiecePosition(piece, newPosition);
  }

  protected updatePiecePosition(piece: ChessPiece, newPosition: string) {
    const pieceAtNewPosition: ChessPiece | undefined =
      this.getPieceAtTile(newPosition);

    if (pieceAtNewPosition === undefined) {
      this.gameState.whosTurn === Color.WHITE
        ? this.gameState.whitePieces.delete(piece.position)
        : this.gameState.blackPieces.delete(piece.position);

      piece.setPosition(newPosition);
      this.gameState.whosTurn === Color.WHITE
        ? this.gameState.whitePieces.set(newPosition, piece)
        : this.gameState.blackPieces.set(newPosition, piece);
      return;
    }
    //replace enemy piece in new position
    this.takeEnemyPiece(piece, newPosition);
  }

  protected takeEnemyPiece(piece: ChessPiece, newPosition: string) {
    // const enemyPiece: ChessPiece = this.getPieceAtTile(newPosition)!;
    this.gameState.whosTurn === Color.WHITE
      ? this.gameState.blackPieces.delete(newPosition)
      : this.gameState.whitePieces.delete(newPosition);

    this.gameState.whosTurn === Color.WHITE
      ? this.gameState.whitePieces.delete(piece.position)
      : this.gameState.blackPieces.delete(piece.position);

    piece.setPosition(newPosition);

    this.gameState.whosTurn === Color.WHITE
      ? this.gameState.whitePieces.set(newPosition, piece)
      : this.gameState.blackPieces.set(newPosition, piece);
  }

  protected isValidMove(piece: ChessPiece, newPosition: string): boolean {
    return this.getAvailableMoves(piece.position).includes(newPosition);
  }

  public getAvailableMoves(tileKey: string): string[] {
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

  public getPieceAtTile(tileKey: string): ChessPiece | undefined {
    if (this.gameState.blackPieces.has(tileKey))
      return this.gameState.blackPieces.get(tileKey);
    if (this.gameState.whitePieces.has(tileKey))
      return this.gameState.whitePieces.get(tileKey);
    return undefined;
  }
}
