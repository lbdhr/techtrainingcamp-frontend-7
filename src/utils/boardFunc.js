import {
  isBlockOnHorizontal,
  isBlockOnVertical,
  canMoveLeft,
  canMoveRight,
  canMoveUp,
  canMoveDown,
} from './moveFunc';

export default class Board {
  constructor({ size = 4 }) {
    this.size = size;
    this.board = [];
    this.score = 0;
    this.flag = []; // 存储true/false判断每个点是否已经移动过
  }
  initBoard() {
    for (let i = 0; i < this.size; i++) {
      this.board[i] = [];
      this.flag[i] = [];
      for (let j = 0; j < this.size; j++) {
        this.board[i][j] = 0;
        this.flag[i][j] = false;
      }
    }
    this.getRandom();
    this.getRandom();
    return this.board;
  }

  getRandom() {
    // 1.随机生成一个位置
    let randx = parseInt(Math.floor(Math.random() * this.size));
    let randy = parseInt(Math.floor(Math.random() * this.size));
    while (true) {
      if (this.board[randx][randy] === 0) break;
      // 否则重新生成一个位置
      randx = parseInt(Math.floor(Math.random() * this.size));
      randy = parseInt(Math.floor(Math.random() * this.size));
    }
    // 2.随机生成一个随机数字
    let randNumber = Math.random() < 0.5 ? 2 : 4;
    this.board[randx][randy] = randNumber;
  }

  moveLeft() {
    if (!canMoveLeft(this.board)) {
      this.getRandom();
      return;
    }
    // moveLeft
    for (let i = 0; i < this.size; i++) {
      for (let j = 1; j < this.size; j++) {
        for (let k = 0; k < j; k++) {
          if (this.board[i][k] === 0 && isBlockOnHorizontal(i, k, j, this.board)) {
            // 1.移动到没有数字的地方
            this.board[i][k] = this.board[i][j];
            this.board[i][j] = 0;
            continue;
          } else if (
            this.board[i][k] === this.board[i][j] &&
            isBlockOnHorizontal(i, k, j, this.board) &&
            !this.flag[i][k]
          ) {
            // 2.合并相同的
            this.board[i][k] *= 2;
            this.board[i][j] = 0;
            // 3.add score
            this.score += this.board[i][k];
            this.flag[i][k] = true;
            continue;
          }
        }
      }
    }
    this.initFlag();
    this.getRandom();
  }

  moveRight() {
    if (!canMoveRight(this.board)) {
      this.getRandom();
      return;
    }
    for (let i = 0; i < this.size; i++) {
      for (let j = this.size - 2; j >= 0; j--) {
        if (this.board[i][j] !== 0) {
          for (let k = this.size - 1; k > j; k--) {
            if (this.board[i][k] === 0 && isBlockOnHorizontal(i, j, k, this.board)) {
              //1.末位置为0且路径无障碍, 更新到末位置
              this.board[i][k] = this.board[i][j];
              this.board[i][j] = 0;
              continue;
            } else if (
              this.board[i][k] === this.board[i][j] &&
              isBlockOnHorizontal(i, j, k, this.board) &&
              !this.flag[i][k]
            ) {
              // 2.末位置和当前位置数值相同，合并
              this.board[i][k] *= 2;
              this.board[i][j] = 0;
              // 3.add score
              this.score += this.board[i][k];
              this.flag[i][k] = true;
              continue;
            }
          }
        }
      }
    }
    this.initFlag();
    this.getRandom();
  }

  moveUp() {
    if (!canMoveUp(this.board)) {
      this.getRandom();
      return;
    }
    for (let j = 0; j < this.size; j++) {
      for (let i = 1; i < this.size; i++) {
        if (this.board[i][j] !== 0) {
          for (let k = 0; k < i; k++) {
            if (this.board[k][j] === 0 && isBlockOnVertical(j, k, i, this.board)) {
              // 1.目标位置为空且路径无障碍
              this.board[k][j] = this.board[i][j];
              this.board[i][j] = 0;
              continue;
            } else if (
              this.board[k][j] === this.board[i][j] &&
              isBlockOnVertical(j, k, i, this.board) &&
              !this.flag[k][j]
            ) {
              // 2.两数相等，合并
              this.board[k][j] *= 2;
              this.board[i][j] = 0;
              // 3.add score
              this.score += this.board[k][j];
              this.flag[k][j] = true;
              continue;
            }
          }
        }
      }
    }
    this.initFlag();
    this.getRandom();
  }

  moveDown() {
    if (!canMoveDown) {
      this.getRandom();
      return;
    }
    for (let j = 0; j < this.size; j++) {
      for (let i = this.size - 2; i >= 0; i--) {
        if (this.board[i][j] !== 0) {
          for (let k = this.size - 1; k > i; k--) {
            if (this.board[k][j] === 0 && isBlockOnVertical(j, i, k, this.board)) {
              this.board[k][j] = this.board[i][j];
              this.board[i][j] = 0;
            } else if (
              this.board[k][j] === this.board[i][j] &&
              isBlockOnVertical(j, i, k, this.board) &&
              !this.flag[k][j]
            ) {
              this.board[k][j] *= 2;
              this.board[i][j] = 0;
              this.score += this.board[k][j];
              this.flag[k][j] = true;
              continue;
            }
          }
        }
      }
    }
    this.initFlag();
    this.getRandom();
  }

  // flag数组初始化
  initFlag() {
    this.flag.map(item => item.fill(false));
  }
}
