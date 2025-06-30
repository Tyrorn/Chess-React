import { getImageForPiece } from "../data/pieceImages";
import { GameState } from "../services/GameEngine";
import { Color, PieceType } from "../types/enums";
import { ChessPiece, Direction } from "./ChessPiece";

const directions: Direction[] = [
  { x: -1, y: -1 }, //Up left
  { x: -1, y: 1 }, //up right
  { x: 1, y: -1 }, //down left
  { x: 1, y: 1 }, //down right
];
const isRepeatMovement: boolean = true;

export class BishopChessPiece extends ChessPiece {
  constructor(color: Color, position: string) {
    super(
      PieceType.BISHOP,
      color,
      position,
      getImageForPiece(`${color} - ${PieceType.BISHOP}`),
      directions,
      isRepeatMovement
    );
  }
}
