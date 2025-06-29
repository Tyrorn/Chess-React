import { pieceMap } from "../data/startingPosition";
import { ChessPiece } from "../models/ChessPiece";
import { Color, PieceType } from "../types/enums";
import { PieceFactory } from "../factories/PieceFactory";

export class GameEngine {
  whitePieces: Map<string, ChessPiece>;
  blackPieces: Map<string, ChessPiece>;
  whosTurn: Color;

  constructor() {
    this.whitePieces = new Map();
    this.blackPieces = new Map();
    this.whosTurn = Color.WHITE;
    this.setUpPiecesState();
  }

  setUpPiecesState() {
    const pieceFactory = PieceFactory();
    pieceMap.forEach((value, key) => {
      const position = key;
      const [colorString, pieceTypeString] = value.split(" - ");
      const color = colorString as Color;
      const pieceType = pieceTypeString as PieceType;
      const newPiece = pieceFactory.create(pieceType, color, position);

      color === Color.WHITE
        ? this.whitePieces.set(position, newPiece)
        : this.blackPieces.set(position, newPiece);
    });
  }
}
