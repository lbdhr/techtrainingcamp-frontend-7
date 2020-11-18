import React, { useEffect, useState } from 'react';
import GridContainer from './components/GridContainer/index';
import NumberContainer from './components/NumberContainer/index';
import Board from './utils/boardFunc';

function Main() {
  const [board, setBoard] = useState(new Board({ size: 4 }));

  const handleKeyDown = e => {
    if (e.keyCode >= 37 && e.keyCode <= 40) {
      switch (e.keyCode) {
        case 37: // left
          board.moveLeft();
          break;
        case 38: // up
          board.moveUp();
          break;
        case 39: // right
          board.moveRight();
          break;
        case 40: // down
          board.moveDown();
          break;
        default:
          break;
      }
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', e => handleKeyDown(e));
    return window.removeEventListener('keydown', e => handleKeyDown(e));
  });

  return (
    <div>
      <header>
        <h1>2048</h1>
        <a id="newgamebutton">New Game</a>
        <p>
          score : <span id="score">0</span>
        </p>
      </header>
      <GridContainer board={board.initBoard()} />
      <NumberContainer board={board} />
      <div style={{ width: '500px', margin: '10px auto', textAlign: 'center' }}>
        请使用键盘上的上、下、左、右的按键进行游戏。
      </div>
    </div>
  );
}

export default Main;
