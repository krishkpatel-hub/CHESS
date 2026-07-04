import { files, getSquareName } from "../game/initialBoard.js";
import ChessSquare from "./ChessSquare.jsx";

function ChessBoard({ board, checkedKingSquare, legalMoves, selectedSquare, selectSquare }) {
  return (
    <div className="relative flex w-full max-w-[min(92vw,640px)] flex-col items-center">
      <div className="absolute -inset-2 rounded-[1.1rem] bg-[#000]/35 blur-xl" />

      <div className="relative w-full rounded-[1.1rem] border border-[#4b473b] bg-[#1a1915] p-2 shadow-[0_24px_80px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(244,239,228,0.08)] sm:p-3">
        <div className="grid aspect-square grid-cols-8 overflow-hidden rounded-lg border border-[#2b2a25] bg-[#0f100e]">
          {board.flatMap((row, rowIndex) =>
            row.map((piece, colIndex) => {
              const rank = 8 - rowIndex;
              const file = files[colIndex];
              const isLight = (rowIndex + colIndex) % 2 === 0;
              const isSelected =
                selectedSquare?.row === rowIndex && selectedSquare?.col === colIndex;
              const isLegalDestination = legalMoves.some(
                (move) => move.row === rowIndex && move.col === colIndex,
              );
              const isCheckedKing =
                checkedKingSquare?.row === rowIndex && checkedKingSquare?.col === colIndex;

              return (
                <ChessSquare
                  key={`${file}${rank}`}
                  file={file}
                  rank={rank}
                  isLight={isLight}
                  isCheckedKing={isCheckedKing}
                  isLegalDestination={isLegalDestination}
                  isSelected={isSelected}
                  onSelect={() => selectSquare(rowIndex, colIndex)}
                  piece={piece}
                  squareName={getSquareName(rowIndex, colIndex)}
                />
              );
            }),
          )}
        </div>
      </div>
    </div>
  );
}

export default ChessBoard;
