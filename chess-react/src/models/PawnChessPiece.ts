import { getImageForPiece } from "../data/pieceImages";
import { GameState } from "../services/GameEngine";
import { Color, PieceType } from "../types/enums";
import { ChessPiece } from "./ChessPiece";

export class PawnChessPiece extends ChessPiece {
  startingPosition: string;
  constructor(color: Color, position: string) {
    super(
      PieceType.PAWN,
      color,
      position,
      getImageForPiece(`${color} - ${PieceType.PAWN}`)
    );
    this.startingPosition = position;
  }

  public moveType = () => {
    console.log("Pawn");
  };

  public getAvailableMoves = (gameState: GameState): string[] => {
    const playersTurn: Color = gameState.whosTurn;
    let tileInfrontOfPawn: string;
    let movesAvailable: string[] = [];
    let [rowPosition, colPosition]: string[] = this.position.split("");

    if (this.color !== playersTurn) return [];

    colPosition =
      playersTurn === Color.WHITE
        ? (+colPosition + 1).toString()
        : (+colPosition - 1).toString();

    //If there is any piece infront of the pawn, can't move
    tileInfrontOfPawn = rowPosition + colPosition;
    if (gameState.whitePieces.has(tileInfrontOfPawn)) return [];
    if (gameState.blackPieces.has(tileInfrontOfPawn)) return [];
    movesAvailable.push(tileInfrontOfPawn);

    colPosition =
      playersTurn === Color.WHITE
        ? (+colPosition + 1).toString()
        : (+colPosition - 1).toString();

    //Special case for pawns, can move forward 2 spaces if its still in its starting position
    if (this.position === this.startingPosition) {
      tileInfrontOfPawn = rowPosition + colPosition;
      if (gameState.whitePieces.has(tileInfrontOfPawn)) return [];
      if (gameState.blackPieces.has(tileInfrontOfPawn)) return [];
      movesAvailable.push(tileInfrontOfPawn);
    }

    return movesAvailable;
  };
}
