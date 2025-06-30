import { getImageForPiece } from "../data/pieceImages";
import { Color, PieceType } from "../types/enums";
import { ChessPiece, Direction } from "./ChessPiece";

const directions: Direction[] = [
  { x: 0, y: -1 }, //Up
  { x: 1, y: 0 }, //Right
  { x: 0, y: 1 }, //Down
  { x: -1, y: 0 }, //Left
];
const isRepeatMovement: boolean = true;
export class RookChessPiece extends ChessPiece {
  constructor(color: Color, position: string) {
    super(
      PieceType.ROOK,
      color,
      position,
      getImageForPiece(`${color} - ${PieceType.ROOK}`),
      directions,
      isRepeatMovement
    );
  }
}
