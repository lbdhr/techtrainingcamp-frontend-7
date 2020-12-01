import React from 'react';
import './button.css';

export default function Button(props) {
  //悔棋
  const handleRetreat = () => {
    if (props.recordLength > 3) {
      props.onRetreat(-2);
    }
  };
  return (
    <div>
      <button onClick={props.onReset}>重新开始</button>
      <button onClick={handleRetreat}>悔棋</button>
      <button onClick={props.clickChange}>上传分数</button>
    </div>
  );
}
