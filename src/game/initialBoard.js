export const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

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

export function createInitialBoard() {
  return Array.from({ length: 8 }, (_, row) =>
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
}

export function getSquareName(row, col) {
  return `${files[col]}${8 - row}`;
}
