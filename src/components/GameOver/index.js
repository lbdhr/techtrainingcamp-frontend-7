import React from 'react';
import { connect } from 'react-redux';
import { reset } from '../../reducers/gameReducer';
import Modal from '../Modal';
import './gameOver.css';

function GameOver(props) {
  return (
    <div>
      <Modal display={props.gameOver}>
        <div>
          <div className="gameover-container ">
            <h3>Game Over</h3>
            <h4>Score: {props.score}</h4>
            <button onClick={props.onReset}>重新开始</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
const mapStateToProps = state => ({
  score: state.present.gameReducer.score,
  gameOver: state.present.gameReducer.gameOver,
});
const mapDispatchToProps = {
  onReset: reset,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameOver);
