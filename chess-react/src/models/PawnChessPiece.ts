import { getImageForPiece } from "../data/pieceImages";
import { Color, PieceType } from "../types/enums";
import { ChessPiece } from "./ChessPiece";

export class PawnChessPiece extends ChessPiece {
  constructor(color: Color, position: string) {
    super(
      PieceType.PAWN,
      color,
      position,
      getImageForPiece(`${Color.BLACK} - ${PieceType.PAWN}`)
    );
  }

  moveType = () => {
    console.log("Pawn");
  };
}
