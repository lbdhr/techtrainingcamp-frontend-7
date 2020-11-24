import React from 'react';
import './gridContainer.css';
import { cellBackgroundColor, cellColor } from './cellColor';

// 1.获得每个点的定位
const cellSpace = 5;
const cellLength = 90;
const getPosition = i => {
  return cellSpace + i * (cellSpace * 2 + cellLength);
};

function GridContainer(props) {
  return (
    <div className="grid-container">
      {props.board.map((row, rowIndex) => (
        <div key={row + rowIndex}>
          {row.map((col, colIndex) => {
            const numberStyle = {
              top: getPosition(rowIndex) + 'px',
              left: getPosition(colIndex) + 'px',
              backgroundColor: cellBackgroundColor(col),
              color: cellColor(col),
            };
            return (
              <>
                <div className="grid-cell" key={col + colIndex}></div>
                <div className="number-cell" style={numberStyle} key={col + colIndex}>
                  {col === 0 ? '' : col}
                </div>
              </>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// function NumberCell(props) {
//   const cellRef = createRef();

//   useEffect(() => {
//     const { cellInfo } = props;
//     cellRef.current.style.top = getPosition(cellInfo['x']) + 'px';
//     cellRef.current.style.left = getPosition(cellInfo['y']) + 'px';
//     cellRef.current.innerHTML = cellInfo['value'];
//   });

//   return <div className="number-cell" ref={cellRef}></div>;
// }

export default GridContainer;
