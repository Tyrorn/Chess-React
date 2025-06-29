import { getImageForPiece } from "../data/pieceImages";
import { Color, PieceType } from "../types/enums";
import { ChessPiece } from "./ChessPiece";

export class BishopChessPiece extends ChessPiece {
  constructor(color: Color, position: string) {
    super(
      PieceType.BISHOP,
      color,
      position,
      getImageForPiece(`${color} - ${PieceType.BISHOP}`)
    );
  }

  moveType = () => {
    console.log("Bishop");
  };
}
