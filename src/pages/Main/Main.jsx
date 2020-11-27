import React, { useEffect } from 'react';
import './main.css';
import GridContainer from '../../components/GridContainer';
import Button from '../../components/Button';
import Controller from '../../components/Controller';

export default function Main(props) {
  useEffect(() => {
    initBoard();
    console.log(props);
  }, []);

  const initBoard = () => {
    let isEmpty = true;
    for (let row of props.board) {
      for (let col of row) {
        if (col > 0) {
          isEmpty = false;
          break;
        }
      }
    }
    if (isEmpty) {
      props.onInit();
    }
  };

  return (
    <div>
      <header>
        <h1>2048</h1>
        <Button />
        <p>
          <span>score: {props.score}</span>
          <span>best score: {props.score}</span>
        </p>
      </header>
      <GridContainer />
      <Controller />
      {/* <Controler board={board.board} /> */}
    </div>
  );
}
