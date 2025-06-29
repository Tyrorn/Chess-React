import { getImageForPiece } from "../data/pieceImages";
import { Color, PieceType } from "../types/enums";
import { ChessPiece } from "./ChessPiece";

export class KingChessPiece extends ChessPiece {
  constructor(color: Color, position: string) {
    super(
      PieceType.KING,
      color,
      position,
      getImageForPiece(`${color} - ${PieceType.KING}`)
    );
  }

  moveType = () => {
    console.log("King");
  };
}
