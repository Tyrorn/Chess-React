import { Color, PIECE_TYPE } from "../types/enums.ts";
import { ChessPiece, Direction } from "./ChessPiece.ts";

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
    super(PIECE_TYPE.KING, color, position, directions, isRepeatMovement);
  }

  public clone(): ChessPiece {
    return new KingChessPiece(this.color, this.position);
  }
}
