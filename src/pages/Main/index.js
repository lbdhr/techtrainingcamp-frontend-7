import { connect } from 'react-redux';
import { initBoard } from '../../gameReducers/reducer';
import Main from './Main';

const mapStateToProps = state => ({
  board: state.present.board,
  score: state.present.score,
  bestScore: state.present.bestScore,
});

const mapDispatchToProps = {
  onInit: initBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
