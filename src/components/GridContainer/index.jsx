import React from 'react';
import './gridContainer.css';

function GridContainer(props) {
  const { board } = props;
  const gridCell = board.map(row => {
    return (
      <div key={row}>
        {row.map(col => (
          <div key={col} className="grid-cell"></div>
        ))}
      </div>
    );
  });
  return (
    <>
      <div className="grid-container">{gridCell}</div>
    </>
  );
}
export default GridContainer;
