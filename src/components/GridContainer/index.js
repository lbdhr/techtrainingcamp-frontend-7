import { connect } from 'react-redux';
import GridContainer from './GridContainer';

const mapStateToProps = state => ({
  board: state.present.board,
});

export default connect(mapStateToProps)(GridContainer);
