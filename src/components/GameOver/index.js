import React from 'react';
import Modal from '../Modal';
import './gameOver.css';

export default function GameOver(props) {
  return (
    <div>
      <Modal display={props.gameOver}>
        <div>
          <div className="container"></div>
        </div>
      </Modal>
    </div>
  );
}
