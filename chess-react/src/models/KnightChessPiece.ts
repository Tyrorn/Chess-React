import { getImageForPiece } from "../data/pieceImages";
import { Color, PieceType } from "../types/enums";
import { ChessPiece, Direction } from "./ChessPiece";

const directions: Direction[] = [
  { x: -1, y: -2 }, //Up to the left
  { x: 1, y: -2 }, //Up to the right
  { x: 2, y: -1 }, //Right and up
  { x: 2, y: 1 }, //right and down
  { x: -1, y: 2 }, //Down to the left
  { x: 1, y: 2 }, //Down to the right
  { x: -2, y: -1 }, //Left and up
  { x: -2, y: 1 }, //Left and down
];
const isRepeatMovement: boolean = false;
export class KnightChessPiece extends ChessPiece {
  constructor(color: Color, position: string) {
    super(
      PieceType.KNIGHT,
      color,
      position,
      getImageForPiece(`${color} - ${PieceType.KNIGHT}`),
      directions,
      isRepeatMovement
    );
  }
}
