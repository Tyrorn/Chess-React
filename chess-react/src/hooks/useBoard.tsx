import BoardTile from "../components/BoardTile";
import { Color, PieceType } from "../types/enums";
import Piece from "../components/Piece.tsx";
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

const colKeys: Array<string> = ["A", "B", "C", "D", "E", "F", "G", "H"];
const pieceMap: Map<string, string> = new Map([
  //Black Pieces
  ["A8", `${Color.BLACK} - ${PieceType.ROOK}`],
  ["A7", `${Color.BLACK} - ${PieceType.PAWN}`],
  ["B8", `${Color.BLACK} - ${PieceType.KNIGHT}`],
  ["B7", `${Color.BLACK} - ${PieceType.PAWN}`],
  ["C8", `${Color.BLACK} - ${PieceType.BISHOP}`],
  ["C7", `${Color.BLACK} - ${PieceType.PAWN}`],
  ["D8", `${Color.BLACK} - ${PieceType.QUEEN}`],
  ["D7", `${Color.BLACK} - ${PieceType.PAWN}`],
  ["E8", `${Color.BLACK} - ${PieceType.KING}`],
  ["E7", `${Color.BLACK} - ${PieceType.PAWN}`],
  ["F8", `${Color.BLACK} - ${PieceType.BISHOP}`],
  ["F7", `${Color.BLACK} - ${PieceType.PAWN}`],
  ["G8", `${Color.BLACK} - ${PieceType.KNIGHT}`],
  ["G7", `${Color.BLACK} - ${PieceType.PAWN}`],
  ["H8", `${Color.BLACK} - ${PieceType.ROOK}`],
  ["H7", `${Color.BLACK} - ${PieceType.PAWN}`],
  //White Pieces
  ["A1", `${Color.WHITE} - ${PieceType.ROOK}`],
  ["A2", `${Color.WHITE} - ${PieceType.PAWN}`],
  ["B1", `${Color.WHITE} - ${PieceType.KNIGHT}`],
  ["B2", `${Color.WHITE} - ${PieceType.PAWN}`],
  ["C1", `${Color.WHITE} - ${PieceType.BISHOP}`],
  ["C2", `${Color.WHITE} - ${PieceType.PAWN}`],
  ["D1", `${Color.WHITE} - ${PieceType.QUEEN}`],
  ["D2", `${Color.WHITE} - ${PieceType.PAWN}`],
  ["E1", `${Color.WHITE} - ${PieceType.KING}`],
  ["E2", `${Color.WHITE} - ${PieceType.PAWN}`],
  ["F1", `${Color.WHITE} - ${PieceType.BISHOP}`],
  ["F2", `${Color.WHITE} - ${PieceType.PAWN}`],
  ["G1", `${Color.WHITE} - ${PieceType.KNIGHT}`],
  ["G2", `${Color.WHITE} - ${PieceType.PAWN}`],
  ["H1", `${Color.WHITE} - ${PieceType.ROOK}`],
  ["H2", `${Color.WHITE} - ${PieceType.PAWN}`],
]);

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

export const useBoard = () => {
  const setUp = () => {
    const squares: React.ReactNode[] = [];

    for (let row = 8; row > 0; row--) {
      colKeys.forEach((colKey) => {
        const pieceRef: string = pieceMap.get(colKey + row) ?? "";
        const imageRef: string = imageMap.get(pieceRef) ?? "";
        let piece: React.ReactElement<typeof Piece> | undefined;

        if (imageRef) piece = <Piece image={imageRef} />;

        squares.push(<BoardTile key={colKey + row} piece={piece} />);
      });
    }
    return squares;
  };

  return { setUp };
};
