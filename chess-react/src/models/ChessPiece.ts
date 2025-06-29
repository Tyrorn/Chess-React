import { Color, PieceType } from "../types/enums";

export abstract class ChessPiece {
  type: PieceType;
  color: Color;
  position: string;
  image: string;

  constructor(type: PieceType, color: Color, position: string, image: string) {
    this.type = type;
    this.color = color;
    this.position = position;
    this.image = image;
  }

  abstract moveType: () => void;
}
