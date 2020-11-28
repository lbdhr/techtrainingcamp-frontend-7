import { connect } from 'react-redux';
import GridContainer from './GridContainer';

const mapStateToProps = state => ({
  board: state.present.gameReducer.board,
  statusBoard: state.present.gameReducer.statusBoard,
  state,
});

export default connect(mapStateToProps)(GridContainer);
