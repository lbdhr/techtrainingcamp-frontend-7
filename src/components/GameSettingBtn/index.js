import { connect } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import { reset, addRandom } from '../../reducers/gameReducer';
import GameSettingBtn from './GameSettingBtn';

const mapStateToProps = state => ({
  board: state.present.gameReducer.board,
  score: state.present.gameReducer.score,
  bestScore: state.present.gameReducer.bestScore,
  gameOver: state.present.gameReducer.gameOver,
  recordLength: state.past.length,
});
const mapDispatchToProps = {
  onReset: reset,
  onRetreat: ActionCreators.jump,
  onAddRandom: addRandom,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameSettingBtn);
