import { getImageForPiece } from "../data/pieceImages";
import { GameState } from "../services/GameEngine";
import { Color, PieceType } from "../types/enums";
import { ChessPiece } from "./ChessPiece";

export class RookChessPiece extends ChessPiece {
  constructor(color: Color, position: string) {
    super(
      PieceType.ROOK,
      color,
      position,
      getImageForPiece(`${color} - ${PieceType.ROOK}`)
    );
  }

  moveType = () => {
    console.log("Rook");
  };

  public getAvailableMoves(gameState: GameState): string[] {
    return [];
  }
}
