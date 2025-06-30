import { getImageForPiece } from "../data/pieceImages";
import { GameState } from "../services/GameEngine";
import { Color, PieceType } from "../types/enums";
import { ChessPiece } from "./ChessPiece";

export class KnightChessPiece extends ChessPiece {
  constructor(color: Color, position: string) {
    super(
      PieceType.KNIGHT,
      color,
      position,
      getImageForPiece(`${color} - ${PieceType.KNIGHT}`)
    );
  }

  public moveType = () => {
    console.log("Knight");
  };

  public getAvailableMoves = (gameState: GameState): string[] => {
    const playersTurn: Color = gameState.whosTurn;

    let movesAvailable: string[] = [];
    let [rowPosition, colPosition]: string[] = this.position.split("");
    let colToCheck, rowToCheck: number;

    rowToCheck = rowPosition.charCodeAt(0) - 2;
    //Look left 2 then up 1, down 1
    if (65 <= rowToCheck) {
      colToCheck = +colPosition + 1;
      if (colToCheck <= 8) {
        movesAvailable.push(
          String.fromCharCode(rowToCheck) + colToCheck.toString()
        );
      }

      colToCheck = +colPosition - 1;
      if (0 <= colToCheck) {
        movesAvailable.push(
          String.fromCharCode(rowToCheck) + colToCheck.toString()
        );
      }
    }

    rowToCheck = rowPosition.charCodeAt(0) + 2;
    //Look right 2 then up 1, down 1
    if (rowToCheck <= 72) {
      colToCheck = +colPosition + 1;
      if (colToCheck <= 8) {
        movesAvailable.push(
          String.fromCharCode(rowToCheck) + colToCheck.toString()
        );
      }

      colToCheck = +colPosition - 1;
      if (0 <= colToCheck) {
        movesAvailable.push(
          String.fromCharCode(rowToCheck) + colToCheck.toString()
        );
      }
    }

    colToCheck = +colPosition + 2;
    //Look up 2 left 1 right 1
    if (colToCheck <= 8) {
      rowToCheck = rowPosition.charCodeAt(0) + 1;
      if (rowToCheck <= 72) {
        movesAvailable.push(
          String.fromCharCode(rowToCheck) + colToCheck.toString()
        );
      }

      rowToCheck = rowPosition.charCodeAt(0) - 1;
      if (65 <= rowToCheck) {
        movesAvailable.push(
          String.fromCharCode(rowToCheck) + colToCheck.toString()
        );
      }
    }

    colToCheck = +colPosition - 2;
    //Look down 2 left 1 right 1
    if (colToCheck <= 8) {
      rowToCheck = rowPosition.charCodeAt(0) + 1;
      if (rowToCheck <= 72) {
        movesAvailable.push(
          String.fromCharCode(rowToCheck) + colToCheck.toString()
        );
      }

      rowToCheck = rowPosition.charCodeAt(0) - 1;
      if (65 <= rowToCheck) {
        movesAvailable.push(
          String.fromCharCode(rowToCheck) + colToCheck.toString()
        );
      }
    }

    movesAvailable = movesAvailable.filter((x) => {
      if (gameState.whitePieces.has(x)) return false;
      if (gameState.blackPieces.has(x)) return false;
      return true;
    });

    return movesAvailable;
  };

  private hasPieceAtTile = (gameState: GameState, tileKey: string): boolean => {
    if (gameState.blackPieces.has(tileKey)) return true;
    if (gameState.whitePieces.has(tileKey)) return true;
    return false;
  };
}
