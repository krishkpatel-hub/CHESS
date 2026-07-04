import { files, getSquareName } from "../game/initialBoard.js";
import { useChessGame } from "../game/useChessGame.js";
import ChessSquare from "./ChessSquare.jsx";

function ChessBoard() {
  const { board, legalMoves, resetBoard, selectedSquare, selectSquare, turn } = useChessGame();

  return (
    <div className="relative flex w-full max-w-[min(86vw,620px)] flex-col items-center gap-4">
      <div className="relative z-10 flex w-full items-center justify-between gap-3 rounded border border-white/10 bg-slate-950/45 px-4 py-3 text-left shadow-[0_0_24px_rgba(34,211,238,0.12)] backdrop-blur-md">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/80">
            Current Turn
          </p>
          <p className="mt-1 text-lg font-bold capitalize text-white">{turn}</p>
        </div>

        <button
          type="button"
          onClick={resetBoard}
          className="h-10 rounded border border-fuchsia-300/40 bg-fuchsia-300/10 px-4 text-sm font-semibold text-fuchsia-100 transition hover:border-cyan-200/70 hover:bg-cyan-300/15 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-[#07080f]"
        >
          Reset Board
        </button>
      </div>

      <div className="absolute inset-x-[-0.75rem] bottom-[-0.75rem] top-20 rounded-[1.25rem] bg-[conic-gradient(from_180deg,rgba(34,211,238,0.55),rgba(168,85,247,0.62),rgba(59,130,246,0.45),rgba(34,211,238,0.55))] opacity-80 blur-xl" />

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
