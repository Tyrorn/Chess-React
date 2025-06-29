import { GameState } from "../services/GameEngine";
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

  public getImage = (): string => {
    return this.image;
  };

  public abstract moveType: () => void;

  public abstract getAvailableMoves: (gameState: GameState) => void;
}
