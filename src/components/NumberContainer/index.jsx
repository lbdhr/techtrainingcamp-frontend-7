import React, { useEffect } from 'react';
import { numberColor } from '../../theme';

function NumberContainer(props) {
  let cellArr = [];
  props.board.map((row, indexRow) => {
    row.map((col, indexCol) => {
      let cellInfo = {
        x: indexRow,
        y: indexCol,
        value: col,
      };
      if (col > 0) {
        cellArr.push(<NumberCell cellInfo={cellInfo} />);
      }
    });
  });
  return <div>{cellArr}</div>;
}

function NumberCell(props) {
  return <div></div>;
}
export default NumberContainer;
