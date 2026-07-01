import { BishopChessPiece } from "../models/BishopChessPiece.js";
import { ChessPiece } from "../models/ChessPiece.js";
import { KingChessPiece } from "../models/KingChessPiece.js";
import { KnightChessPiece } from "../models/KnightChessPiece.js";
import { PawnChessPiece } from "../models/PawnChessPiece.js";
import { QueenChessPiece } from "../models/QueenChessPiece.js";
import { RookChessPiece } from "../models/RookChessPiece.js";
import { PIECE_TYPE, Color, PieceType } from "../types/enums.js";

export const PieceFactory = () => {
  const create = (
    pieceType: PieceType,
    color: Color,
    position: string,
  ): ChessPiece => {
    switch (pieceType) {
      case PIECE_TYPE.PAWN:
        return new PawnChessPiece(color, position);
      case PIECE_TYPE.KNIGHT:
        return new KnightChessPiece(color, position);
      case PIECE_TYPE.BISHOP:
        return new BishopChessPiece(color, position);
      case PIECE_TYPE.ROOK:
        return new RookChessPiece(color, position);
      case PIECE_TYPE.QUEEN:
        return new QueenChessPiece(color, position);
      case PIECE_TYPE.KING:
        return new KingChessPiece(color, position);
      default:
        throw new Error(`Unknown piece type: ${pieceType}`);
    }
  };

  return { create };
};
