import React from 'react';
import Modal from '../Modal';
import './gameOver.css';

export default function GameOver(props) {
  return (
    <div>
      <Modal display={true}>
        <div>
          <div className="gameover-container ">xianshi gameover</div>
        </div>
      </Modal>
    </div>
  );
}
