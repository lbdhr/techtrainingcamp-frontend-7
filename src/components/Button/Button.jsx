import React, { useEffect } from 'react';
import './button.css';

export default function Button(props) {
  let timer = null;
  //悔棋
  const handleRetreat = () => {
    if (props.recordLength > 3) {
      props.onRetreat(-2);
    }
  };
  const handleMode = () => {
    timer = setInterval(function () {
      if (props.gameOver) clearInterval(timer);
      props.onAddRandom('block');
    }, 1000);
  };
  const clearMode = () => {
    clearInterval(timer);
  };
  useEffect(() => {
    if (props.gameOver) clearMode();
  });
  return (
    <div>
      <button onClick={props.onReset}>重新开始</button>
      <button onClick={handleRetreat}>悔棋</button>
      <button onClick={props.clickChange}>上传分数</button>
      <button className="difficultMode" onClick={handleMode}>
        噩梦模式
      </button>
    </div>
  );
}
