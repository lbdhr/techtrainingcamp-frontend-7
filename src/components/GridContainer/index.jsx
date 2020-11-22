import React, { createRef, useEffect } from 'react';
import './gridContainer.css';

// 1.获得每个点的定位
const cellSpace = 5;
const cellLength = 90;
const getPosition = i => {
  return cellSpace + i * (cellSpace * 2 + cellLength);
};

function GridContainer(props) {
  const { board } = props;

  // 布局格
  const gridCell = board.map((row, rowIndex) => {
    return (
      <div key={rowIndex}>
        {row.map((col, colIndex) => (
          <div key={colIndex} className="grid-cell"></div>
        ))}
      </div>
    );
  });

  // 游戏格
  let cellArr = [];
  props.board.map((row, indexRow) => {
    row.map((col, indexCol) => {
      let cellInfo = {
        x: indexRow,
        y: indexCol,
        value: col,
      };
      if (col > 0) {
        cellArr.push(<NumberCell key={col + indexCol} cellInfo={cellInfo} board={board} />);
      }
    });
  });

  return (
    <div className="grid-container">
      {gridCell}
      {cellArr.map(item => item)}
    </div>
  );
}

function NumberCell(props) {
  const cellRef = createRef();

  useEffect(() => {
    const { cellInfo } = props;
    cellRef.current.style.top = getPosition(cellInfo['x']) + 'px';
    cellRef.current.style.left = getPosition(cellInfo['y']) + 'px';
    cellRef.current.innerHTML = cellInfo['value'];
  });

  return <div className="number-cell" ref={cellRef}></div>;
}
export default GridContainer;
