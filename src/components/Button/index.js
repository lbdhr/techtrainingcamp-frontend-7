import { connect } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import { reset } from '../../reducers/gameReducer';
import Button from './Button';

const mapStateToProps = state => ({
  board: state.present.gameReducer.board,
  score: state.present.gameReducer.score,
  bestScore: state.present.gameReducer.bestScore,
  recordLength: state.past.length,
});
const mapDispatchToProps = {
  onReset: reset,
  onRetreat: ActionCreators.jump,
};

export default connect(mapStateToProps, mapDispatchToProps)(Button);
