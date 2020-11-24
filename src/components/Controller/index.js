import { connect } from 'react-redux';
import { addRandom, moveDown, moveLeft, moveRight, moveUp } from '../../gameReducers/reducer';
import Controller from './Controller';

const mapStateToProps = state => ({
  board: state.present.board,
  isMoved: state.present.isMoved,
});
const mapDispatchToProps = {
  onMoveUp: moveUp,
  onMoveDown: moveDown,
  onMoveRight: moveRight,
  onMoveLeft: moveLeft,
  onAddRandom: addRandom,
};

export default connect(mapStateToProps, mapDispatchToProps)(Controller);
