// 水平方向是否存在障碍物
export function isBlockOnHorizontal(row, col1, col2, board) {
  for (let i = col1 + 1; i < col2; i++) {
    if (board[row][i] !== 0) return false;
  }
  return true;
}
// 垂直方向是否存在障碍物
export function isBlockOnVertical(col, row1, row2, board) {
  for (let i = row1 + 1; i < row2; i++) {
    if (board[i][col] !== 0) return false;
  }
  return true;
}
// 判断是否能够左移
export function canMoveLeft(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 1; j < board.length; j++) {
      if (board[i][j] !== 0) {
        // 第一列不能移动
        if (board[i][j - 1] === 0 || board[i][j - 1] === board[i][j]) return true;
      }
    }
  }
  return false;
}
// 判断是否能够右移
export function canMoveRight(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = board.length - 2; j >= 0; j--) {
      if (board[i][j] === 0 || board[i][j + 1] === board[i][j]) {
        return true;
      }
    }
  }
  return false;
}

// 判断能否上移
export function canMoveUp(board) {
  for (let j = 0; j < board.length; j++) {
    for (let i = 1; i < board.length; i++) {
      if (board[i][j] !== 0) {
        if (board[i - 1][j] === 0 || board[i - 1][j] === board[i][j]) {
          return true;
        }
      }
    }
  }
  return false;
}

// 判断能否上移
export function canMoveDown(board) {
  for (let j = 0; j < board.length; j++) {
    for (let i = board.length - 1; i >= 0; i--) {
      if (board[i][j] !== 0) {
        if (board[i + 1][j] === 0 || board[i + 1][j] === board[i][j]) {
          return true;
        }
      }
    }
  }
  return false;
}

// 判断是否还有空间
function isSpace(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] === 0) return true;
    }
  }
  return false;
}
// 判断是否还能移动
function isMove(board) {
  if (isSpace(board)) return true;
  if (canMoveLeft(board) || canMoveRight(board) || canMoveUp(board) || canMoveDown(board))
    return true;
  return false;
}

export function isGameOver(board) {
  if (!isMove(board)) return true;
}
