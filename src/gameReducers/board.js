export default class Board {
  constructor({ board, score, bestScore, gameOver, isMoved }) {
    this.board = JSON.parse(JSON.stringify(board));
    this.score = score;
    this.bestScore = bestScore;
    this.gameOver = gameOver;
    this.isMoved = isMoved; // 判断棋子是否有移动，如果棋子都在一边，按键后也没有反应
  }
  // 查看棋盘是否已经满了
  isFullBoard = board => {
    for (let k of board) {
      if (k.includes(0)) return false;
    }
    return true;
  };
  // 查看棋盘是否移动过
  isBoardMoved = (preMatrix, newMatrix) => {
    return JSON.stringify(preMatrix) !== JSON.stringify(newMatrix);
  };

  // 查看游戏是否结束
  isGameOver = board => {
    const tmp = JSON.parse(JSON.stringify(board));
    const check = callback => {
      this.board = tmp;
      const isMoved = this.isBoardMoved(tmp, callback().board);
      this.board = tmp;
      return isMoved;
    };
    return !(
      check(() => this.move('up')) ||
      check(() => this.move('down')) ||
      check(() => this.move('right')) ||
      check(() => this.move('left'))
    );
  };
  // 生成随机数
  addRandomToBoard = () => {
    const { board } = this;
    const newBoard = JSON.parse(JSON.stringify(board));
    // 1.如果游戏结束，直接返回原board
    if (this.gameOver) return { board };
    // 2.如果棋盘没有发生移动，判断游戏是否结束
    if (!this.isMoved) {
      if (this.isGameOver(newBoard)) {
        this.gameOver = true;
        return { gameOver: true };
      }
      return { board };
    }
    // 3.正常增加一个随机数
    // 3.1 判断是否还有空格
    if (this.isFullBoard(newBoard)) {
      if (this.isGameOver(newBoard)) {
        this.gameOver = true;
        return { gameOver: true };
      }
      return { board: newBoard };
    }
    // 3.2 加随机数
    let randx = parseInt(Math.floor(Math.random() * newBoard.length));
    let randy = parseInt(Math.floor(Math.random() * newBoard.length));
    while (true) {
      if (newBoard[randx][randy] === 0) break;
      randx = parseInt(Math.floor(Math.random() * newBoard.length));
      randy = parseInt(Math.floor(Math.random() * newBoard.length));
    }
    let randNumber = Math.random() < 0.5 ? 2 : 4;
    newBoard[randx][randy] = randNumber;
    this.board = newBoard;
    return { board: newBoard };
  };

  // moveLeft
  moveLeft = () => {
    const { board } = this;
    const len = board.length;
    // 1.所有元素移动到左边
    let newBoard = [];
    for (let i = 0; i < len; i++) {
      let newRow = [];
      for (let j = board[i].length - 1; j >= 0; j--) {
        const val = board[i][j];
        if (val === 0) {
          newRow.push(val);
        } else {
          newRow.unshift(val);
        }
      }
      newBoard.push(newRow);
    }
    // 2.合并相同元素
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - 1; j++) {
        if (newBoard[i][j] > 0 && newBoard[i][j] === newBoard[i][j + 1]) {
          newBoard[i][j] *= 2;
          newBoard[i][j + 1] = 0;
          this.score += newBoard[i][j];
        } else if (newBoard[i][j] === 0 && newBoard[i][j + 1] > 0) {
          // 消除中间的0
          newBoard[i][j] = newBoard[i][j + 1];
          newBoard[i][j + 1] = 0;
        }
      }
    }
    this.board = newBoard;
    return newBoard;
  };

  // moveRight
  moveRight = () => {
    const { board } = this;
    const len = board.length;
    // 1.所有元素移动到右边
    let newBoard = [];
    for (let i = 0; i < len; i++) {
      let newRow = [];
      for (let j = 0; j < board[i].length; j++) {
        const val = board[i][j];
        if (val === 0) {
          newRow.unshift(val);
        } else {
          newRow.push(val);
        }
      }
      newBoard.push(newRow);
    }
    // 2.合并相同元素
    for (let i = 0; i < len; i++) {
      for (let j = len - 1; j >= 1; j--) {
        if (newBoard[i][j] > 0 && newBoard[i][j] === newBoard[i][j - 1]) {
          newBoard[i][j] *= 2;
          newBoard[i][j - 1] = 0;
          this.score += newBoard[i][j];
        } else if (newBoard[i][j] === 0 && newBoard[i][j - 1] > 0) {
          // 消除中间的0
          newBoard[i][j] = newBoard[i][j - 1];
          newBoard[i][j - 1] = 0;
        }
      }
    }
    this.board = newBoard;
    return newBoard;
  };

  // moveUp
  moveUp = () => {
    const { board } = this;
    const len = board.length;
    let newBoard = JSON.parse(JSON.stringify(board));
    // 1.全部上移
    for (let j = 0; j < len; j++) {
      for (let i = 0; i < len - 1; i++) {
        if (newBoard[i][j] === 0) {
          for (let k = i + 1; k < len; k++) {
            if (newBoard[k][j] > 0) {
              newBoard[i][j] = newBoard[k][j];
              newBoard[k][j] = 0;
              break;
            }
          }
        }
      }
    }
    // 2.合并相同值
    for (let j = 0; j < len; j++) {
      for (let i = 0; i < len - 1; i++) {
        if (newBoard[i][j] > 0 && newBoard[i][j] === newBoard[i + 1][j]) {
          newBoard[i][j] *= 2;
          newBoard[i + 1][j] = 0;
          this.score += newBoard[i][j];
        } else if (newBoard[i][j] === 0 && newBoard[i + 1][j] > 0) {
          newBoard[i][j] = newBoard[i + 1][j];
          newBoard[i + 1][j] = 0;
        }
      }
    }
    this.board = newBoard;
    return newBoard;
  };

  //moveDown
  moveDown = () => {
    const { board } = this;
    const len = board.length;
    let newBoard = JSON.parse(JSON.stringify(board));
    // 1.
    for (let j = 0; j < len; j++) {
      for (let i = len - 1; i >= 1; i--) {
        if (newBoard[i][j] === 0) {
          for (let k = i - 1; k >= 0; k--) {
            if (newBoard[k][j] > 0) {
              newBoard[i][j] = newBoard[k][j];
              newBoard[k][j] = 0;
              break;
            }
          }
        }
      }
    }
    //2.
    for (let j = 0; j < len; j++) {
      for (let i = len - 1; i >= 1; i--) {
        if (newBoard[i][j] > 0 && newBoard[i - 1][j] === newBoard[i][j]) {
          newBoard[i][j] *= 2;
          newBoard[i - 1][j] = 0;
          this.score += newBoard[i][j];
        } else if (newBoard[i][j] === 0 && newBoard[i - 1][j] > 0) {
          newBoard[i][j] = newBoard[i - 1][j];
          newBoard[i - 1][j] = 0;
        }
        continue;
      }
    }
    this.board = newBoard;
    return newBoard;
  };

  // 移动后进行gameover判断条件
  move = direction => {
    const prevBoard = JSON.parse(JSON.stringify(this.board));
    switch (direction) {
      case 'left':
        this.moveLeft();
        break;
      case 'right':
        this.moveRight();
        break;
      case 'up':
        this.moveUp();
        break;
      case 'down':
        this.moveDown();
        break;
      default:
        break;
    }
    const { board, score, bestScore } = this;
    const isMoved = this.isBoardMoved(prevBoard, board);
    const res = {
      board,
      score,
      bestScore: score > bestScore ? score : bestScore,
      isMoved,
    };
    if (isMoved) {
      res.prevBoard = prevBoard;
    }
    return res;
  };
}
