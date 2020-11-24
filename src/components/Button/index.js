import { connect } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import { reset } from '../../gameReducers/reducer';
import Button from './Button';

const mapStateToProps = state => ({
  board: state.present.board,
  score: state.present.score,
  bestScore: state.present.bestScore,
  recordLength: state.past.length,
});
const mapDispatchToProps = {
  onReset: reset,
  onRetreat: ActionCreators.jump,
};

export default connect(mapStateToProps, mapDispatchToProps)(Button);
