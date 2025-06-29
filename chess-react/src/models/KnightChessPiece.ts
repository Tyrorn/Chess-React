import { getImageForPiece } from "../data/pieceImages";
import { Color, PieceType } from "../types/enums";
import { ChessPiece } from "./ChessPiece";

export class KnightChessPiece extends ChessPiece {
  constructor(color: Color, position: string) {
    super(
      PieceType.KNIGHT,
      color,
      position,
      getImageForPiece(`${color} - ${PieceType.KNIGHT}`)
    );
  }

  moveType = () => {
    console.log("Knight");
  };
}
