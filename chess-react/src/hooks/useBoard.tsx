import BoardTile from "../components/BoardTile";
import { Color, PieceType } from "../types/enums";
import Piece from "../components/Piece.tsx";
import blackBishop from "../assets/blackBishop.png";
import blackCastle from "../assets/blackCastle.png";
import blackKing from "../assets/blackKing.png";
import blackKnight from "../assets/blackKnight.png";
import blackPawn from "../assets/blackPawn.png";
import blackQueen from "../assets/blackQueen.png";

const colKeys: Array<string> = ["A", "B", "C", "D", "E", "F", "G", "H"];
const pieceMap: Map<string, string> = new Map([
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
]);

const imageMap: Map<string, string> = new Map([
  [`${Color.BLACK} - ${PieceType.PAWN}`, blackPawn],
  [`${Color.BLACK} - ${PieceType.KNIGHT}`, blackKnight],
  [`${Color.BLACK} - ${PieceType.BISHOP}`, blackBishop],
  [`${Color.BLACK} - ${PieceType.QUEEN}`, blackQueen],
  [`${Color.BLACK} - ${PieceType.KING}`, blackKing],
  [`${Color.BLACK} - ${PieceType.ROOK}`, blackCastle],
]);

export const useBoard = () => {
  const setUp = () => {
    const squares: React.ReactNode[] = [];

    for (let row = 8; row > -1; row--) {
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
