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
      const [colorString, pieceTypeString] = value.split(" - ");
      const color = colorString as Color;
      const pieceType = pieceTypeString as PieceType;
      const newPiece = pieceFactory.create(pieceType, color, position);

      color === Color.WHITE
        ? this.gameState.whitePieces.set(position, newPiece)
        : this.gameState.blackPieces.set(position, newPiece);
    });
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

  public getPieceAtTile(tileKey: string) {
    if (this.gameState.blackPieces.has(tileKey))
      return this.gameState.blackPieces.get(tileKey);
    if (this.gameState.whitePieces.has(tileKey))
      return this.gameState.whitePieces.get(tileKey);
    return undefined;
  }
}
