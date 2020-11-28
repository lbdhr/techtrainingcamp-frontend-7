import React, { createRef, useEffect } from 'react';
import './gridContainer.css';
import { animationFunc, cellBackgroundColor, cellColor, cellFontSize } from './cellColor';

// 1.获得每个点的定位
const cellSpace = 5;
const cellLength = 90;
const getPosition = i => {
  return cellSpace + i * (cellSpace * 2 + cellLength);
};

function GridContainer(props) {
  const gridCell = props.board.map((row, rowIndex) => (
    <div key={row + rowIndex}>
      {row.map(() => (
        <div className="grid-cell"></div>
      ))}
    </div>
  ));

  let cellArr = [];
  props.board.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      let key = rowIndex + '-' + colIndex + '-' + col;
      let position = { rowIndex, colIndex };
      let statusBoard = {
        isMerged: props.statusBoard[rowIndex][colIndex].isMerged,
        isNew: props.statusBoard[rowIndex][colIndex].isNew,
      };
      if (col > 0) {
        cellArr.push(
          <NumberCell value={col} key={key} position={position} statusBoard={statusBoard} />
        );
      }
    });
  });
  return (
    <div className="grid-container">
      {gridCell}
      {cellArr}
    </div>
  );
}

function NumberCell(props) {
  const {
    value,
    statusBoard: { isMerged, isNew },
    position: { rowIndex, colIndex },
  } = props;

  const cellRef = createRef();
  useEffect(() => {
    let { position } = props;
    let node = cellRef.current;
    let left = getPosition(position.colIndex);
    let top = getPosition(position.rowIndex);
    return () => {
      animationFunc(node, top, 'top');
      animationFunc(node, left, 'left');
    };
  });

  // className
  const cellClassNames = function () {
    let classNames = ['number-cell'];
    isNew && classNames.push('cell-new');
    isMerged && classNames.push('cell-newMerge');
    return classNames.join(' ');
  };

  const numberStyle = {
    backgroundColor: cellBackgroundColor(value),
    color: cellColor(value),
    fontSize: cellFontSize(value),
    top: getPosition(rowIndex),
    left: getPosition(colIndex),
  };

  return (
    <div className={cellClassNames()} style={numberStyle} ref={cellRef}>
      {value === 0 ? '' : value}
    </div>
  );
}

export default GridContainer;
