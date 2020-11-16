import React from 'react';
import './assets/css/App.css';

function App() {
  return (
    <div class="flex">
      <h1>2048</h1>
      <div class="setting">
        <a href="#" id="newGameBtn">
          重新开始
        </a>
        <select class="difficulty-mode">
          <option value="easy">游戏难度</option>
          <option value="easy">简单</option>
          <option value="middle">普通</option>
          <option value="hard">困难</option>
        </select>
        <select class="game-mode">
          <option value="classic">游戏模式</option>
          <option value="classic">经典模式</option>
          <option value="combat">对战模式</option>
        </select>
      </div>
      <p>
        score: <span id="score">0</span>
      </p>
      <div class="container">
        <div class="grid-cell" id="grid-cell-0-0"></div>
        <div class="grid-cell" id="grid-cell-0-1"></div>
        <div class="grid-cell" id="grid-cell-0-2"></div>
        <div class="grid-cell" id="grid-cell-0-3"></div>
        <div class="grid-cell" id="grid-cell-1-0"></div>
        <div class="grid-cell" id="grid-cell-1-1"></div>
        <div class="grid-cell" id="grid-cell-1-2"></div>
        <div class="grid-cell" id="grid-cell-1-3"></div>
        <div class="grid-cell" id="grid-cell-2-0"></div>
        <div class="grid-cell" id="grid-cell-2-1"></div>
        <div class="grid-cell" id="grid-cell-2-2"></div>
        <div class="grid-cell" id="grid-cell-2-3"></div>
        <div class="grid-cell" id="grid-cell-3-0"></div>
        <div class="grid-cell" id="grid-cell-3-1"></div>
        <div class="grid-cell" id="grid-cell-3-2"></div>
        <div class="grid-cell" id="grid-cell-3-3"></div>
      </div>
    </div>
  );
}

export default App;
