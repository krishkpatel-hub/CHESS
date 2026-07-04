import { useState } from "react";
import { getLegalMoves, isLegalMove } from "./chessRules.js";
import { createInitialBoard } from "./initialBoard.js";
import { movePiece } from "./movePiece.js";
import { getSquareName } from "./initialBoard.js";

function getNextTurn(turn) {
  return turn === "white" ? "black" : "white";
}

function canSelectPiece(board, row, col, turn) {
  return board[row][col]?.color === turn;
}

const pieceNotation = {
  bishop: "B",
  king: "K",
  knight: "N",
  pawn: "P",
  queen: "Q",
  rook: "R",
};

export function useChessGame() {
  const [board, setBoard] = useState(() => createInitialBoard());
  const [capturedPieces, setCapturedPieces] = useState([]);
  const [moveHistory, setMoveHistory] = useState([]);
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

    const selectedPiece = board[selectedSquare.row][selectedSquare.col];
    const capturedPiece = board[row][col];
    const from = getSquareName(selectedSquare.row, selectedSquare.col);
    const to = getSquareName(row, col);

    setBoard((currentBoard) => movePiece(currentBoard, selectedSquare, { row, col }));
    setCapturedPieces((currentPieces) =>
      capturedPiece ? [...currentPieces, capturedPiece] : currentPieces,
    );
    setMoveHistory((currentHistory) => [
      ...currentHistory,
      {
        color: selectedPiece.color,
        from,
        piece: selectedPiece.name,
        to,
        notation: `${pieceNotation[selectedPiece.name]} ${from}${capturedPiece ? "x" : "-"}${to}`,
      },
    ]);
    setSelectedSquare(null);
    setTurn((currentTurn) => getNextTurn(currentTurn));
  }

  function resetBoard() {
    setBoard(createInitialBoard());
    setCapturedPieces([]);
    setMoveHistory([]);
    setSelectedSquare(null);
    setTurn("white");
  }

  return {
    board,
    capturedPieces,
    legalMoves,
    moveHistory,
    resetBoard,
    selectedSquare,
    selectSquare,
    turn,
  };
}
