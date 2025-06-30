import { Color, PieceType } from "../types/enums";

export const whitePiecesMap: Map<string, string> = new Map([
  ["A1", `${Color.WHITE} - ${PieceType.ROOK}`],
  ["A2", `${Color.WHITE} - ${PieceType.PAWN}`],
  ["B1", `${Color.WHITE} - ${PieceType.KNIGHT}`],
  ["B2", `${Color.WHITE} - ${PieceType.PAWN}`],
  ["C1", `${Color.WHITE} - ${PieceType.BISHOP}`],
  ["C2", `${Color.WHITE} - ${PieceType.PAWN}`],
  ["D1", `${Color.WHITE} - ${PieceType.QUEEN}`],
  ["D3", `${Color.WHITE} - ${PieceType.PAWN}`],
  ["E3", `${Color.WHITE} - ${PieceType.KING}`],
  // ["E2", `${Color.WHITE} - ${PieceType.PAWN}`],
  ["F5", `${Color.WHITE} - ${PieceType.BISHOP}`],
  // ["F2", `${Color.WHITE} - ${PieceType.PAWN}`],
  ["G1", `${Color.WHITE} - ${PieceType.KNIGHT}`],
  // ["G2", `${Color.WHITE} - ${PieceType.PAWN}`],
  ["E4", `${Color.WHITE} - ${PieceType.ROOK}`],
  // ["H2", `${Color.WHITE} - ${PieceType.PAWN}`],
]);

export const blackPiecesMap: Map<string, string> = new Map([
  ["A3", `${Color.BLACK} - ${PieceType.ROOK}`],
  // ["A7", `${Color.BLACK} - ${PieceType.PAWN}`],
  ["B8", `${Color.BLACK} - ${PieceType.KNIGHT}`],
  // ["B7", `${Color.BLACK} - ${PieceType.PAWN}`],
  ["C8", `${Color.BLACK} - ${PieceType.BISHOP}`],
  // ["C7", `${Color.BLACK} - ${PieceType.PAWN}`],
  ["D8", `${Color.BLACK} - ${PieceType.QUEEN}`],
  // ["D7", `${Color.BLACK} - ${PieceType.PAWN}`],
  ["E8", `${Color.BLACK} - ${PieceType.KING}`],
  // ["E7", `${Color.BLACK} - ${PieceType.PAWN}`],
  ["F8", `${Color.BLACK} - ${PieceType.BISHOP}`],
  // ["F7", `${Color.BLACK} - ${PieceType.PAWN}`],
  ["G8", `${Color.BLACK} - ${PieceType.KNIGHT}`],
  // ["G7", `${Color.BLACK} - ${PieceType.PAWN}`],
  ["H8", `${Color.BLACK} - ${PieceType.ROOK}`],
  // ["H7", `${Color.BLACK} - ${PieceType.PAWN}`],
]);

export const pieceMap: Map<string, string> = new Map([
  ...whitePiecesMap.entries(),
  ...blackPiecesMap.entries(),
]);
