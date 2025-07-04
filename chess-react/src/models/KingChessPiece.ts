import { getImageForPiece } from "../data/pieceImages";
import { Color, PieceType } from "../types/enums";
import { ChessPiece, Direction } from "./ChessPiece";

const directions: Direction[] = [
  { x: 0, y: -1 }, //Up
  { x: 1, y: -1 }, //Up Right
  { x: 1, y: 0 }, //Right
  { x: 1, y: 1 }, //Right Down
  { x: 0, y: 1 }, //Down
  { x: -1, y: 1 }, //Down Left
  { x: -1, y: 0 }, //Left
  { x: -1, y: -1 }, //Left Up
];
const isRepeatMovement: boolean = false;

export class KingChessPiece extends ChessPiece {
  constructor(color: Color, position: string) {
    super(
      PieceType.KING,
      color,
      position,
      getImageForPiece(`${color} - ${PieceType.KING}`),
      directions,
      isRepeatMovement
    );
  }

  public clone(): ChessPiece {
    return new KingChessPiece(this.color, this.position);
  }
}
