import React, { useEffect, useRef } from 'react';
import './main.css';
import GridContainer from '../../components/GridContainer';
import Button from '../../components/Button';
import Controller from '../../components/Controller';
import GameOver from '../../components/GameOver';

function Main(props) {
  let scoreDetails = useRef({});

  useEffect(() => {
    if (props.detailsToMain.mode === 'online') {
      props.onReset();
    }
    initBoard();
    console.log(props);
    return () => {
      console.log(`I have been unmounted!, score: ${scoreDetails.current.score}`);
      props.uploadSocre(scoreDetails.current).then(
        res => console.log('分数已上传！'),
        err => console.log('分数上传失败！')
      );
    };
  }, []);

  useEffect(() => {
    scoreDetails.current = {
      username: props.detailsToMain.username,
      mode: props.detailsToMain.mode,
      score: props.score,
    };
    if (props.detailsToMain.mode === 'online') {
      let onlineDetails = {
        username: props.detailsToMain.username,
        score: props.score,
        board: props.board,
      };
      console.log('online mode to transmit!');
      props.submitRes(onlineDetails);
    }
  }, [props.score]);

  const clickChange = () => {
    console.log(`I have been clicked!, score: ${scoreDetails.current.score}`);
    props.uploadSocre(scoreDetails.current).then(
      res => alert('分数已上传！'),
      err => alert('分数上传失败！')
    );
  };

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
        <Button clickChange={clickChange} />
        <p>
          <span>score: {props.score}</span>
          <span>best score: {props.score}</span>
        </p>
      </header>
      <GridContainer />
      {/*<button className="btn btn-primary btn-lg" onClick={clickChange}>保存分数！</button>*/}
      <Controller />
      <GameOver />
      {/* <Controler board={board.board} /> */}
    </div>
  );
}

export default Main;
