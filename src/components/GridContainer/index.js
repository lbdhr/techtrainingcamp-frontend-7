import { connect } from 'react-redux';
import GridContainer from './GridContainer';

const mapStateToProps = state => ({
  board: state.present.board,
  statusBoard: state.present.statusBoard,
  state,
});

export default connect(mapStateToProps)(GridContainer);
