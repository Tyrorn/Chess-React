import { Color, PieceType } from "../types/enums";
import blackBishop from "../assets/blackBishop.png";
import blackCastle from "../assets/blackCastle.png";
import blackKing from "../assets/blackKing.png";
import blackKnight from "../assets/blackKnight.png";
import blackPawn from "../assets/blackPawn.png";
import blackQueen from "../assets/blackQueen.png";
import whiteBishop from "../assets/whiteBishop.png";
import whiteCastle from "../assets/whiteCastle.png";
import whiteKing from "../assets/whiteKing.png";
import whiteKnight from "../assets/whiteKnight.png";
import whitePawn from "../assets/whitePawn.png";
import whiteQueen from "../assets/whiteQueen.png";
import defaultImage from "../assets/whiteQueen.png";

const imageMap: Map<string, string> = new Map([
  //Black Images
  [`${Color.BLACK} - ${PieceType.PAWN}`, blackPawn],
  [`${Color.BLACK} - ${PieceType.KNIGHT}`, blackKnight],
  [`${Color.BLACK} - ${PieceType.BISHOP}`, blackBishop],
  [`${Color.BLACK} - ${PieceType.QUEEN}`, blackQueen],
  [`${Color.BLACK} - ${PieceType.KING}`, blackKing],
  [`${Color.BLACK} - ${PieceType.ROOK}`, blackCastle],
  //White Images
  [`${Color.WHITE} - ${PieceType.PAWN}`, whitePawn],
  [`${Color.WHITE} - ${PieceType.KNIGHT}`, whiteKnight],
  [`${Color.WHITE} - ${PieceType.BISHOP}`, whiteBishop],
  [`${Color.WHITE} - ${PieceType.QUEEN}`, whiteQueen],
  [`${Color.WHITE} - ${PieceType.KING}`, whiteKing],
  [`${Color.WHITE} - ${PieceType.ROOK}`, whiteCastle],
]);

export const getImageForPiece = (piece: string): string => {
  return imageMap.get(piece) ?? defaultImage;
};
