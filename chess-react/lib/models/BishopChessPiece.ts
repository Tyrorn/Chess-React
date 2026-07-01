import { Color, PIECE_TYPE } from "../types/enums.ts";
import { ChessPiece, Direction } from "./ChessPiece.ts";

const directions: Direction[] = [
  { x: -1, y: -1 }, //Up left
  { x: -1, y: 1 }, //up right
  { x: 1, y: -1 }, //down left
  { x: 1, y: 1 }, //down right
];
const isRepeatMovement: boolean = true;

export class BishopChessPiece extends ChessPiece {
  constructor(color: Color, position: string) {
    super(PIECE_TYPE.BISHOP, color, position, directions, isRepeatMovement);
  }

  public clone(): ChessPiece {
    return new BishopChessPiece(this.color, this.position);
  }
}
