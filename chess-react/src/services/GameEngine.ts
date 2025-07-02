import { pieceMap } from "../data/startingPosition";
import { ChessPiece } from "../models/ChessPiece";
import { Color, PieceType } from "../types/enums";
import { PieceFactory } from "../factories/PieceFactory";

export type GameState = {
  whitePieces: Map<string, ChessPiece>;
  blackPieces: Map<string, ChessPiece>;
  whosTurn: Color;
};

export class GameEngine {
  gameState: GameState;

  constructor() {
    this.gameState = {
      whitePieces: new Map(),
      blackPieces: new Map(),
      whosTurn: Color.WHITE,
    };

    this._setUpPiecesState();
  }

  private _setUpPiecesState() {
    const pieceFactory = PieceFactory();
    pieceMap.forEach((value, key) => {
      const position = key;
      const color: Color = value.split(" - ")[0] as Color;
      const pieceType: PieceType = value.split(" - ")[1] as PieceType;
      const newPiece = pieceFactory.create(pieceType, color, position);

      color === Color.WHITE
        ? this.gameState.whitePieces.set(position, newPiece)
        : this.gameState.blackPieces.set(position, newPiece);
    });
  }

  public movePieceToTile(piece: ChessPiece, newPosition: string) {
    if (!this.isValidMove(piece, newPosition)) {
      throw new Error("Move is invalid");
    }
    this.updatePiecePosition(piece, newPosition);
  }

  protected updatePiecePosition(piece: ChessPiece, newPosition: string) {
    const pieceAtNewPosition: ChessPiece | undefined =
      this.getPieceAtTile(newPosition);

    if (pieceAtNewPosition) {
      this.takeEnemyPiece(newPosition);
    }
    this.setPieceInNewLocation(piece, newPosition);
  }

  protected takeEnemyPiece(position: string) {
    //Permanently enemy remove piece
    this.gameState.whosTurn === Color.WHITE
      ? this.gameState.blackPieces.delete(position)
      : this.gameState.whitePieces.delete(position);
  }

  protected setPieceInNewLocation(piece: ChessPiece, newPosition: string) {
    //Temporarily remove piece
    this.gameState.whosTurn === Color.WHITE
      ? this.gameState.whitePieces.delete(piece.position)
      : this.gameState.blackPieces.delete(piece.position);

    //Set piece in new location
    piece.setPosition(newPosition);
    this.gameState.whosTurn === Color.WHITE
      ? this.gameState.whitePieces.set(newPosition, piece)
      : this.gameState.blackPieces.set(newPosition, piece);
  }

  protected isValidMove(piece: ChessPiece, newPosition: string): boolean {
    return this.getAvailableMoves(piece.position).includes(newPosition);
  }

  public getAvailableMoves(tileKey: string): string[] {
    //TODO will need to factor in if moving results in checkmate
    let playersPieces: Map<string, ChessPiece>;
    playersPieces =
      this.gameState.whosTurn === Color.WHITE
        ? this.gameState.whitePieces
        : this.gameState.blackPieces;

    if (!playersPieces.has(tileKey)) {
      return [];
    }

    return playersPieces.get(tileKey)?.getAvailableMoves(this.gameState) || [];
  }

  protected changePlayer() {
    this.gameState.whosTurn === Color.WHITE
      ? this.setWhosTurn(Color.BLACK)
      : this.setWhosTurn(Color.WHITE);
  }

  protected setWhosTurn(player: Color) {
    this.gameState.whosTurn = player;
  }

  public getWhosTurn(): Color {
    return this.gameState.whosTurn;
  }

  public getPieceAtTile(tileKey: string): ChessPiece | undefined {
    if (this.gameState.blackPieces.has(tileKey))
      return this.gameState.blackPieces.get(tileKey);
    if (this.gameState.whitePieces.has(tileKey))
      return this.gameState.whitePieces.get(tileKey);
    return undefined;
  }

  public updateGameState(piece: ChessPiece, newPosition: string) {
    if (piece === undefined) {
      console.log("do nothing");
      return;
    }

    try {
      this.movePieceToTile(piece, newPosition);
    } catch (error) {
      throw new Error("Invalid move");
    }

    this.changePlayer();
  }
}
