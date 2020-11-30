import React, { useEffect, useRef } from 'react';
import './main.css';
import GridContainer from '../../components/GridContainer';
import Button from '../../components/Button';
import Controller from '../../components/Controller';

function Main(props) {

  let scoreDetails = useRef({});

  useEffect(() => {
    initBoard();
    console.log(props);
    return () => {
      console.log(`I have been unmounted!, score: ${scoreDetails.current.score}`);
      props.uploadSocre(scoreDetails.current).then(
          (res) => console.log("分数已上传！"),
          (err) => console.log("分数上传失败！")
      );
    }
  }, []);

  useEffect( () => {
    scoreDetails.current = {
      username: props.detailsToMain.username,
      mode: props.detailsToMain.mode,
      score: props.score
    };
  }, [props]);

  const clickChange = () => {
    console.log(`I have been clicked!, score: ${scoreDetails.current.score}`);
    props.uploadSocre(scoreDetails.current).then(
        (res) => alert("分数已上传！"),
        (err) => alert("分数上传失败！")
    );
  }

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
      <button className="btn btn-primary btn-lg" onClick={clickChange}>保存分数！</button>
      <Controller />
      {/* <Controler board={board.board} /> */}
    </div>
  );
}

export default Main