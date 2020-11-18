import React, { useEffect } from 'react';

function NumberContainer(props) {
  useEffect(() => console.log(props.board.board));
  return <div></div>;
}
export default NumberContainer;
