import { COLOR, PIECE_TYPE } from "../types/enums.ts";

export const whitePiecesMap: Map<string, string> = new Map([
  ["A1", `${COLOR.WHITE} - ${PIECE_TYPE.ROOK}`],
  ["A2", `${COLOR.WHITE} - ${PIECE_TYPE.PAWN}`],
  ["B1", `${COLOR.WHITE} - ${PIECE_TYPE.KNIGHT}`],
  ["B2", `${COLOR.WHITE} - ${PIECE_TYPE.PAWN}`],
  ["C1", `${COLOR.WHITE} - ${PIECE_TYPE.BISHOP}`],
  ["C2", `${COLOR.WHITE} - ${PIECE_TYPE.PAWN}`],
  ["D1", `${COLOR.WHITE} - ${PIECE_TYPE.QUEEN}`],
  ["D3", `${COLOR.WHITE} - ${PIECE_TYPE.PAWN}`],
  ["E3", `${COLOR.WHITE} - ${PIECE_TYPE.KING}`],
  // ["E2", `${COLOR.WHITE} - ${PIECE_TYPE.PAWN}`],
  ["F5", `${COLOR.WHITE} - ${PIECE_TYPE.BISHOP}`],
  // ["F2", `${COLOR.WHITE} - ${PIECE_TYPE.PAWN}`],
  ["G1", `${COLOR.WHITE} - ${PIECE_TYPE.KNIGHT}`],
  // ["G2", `${COLOR.WHITE} - ${PIECE_TYPE.PAWN}`],
  ["E4", `${COLOR.WHITE} - ${PIECE_TYPE.ROOK}`],
  // ["H2", `${COLOR.WHITE} - ${PIECE_TYPE.PAWN}`],
]);

export const blackPiecesMap: Map<string, string> = new Map([
  ["A3", `${COLOR.BLACK} - ${PIECE_TYPE.ROOK}`],
  // ["A7", `${COLOR.BLACK} - ${PIECE_TYPE.PAWN}`],
  ["B8", `${COLOR.BLACK} - ${PIECE_TYPE.KNIGHT}`],
  // ["B7", `${COLOR.BLACK} - ${PIECE_TYPE.PAWN}`],
  ["C8", `${COLOR.BLACK} - ${PIECE_TYPE.BISHOP}`],
  // ["C7", `${COLOR.BLACK} - ${PIECE_TYPE.PAWN}`],
  ["D8", `${COLOR.BLACK} - ${PIECE_TYPE.QUEEN}`],
  // ["D7", `${COLOR.BLACK} - ${PIECE_TYPE.PAWN}`],
  ["E8", `${COLOR.BLACK} - ${PIECE_TYPE.KING}`],
  // ["E7", `${COLOR.BLACK} - ${PIECE_TYPE.PAWN}`],
  ["F8", `${COLOR.BLACK} - ${PIECE_TYPE.BISHOP}`],
  // ["F7", `${COLOR.BLACK} - ${PIECE_TYPE.PAWN}`],
  ["G8", `${COLOR.BLACK} - ${PIECE_TYPE.KNIGHT}`],
  // ["G7", `${COLOR.BLACK} - ${PIECE_TYPE.PAWN}`],
  ["H8", `${COLOR.BLACK} - ${PIECE_TYPE.ROOK}`],
  // ["H7", `${COLOR.BLACK} - ${PIECE_TYPE.PAWN}`],
]);

export const pieceMap: Map<string, string> = new Map([
  ...whitePiecesMap.entries(),
  ...blackPiecesMap.entries(),
]);
