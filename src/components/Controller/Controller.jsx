import React, { useEffect } from 'react';

export default function Controller(props) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown, false);
    window.addEventListener('keyup', handleKeyUp, false);
    return () => {
      window.removeEventListener('keydown', handleKeyDown, false);
      window.removeEventListener('keyup', handleKeyUp, false);
    };
  });
  const handleKeyDown = e => {
    switch (e.keyCode) {
      case 37:
      case 38:
      case 39:
      case 40:
        e.preventDefault();
        break;
      default:
        break;
    }
  };
  const handleKeyUp = e => {
    switch (e.keyCode) {
      case 38: // up
        props.onMoveUp();
        props.onAddRandom();
        break;
      case 40: // down
        props.onMoveDown();
        props.onAddRandom();
        break;
      case 37: // left
        props.onMoveLeft();
        props.onAddRandom();
        break;
      case 39: // right
        props.onMoveRight();
        props.onAddRandom();
        break;
      default:
        break;
    }
  };

  return <div></div>;
}
