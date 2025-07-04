import { getImageForPiece } from "../data/pieceImages";
import { GameState } from "../services/GameEngine";
import { Color, PieceType } from "../types/enums";
import { ChessPiece, Location, Direction } from "./ChessPiece";

const directions: Direction[] = [
  { x: 0, y: 1 }, //Up
];
const isRepeatMovement: boolean = false;

export class PawnChessPiece extends ChessPiece {
  startingPosition: string;
  enemyDirection: Direction[];
  constructor(color: Color, position: string) {
    super(
      PieceType.PAWN,
      color,
      position,
      getImageForPiece(`${color} - ${PieceType.PAWN}`),
      directions,
      isRepeatMovement
    );
    this.startingPosition = position === "D3" ? "D2" : position;
    this.enemyDirection = [
      { x: -1, y: color === Color.WHITE ? 1 : -1 }, //Up Left
      { x: 1, y: color === Color.WHITE ? 1 : -1 }, //Up Right
    ];
  }

  public clone(): ChessPiece {
    return new PawnChessPiece(this.color, this.position);
  }

  public getAvailableMoves(gameState: GameState): string[] {
    let availableMoves: string[] = [];
    const startingLocation = this.convertKeyToLocation(this.position);

    for (let i = 0; i < this.directions.length; i++) {
      const direction = this.directions[i];

      availableMoves.push(
        ...this.getForwardMoves(startingLocation, gameState, direction)
      );
    }

    for (let i = 0; i < this.enemyDirection.length; i++) {
      const direction = this.enemyDirection[i];

      availableMoves.push(
        ...this.getAttackMoves(startingLocation, gameState, direction)
      );
    }

    return availableMoves;
  }

  protected getForwardMoves(
    startingLocation: Location,
    gameState: GameState,
    direction: Location
  ): string[] {
    let availableMoves: string[] = [];
    let locationToCheck: Location = { ...startingLocation };
    let moveCounter = 0;
    locationToCheck.x += direction.x;
    locationToCheck.y += direction.y;

    while (this.isOnBoard(locationToCheck)) {
      const tileToCheck: string =
        this.convertLocationToTileKey(locationToCheck);

      if (!this.isMoveLegal(gameState, tileToCheck)) break;
      availableMoves.push(tileToCheck);
      moveCounter++;

      if (!this.isStartingLocation(startingLocation) || moveCounter > 1) break;

      locationToCheck.x += direction.x;
      locationToCheck.y += direction.y;
    }
    return availableMoves;
  }

  protected getAttackMoves(
    startingLocation: Location,
    gameState: GameState,
    direction: Location
  ): string[] {
    let availableMoves: string[] = [];
    let locationToCheck: Location = { ...startingLocation };
    locationToCheck.x += direction.x;
    locationToCheck.y += direction.y;

    while (this.isOnBoard(locationToCheck)) {
      const tileToCheck: string =
        this.convertLocationToTileKey(locationToCheck);

      if (!this.isEnemyTile(gameState, tileToCheck)) break;
      availableMoves.push(tileToCheck);
      break;
    }
    return availableMoves;
  }

  protected isEnemyTile(gameState: GameState, tileKey: string): boolean {
    if (this.color === Color.BLACK) {
      return gameState.whitePieces.has(tileKey);
    }

    return gameState.blackPieces.has(tileKey);
  }

  private isStartingLocation(location: Location): boolean {
    return this.startingPosition === this.convertLocationToTileKey(location);
  }
}
