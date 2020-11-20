import React, { useEffect, createRef, useState } from 'react';
import './gridContainer.css';

function GridContainer(props) {
  const testRef = createRef();
  const [size, setSize] = useState();
  useEffect(() => {
    setSize(window.getComputedStyle(testRef.current)['margin']);
    console.log(size);
  }, [testRef]);

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
    <div className="grid-container" ref={testRef}>
      {gridCell} {size}
    </div>
  );
}
export default GridContainer;
