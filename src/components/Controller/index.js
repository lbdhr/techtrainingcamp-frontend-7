import { connect } from 'react-redux';
import { addRandom, moveDown, moveLeft, moveRight, moveUp } from '../../reducers/gameReducer';
import Controller from './Controller';

const mapStateToProps = state => ({
  board: state.present.gameReducer.board,
  isMoved: state.present.gameReducer.isMoved,
});
const mapDispatchToProps = {
  onMoveUp: moveUp,
  onMoveDown: moveDown,
  onMoveRight: moveRight,
  onMoveLeft: moveLeft,
  onAddRandom: addRandom,
};

export default connect(mapStateToProps, mapDispatchToProps)(Controller);
