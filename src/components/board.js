class Board {
  constructor({ size = 4, board }) {
    this.size = size;
    this.board = board ? board : [];
    if (!this.board.length) {
      this.initBoard();
      this.generateRandom(this.board);
      this.generateRandom(this.board);
    }
  }

  // 初始化矩阵
  initBoard() {
    for (let i = 0; i < this.size; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.size; j++) {
        this.board[i][j] = 0;
      }
    }
  }

  //生成随机数(更新数组number和位置)
  generateRandom(board) {
    // 1.随机生成一个位置
    let randx = parseInt(Math.floor(Math.random() * board.length - 1));
    let randy = parseInt(Math.floor(Math.random() * board.length - 1));
    while (true) {
      if (board[randx][randy] === 0) break;
      // 否则重新生成一个位置
      randx = parseInt(Math.floor(Math.random() * board.length - 1));
      randy = parseInt(Math.floor(Math.random() * board.length - 1));
    }
    // 2.随机生成一个随机数字
    let randNumber = Math.random() < 0.5 ? 2 : 4;
    board[randx][randy] = randNumber;
  }

  //按照move方向移动数组
  moveBoard(move) {
    switch (move) {
      case 38: // 上
        break;
      case 40: // 下
        break;
      case 37: // 左
        break;
      case 39: // 右
        break;
      default:
        break;
    }
  }
}

export default Board;
