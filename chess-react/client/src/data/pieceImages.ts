import { ChessPiece } from "lib/models/ChessPiece.ts";
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
import { COLOR, PIECE_TYPE } from "lib/types/enums.ts";

const imageMap: Map<string, string> = new Map([
  //Black Images
  [`${COLOR.BLACK} - ${PIECE_TYPE.PAWN}`, blackPawn],
  [`${COLOR.BLACK} - ${PIECE_TYPE.KNIGHT}`, blackKnight],
  [`${COLOR.BLACK} - ${PIECE_TYPE.BISHOP}`, blackBishop],
  [`${COLOR.BLACK} - ${PIECE_TYPE.QUEEN}`, blackQueen],
  [`${COLOR.BLACK} - ${PIECE_TYPE.KING}`, blackKing],
  [`${COLOR.BLACK} - ${PIECE_TYPE.ROOK}`, blackCastle],
  //White Images
  [`${COLOR.WHITE} - ${PIECE_TYPE.PAWN}`, whitePawn],
  [`${COLOR.WHITE} - ${PIECE_TYPE.KNIGHT}`, whiteKnight],
  [`${COLOR.WHITE} - ${PIECE_TYPE.BISHOP}`, whiteBishop],
  [`${COLOR.WHITE} - ${PIECE_TYPE.QUEEN}`, whiteQueen],
  [`${COLOR.WHITE} - ${PIECE_TYPE.KING}`, whiteKing],
  [`${COLOR.WHITE} - ${PIECE_TYPE.ROOK}`, whiteCastle],
]);

export const getImageForPiece = (piece: ChessPiece | undefined): string => {
  if (!piece) return "";
  const image = imageMap.get(`${piece.color} - ${piece.type}`) ?? defaultImage;
  return image;
};
