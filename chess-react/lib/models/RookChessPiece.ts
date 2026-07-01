import { Color, PIECE_TYPE } from "../types/enums.ts";
import { Direction, ChessPiece } from "./ChessPiece.ts";

const directions: Direction[] = [
  { x: 0, y: -1 }, //Up
  { x: 1, y: 0 }, //Right
  { x: 0, y: 1 }, //Down
  { x: -1, y: 0 }, //Left
];
const isRepeatMovement: boolean = true;
export class RookChessPiece extends ChessPiece {
  constructor(color: Color, position: string) {
    super(PIECE_TYPE.ROOK, color, position, directions, isRepeatMovement);
  }

  public clone(): ChessPiece {
    return new RookChessPiece(this.color, this.position);
  }
}
