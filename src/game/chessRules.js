const boardSize = 8;

function isOnBoard(row, col) {
  return row >= 0 && row < boardSize && col >= 0 && col < boardSize;
}

function isSameSquare(from, to) {
  return from.row === to.row && from.col === to.col;
}

function isOwnPiece(board, piece, to) {
  return board[to.row][to.col]?.color === piece.color;
}

function isPathClear(board, from, to) {
  const rowStep = Math.sign(to.row - from.row);
  const colStep = Math.sign(to.col - from.col);
  let row = from.row + rowStep;
  let col = from.col + colStep;

  while (row !== to.row || col !== to.col) {
    if (board[row][col]) {
      return false;
    }

    row += rowStep;
    col += colStep;
  }

  return true;
}

function isLegalPawnMove(board, piece, from, to) {
  const rowDelta = to.row - from.row;
  const colDelta = to.col - from.col;
  const direction = piece.color === "white" ? -1 : 1;
  const startRow = piece.color === "white" ? 6 : 1;
  const targetPiece = board[to.row][to.col];

  if (colDelta === 0 && rowDelta === direction && !targetPiece) {
    return true;
  }

  if (
    colDelta === 0 &&
    rowDelta === direction * 2 &&
    from.row === startRow &&
    !targetPiece &&
    !board[from.row + direction][from.col]
  ) {
    return true;
  }

  return (
    Math.abs(colDelta) === 1 &&
    rowDelta === direction &&
    Boolean(targetPiece) &&
    targetPiece.color !== piece.color
  );
}

function isLegalRookMove(board, from, to) {
  const isStraight = from.row === to.row || from.col === to.col;
  return isStraight && isPathClear(board, from, to);
}

function isLegalBishopMove(board, from, to) {
  const rowDelta = Math.abs(to.row - from.row);
  const colDelta = Math.abs(to.col - from.col);
  return rowDelta === colDelta && isPathClear(board, from, to);
}

function isLegalKnightMove(from, to) {
  const rowDelta = Math.abs(to.row - from.row);
  const colDelta = Math.abs(to.col - from.col);
  return (
    (rowDelta === 2 && colDelta === 1) ||
    (rowDelta === 1 && colDelta === 2)
  );
}

function isLegalQueenMove(board, from, to) {
  return isLegalRookMove(board, from, to) || isLegalBishopMove(board, from, to);
}

function isLegalKingMove(from, to) {
  const rowDelta = Math.abs(to.row - from.row);
  const colDelta = Math.abs(to.col - from.col);
  return rowDelta <= 1 && colDelta <= 1;
}

function getOpponent(color) {
  return color === "white" ? "black" : "white";
}

function cloneBoard(board) {
  return board.map((row) => [...row]);
}

function applyMove(board, from, to) {
  const nextBoard = cloneBoard(board);
  nextBoard[to.row][to.col] = nextBoard[from.row][from.col];
  nextBoard[from.row][from.col] = null;
  return nextBoard;
}

function isPseudoLegalMove(board, from, to) {
  if (!from || !to) {
    return false;
  }

  if (!isOnBoard(from.row, from.col) || !isOnBoard(to.row, to.col) || isSameSquare(from, to)) {
    return false;
  }

  const piece = board[from.row][from.col];

  if (!piece || isOwnPiece(board, piece, to)) {
    return false;
  }

  switch (piece.name) {
    case "pawn":
      return isLegalPawnMove(board, piece, from, to);
    case "rook":
      return isLegalRookMove(board, from, to);
    case "bishop":
      return isLegalBishopMove(board, from, to);
    case "knight":
      return isLegalKnightMove(from, to);
    case "queen":
      return isLegalQueenMove(board, from, to);
    case "king":
      return isLegalKingMove(from, to);
    default:
      return false;
  }
}

export function findKing(board, color) {
  for (let row = 0; row < boardSize; row += 1) {
    for (let col = 0; col < boardSize; col += 1) {
      const piece = board[row][col];

      if (piece?.name === "king" && piece.color === color) {
        return { row, col };
      }
    }
  }

  return null;
}

export function isKingInCheck(board, color) {
  const kingSquare = findKing(board, color);

  if (!kingSquare) {
    return false;
  }

  const opponent = getOpponent(color);

  for (let row = 0; row < boardSize; row += 1) {
    for (let col = 0; col < boardSize; col += 1) {
      const piece = board[row][col];

      if (piece?.color === opponent && isPseudoLegalMove(board, { row, col }, kingSquare)) {
        return true;
      }
    }
  }

  return false;
}

export function isLegalMove(board, from, to) {
  if (!isPseudoLegalMove(board, from, to)) {
    return false;
  }

  const piece = board[from.row][from.col];
  const targetPiece = board[to.row][to.col];

  if (targetPiece?.name === "king") {
    return false;
  }

  return !isKingInCheck(applyMove(board, from, to), piece.color);
}

export function getLegalMoves(board, from) {
  if (!from || !board[from.row][from.col]) {
    return [];
  }

  const moves = [];

  for (let row = 0; row < boardSize; row += 1) {
    for (let col = 0; col < boardSize; col += 1) {
      const to = { row, col };

      if (isLegalMove(board, from, to)) {
        moves.push(to);
      }
    }
  }

  return moves;
}

export function getAllLegalMoves(board, color) {
  const moves = [];

  for (let row = 0; row < boardSize; row += 1) {
    for (let col = 0; col < boardSize; col += 1) {
      const piece = board[row][col];

      if (piece?.color === color) {
        const from = { row, col };

        getLegalMoves(board, from).forEach((to) => {
          moves.push({ from, to, piece });
        });
      }
    }
  }

  return moves;
}

export function getGameStatus(board, turn) {
  const checkedKingSquare = findKing(board, turn);
  const inCheck = isKingInCheck(board, turn);
  const legalMoves = getAllLegalMoves(board, turn);
  const hasLegalMoves = legalMoves.length > 0;
  const checkmate = inCheck && !hasLegalMoves;
  const stalemate = !inCheck && !hasLegalMoves;

  return {
    checkedKingSquare: inCheck ? checkedKingSquare : null,
    checkmate,
    gameOver: checkmate || stalemate,
    inCheck,
    stalemate,
    winner: checkmate ? getOpponent(turn) : null,
  };
}
