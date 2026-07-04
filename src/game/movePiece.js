import { isLegalMove } from "./chessRules.js";

export function movePiece(board, from, to) {
  if (!isLegalMove(board, from, to)) {
    return board;
  }

  const nextBoard = board.map((row) => [...row]);
  nextBoard[to.row][to.col] = nextBoard[from.row][from.col];
  nextBoard[from.row][from.col] = null;
  return nextBoard;
}
