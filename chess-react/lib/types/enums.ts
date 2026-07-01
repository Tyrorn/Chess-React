export const COLOR = {
  WHITE: "White",
  BLACK: "Black",
} as const;

export type Color = (typeof COLOR)[keyof typeof COLOR];

export const PIECE_TYPE = {
  PAWN: "Pawn",
  KNIGHT: "Knight",
  BISHOP: "Bishop",
  ROOK: "Rook",
  QUEEN: "Queen",
  KING: "King",
} as const;
export type PieceType = (typeof PIECE_TYPE)[keyof typeof PIECE_TYPE];

export const GAME_STATUS = {
  CHECK: "Check",
  CHECKMATE: "Checkmate",
  STALEMATE: "Stalemate",
  ONGOING: "Ongoing",
  GAME_OVER: "Game Over!!",
  GAME_STARTED: "Game has begun",
} as const;
export type GameStatus = (typeof GAME_STATUS)[keyof typeof GAME_STATUS];

export const GAME_ACTIONS = {
  START: "Start new game",
} as const;
export type GameActions = (typeof GAME_ACTIONS)[keyof typeof GAME_ACTIONS];
