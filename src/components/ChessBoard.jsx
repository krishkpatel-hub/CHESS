import ChessSquare from "./ChessSquare.jsx";

const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

const pieceSymbols = {
  white: {
    king: "♔",
    queen: "♕",
    rook: "♖",
    bishop: "♗",
    knight: "♘",
    pawn: "♙",
  },
  black: {
    king: "♚",
    queen: "♛",
    rook: "♜",
    bishop: "♝",
    knight: "♞",
    pawn: "♟",
  },
};

const backRank = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"];

function createPiece(color, name) {
  return {
    color,
    name,
    symbol: pieceSymbols[color][name],
  };
}

const startingPosition = Array.from({ length: 8 }, (_, row) =>
  Array.from({ length: 8 }, (_, col) => {
    if (row === 0) {
      return createPiece("black", backRank[col]);
    }

    if (row === 1) {
      return createPiece("black", "pawn");
    }

    if (row === 6) {
      return createPiece("white", "pawn");
    }

    if (row === 7) {
      return createPiece("white", backRank[col]);
    }

    return null;
  }),
);

function ChessBoard() {
  return (
    <div className="relative w-full max-w-[min(86vw,620px)]">
      <div className="absolute -inset-3 rounded-[1.25rem] bg-[conic-gradient(from_180deg,rgba(34,211,238,0.55),rgba(168,85,247,0.62),rgba(59,130,246,0.45),rgba(34,211,238,0.55))] opacity-80 blur-xl" />

      <div className="relative rounded-[1.25rem] border border-cyan-200/35 bg-white/10 p-3 shadow-[0_0_42px_rgba(34,211,238,0.24),inset_0_0_30px_rgba(255,255,255,0.05)] backdrop-blur-xl">
        <div className="grid aspect-square grid-cols-8 overflow-hidden rounded-xl border border-white/15 bg-slate-950/70">
          {startingPosition.flatMap((row, rowIndex) =>
            row.map((piece, colIndex) => {
              const rank = 8 - rowIndex;
              const file = files[colIndex];
              const isLight = (rowIndex + colIndex) % 2 === 0;

              return (
                <ChessSquare
                  key={`${file}${rank}`}
                  file={file}
                  rank={rank}
                  isLight={isLight}
                  piece={piece}
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
