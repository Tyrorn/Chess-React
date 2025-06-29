import { getImageForPiece } from "../data/pieceImages";
import { Color, PieceType } from "../types/enums";
import { ChessPiece } from "./ChessPiece";

export class QueenChessPiece extends ChessPiece {
  constructor(color: Color, position: string) {
    super(
      PieceType.QUEEN,
      color,
      position,
      getImageForPiece(`${color} - ${PieceType.QUEEN}`)
    );
  }

  moveType = () => {
    console.log("Queen");
  };
}
