import { ChessPiece } from "../models/ChessPiece";
import { PawnChessPiece } from "../models/PawnChessPiece";
import { KnightChessPiece } from "../models/KnightChessPiece";
import { BishopChessPiece } from "../models/BishopChessPiece";
import { RookChessPiece } from "../models/RookChessPiece";
import { QueenChessPiece } from "../models/QueenChessPiece";
import { KingChessPiece } from "../models/KingChessPiece";

import { Color, PieceType } from "../types/enums";

export const PieceFactory = () => {
  const create = (
    pieceType: PieceType,
    color: Color,
    position: string
  ): ChessPiece => {
    switch (pieceType) {
      case PieceType.PAWN:
        return new PawnChessPiece(color, position);
      case PieceType.KNIGHT:
        return new KnightChessPiece(color, position);
      case PieceType.BISHOP:
        return new BishopChessPiece(color, position);
      case PieceType.ROOK:
        return new RookChessPiece(color, position);
      case PieceType.QUEEN:
        return new QueenChessPiece(color, position);
      case PieceType.KING:
        return new KingChessPiece(color, position);
      default:
        throw new Error(`Unknown piece type: ${pieceType}`);
    }
  };

  return { create };
};
