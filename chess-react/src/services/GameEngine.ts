import { pieceMap } from "../data/startingPosition";
import { ChessPiece } from "../models/ChessPiece";
import { PawnChessPiece } from "../models/PawnChessPiece";
import { Color, PieceType } from "../types/enums";

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
    pieceMap.forEach((value, key) => {
      //key A1, value white - Rook
      const position = key;
      const [colorString, pieceTypeString] = value.split(" - ");

      const color = colorString as Color;
      const pieceType = pieceTypeString as PieceType;
      let newPiece: ChessPiece;
      switch (pieceType) {
        default:
          newPiece = new PawnChessPiece(color, position);
          break;
      }

      color === Color.WHITE
        ? this.whitePieces.set(position, newPiece)
        : this.blackPieces.set(position, newPiece);
    });
  }
}
