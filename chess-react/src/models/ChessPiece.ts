import { GameState } from "../services/GameEngine";
import { Color, PieceType } from "../types/enums";

type Location = {
  x: number;
  y: number;
};

type Direction = {
  x: number;
  y: number;
};

export abstract class ChessPiece {
  type: PieceType;
  color: Color;
  position: string;
  image: string;
  directions: Direction[];

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

  public getAvailableMoves(gameState: GameState): string[] {
    let availableMoves: string[] = [];
    const startingLocation = this.convertKeyToLocation(this.position);

    for (let i = 0; i < this.directions.length; i++) {
      const direction = this.directions[i];
      let locationToCheck: Location = { ...startingLocation };
      locationToCheck.x += direction.x;
      locationToCheck.y += direction.y;

      availableMoves.push(
        ...this.getMovesInDirection(locationToCheck, gameState, direction)
      );
    }

    return availableMoves;
  }

  private getMovesInDirection(
    location: Location,
    gameState: GameState,
    direction: Location
  ): string[] {
    let availableMoves: string[] = [];
    while (this.isOnBoard(location)) {
      const tileToCheck: string = this.convertLocationToTileKey(location);
      //If enemy tile in the way, add to available moves then stop progressing
      if (this.isEnemyTile(gameState, tileToCheck)) {
        availableMoves.push(tileToCheck);
        return availableMoves;
      }

      if (this.isMoveLegal(gameState, tileToCheck))
        availableMoves.push(tileToCheck);

      location.x += direction.x;
      location.y += direction.y;
    }
    return availableMoves;
  }

  private isOnBoard(location: Location): boolean {
    return (
      location.x <= 8 && location.x >= 1 && location.y <= 8 && location.y >= 1
    );
  }

  private isEnemyTile(gameState: GameState, tileKey: string): boolean {
    if (this.color === Color.BLACK) {
      return gameState.whitePieces.has(tileKey);
    }

    return gameState.blackPieces.has(tileKey);
  }

  private isMoveLegal = (gameState: GameState, tileKey: string): boolean => {
    if (gameState.blackPieces.has(tileKey)) return false;
    if (gameState.whitePieces.has(tileKey)) return false;
    return true;
  };

  private convertKeyToLocation(position: string): Location {
    let location = {
      x: position.charCodeAt(0) - 64,
      y: +position[1],
    };
    return location;
  }

  private convertLocationToTileKey(location: Location): string {
    let position = String.fromCharCode(location.x + 64) + location.y.toString();
    return position;
  }
}
