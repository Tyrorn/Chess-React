import { GameState } from "../services/GameEngine";
import { Color, PieceType } from "../types/enums";

export type Location = {
  x: number;
  y: number;
};

export type Direction = {
  x: number;
  y: number;
};

export abstract class ChessPiece {
  constructor(
    public type: PieceType,
    public color: Color,
    public position: string,
    public image: string,
    protected directions: Direction[],
    protected isRepeatMovement: boolean
  ) {
    this.type = type;
    this.color = color;
    this.position = position;
    this.image = image;
    this.directions = directions;
    this.isRepeatMovement = isRepeatMovement;
  }

  public abstract clone(): ChessPiece;

  public getImage(): string {
    return this.image;
  }

  public setPosition(position: string): void {
    this.position = position;
  }

  public getAvailableMoves(gameState: GameState): string[] {
    let availableMoves: string[] = [];
    const startingLocation = this.convertKeyToLocation(this.position);

    for (let i = 0; i < this.directions.length; i++) {
      const direction = this.directions[i];

      availableMoves.push(
        ...this.getMovesInDirection(startingLocation, gameState, direction)
      );
    }

    return availableMoves;
  }

  protected getMovesInDirection(
    startingLocation: Location,
    gameState: GameState,
    direction: Direction
  ): string[] {
    let availableMoves: string[] = [];
    let locationToCheck: Location = { ...startingLocation };
    locationToCheck.x += direction.x;
    locationToCheck.y += direction.y;
    while (this.isOnBoard(locationToCheck)) {
      const tileToCheck: string =
        this.convertLocationToTileKey(locationToCheck);
      //If enemy tile in the way, add to available moves then stop progressing
      if (this.isEnemyTile(gameState, tileToCheck)) {
        availableMoves.push(tileToCheck);
        return availableMoves;
      }

      if (!this.isMoveLegal(gameState, tileToCheck)) break;
      availableMoves.push(tileToCheck);

      if (!this.movesAreRepeatable()) break;

      locationToCheck.x += direction.x;
      locationToCheck.y += direction.y;
    }
    return availableMoves;
  }

  protected isOnBoard(location: Location): boolean {
    return (
      location.x <= 8 && location.x >= 1 && location.y <= 8 && location.y >= 1
    );
  }

  protected isEnemyTile(gameState: GameState, tileKey: string): boolean {
    if (this.color === Color.BLACK) {
      return gameState.whitePieces.has(tileKey);
    }

    return gameState.blackPieces.has(tileKey);
  }

  protected movesAreRepeatable(): boolean {
    return this.isRepeatMovement;
  }

  protected isMoveLegal = (gameState: GameState, tileKey: string): boolean => {
    if (gameState.blackPieces.has(tileKey)) return false;
    if (gameState.whitePieces.has(tileKey)) return false;
    return true;
  };

  protected convertKeyToLocation(position: string): Location {
    let location = {
      x: position.charCodeAt(0) - 64,
      y: +position[1],
    };
    return location;
  }

  protected convertLocationToTileKey(location: Location): string {
    let position = String.fromCharCode(location.x + 64) + location.y.toString();
    return position;
  }
}
