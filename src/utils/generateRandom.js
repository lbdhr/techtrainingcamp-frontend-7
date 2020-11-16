function generateRandom(board) {
  // 1.随机生成一个位置
  let randx = parseInt(Math.floor(Math.random() * 4));
  let randy = parseInt(Math.floor(Math.random() * 4));
  while (true) {
    if (board[randx][randy].number === 0) break;
    // 否则重新生成一个位置
    randx = parseInt(Math.floor(Math.random() * 4));
    randy = parseInt(Math.floor(Math.random() * 4));
  }
  // 2.随机生成一个随机数字
  let randNumber = Math.random() < 0.5 ? 2 : 4;
  board[randx][randy].number = randNumber;
  // 3.显示
  showRandomAnimation(randx, randy, randNumber);
}

// 封装一个动画效果
function showRandomAnimation(randx, randy, randNumber) {}
