import React, { useEffect, useState } from 'react';
import GridContainer from './components/GridContainer';
import Board from './utils/boardFunc';

class Main extends React.Component {
  state = {
    board: new Board({ size: 4 }),
  };
  handleNewGame = () => {
    this.setState({
      board: new Board({ size: 4 }),
    });
  };
  handleKeyDown = e => {
    if (e.keyCode >= 37 && e.keyCode <= 40) {
      switch (e.keyCode) {
        case 37: // left
          this.setState({
            board: this.state.board.moveLeft(),
          });
          break;
        case 38: // up
          this.setState({
            board: this.state.board.moveUp(),
          });
          break;
        case 39: // right
          this.setState({
            board: this.state.board.moveRight(),
          });
          break;
        case 40: // down
          this.setState({
            board: this.state.board.moveDown(),
          });
          break;
        default:
          break;
      }
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', e => {
      this.handleKeyDown(e);
    });
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', e => {
      this.handleKeyDown(e);
    });
  }

  render() {
    let { board } = this.state;
    return (
      <div>
        <header>
          <h1>2048</h1>
          <a id="newgamebutton" onClick={this.handleNewGame}>
            New Game
          </a>
          <p>
            score: <span id="score">0</span>
          </p>
        </header>
        <GridContainer board={board.board} />
        {/* 页面控制器 */}
        {/* <Controler board={board.board} /> */}
      </div>
    );
  }
}

export default Main;
