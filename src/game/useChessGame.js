import { useState } from "react";
import { getLegalMoves, isLegalMove } from "./chessRules.js";
import { createInitialBoard } from "./initialBoard.js";
import { movePiece } from "./movePiece.js";

function getNextTurn(turn) {
  return turn === "white" ? "black" : "white";
}

function canSelectPiece(board, row, col, turn) {
  return board[row][col]?.color === turn;
}

export function useChessGame() {
  const [board, setBoard] = useState(() => createInitialBoard());
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [turn, setTurn] = useState("white");
  const legalMoves = getLegalMoves(board, selectedSquare);

  function selectSquare(row, col) {
    if (canSelectPiece(board, row, col, turn)) {
      setSelectedSquare({ row, col });
      return;
    }

    if (!isLegalMove(board, selectedSquare, { row, col })) {
      return;
    }

    setBoard((currentBoard) => movePiece(currentBoard, selectedSquare, { row, col }));
    setSelectedSquare(null);
    setTurn((currentTurn) => getNextTurn(currentTurn));
  }

  function resetBoard() {
    setBoard(createInitialBoard());
    setSelectedSquare(null);
    setTurn("white");
  }

  return {
    board,
    legalMoves,
    resetBoard,
    selectedSquare,
    selectSquare,
    turn,
  };
}
