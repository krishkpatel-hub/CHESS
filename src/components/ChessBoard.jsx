import { files, getSquareName } from "../game/initialBoard.js";
import ChessSquare from "./ChessSquare.jsx";

function ChessBoard({ board, legalMoves, selectedSquare, selectSquare }) {
  return (
    <div className="relative flex w-full max-w-[min(86vw,620px)] flex-col items-center">
      <div className="absolute -inset-3 rounded-[1.25rem] bg-[conic-gradient(from_180deg,rgba(34,211,238,0.55),rgba(168,85,247,0.62),rgba(59,130,246,0.45),rgba(34,211,238,0.55))] opacity-80 blur-xl" />

      <div className="relative w-full rounded-[1.25rem] border border-cyan-200/35 bg-white/10 p-3 shadow-[0_0_42px_rgba(34,211,238,0.24),inset_0_0_30px_rgba(255,255,255,0.05)] backdrop-blur-xl">
        <div className="grid aspect-square grid-cols-8 overflow-hidden rounded-xl border border-white/15 bg-slate-950/70">
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

              return (
                <ChessSquare
                  key={`${file}${rank}`}
                  file={file}
                  rank={rank}
                  isLight={isLight}
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
