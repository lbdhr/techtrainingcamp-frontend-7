import { connect } from 'react-redux';
import { initBoard } from '../../reducers/gameReducer';
import Main from './Main';

const mapStateToProps = state => ({
  board: state.present.gameReducer.board,
  score: state.present.gameReducer.score,
  bestScore: state.present.gameReducer.bestScore,
  state: state.present.gameReducer,
});

const mapDispatchToProps = {
  onInit: initBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
