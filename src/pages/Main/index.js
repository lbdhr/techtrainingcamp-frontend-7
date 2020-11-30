import { connect } from 'react-redux';
import { initBoard } from '../../reducers/gameReducer';
import Main from './Main';
import { uploadScore } from '../../actions/userActions';
import {bindActionCreators } from "redux"

const mapStateToProps = state => ({
  board: state.present.gameReducer.board,
  score: state.present.gameReducer.score,
  bestScore: state.present.gameReducer.bestScore,
  state: state.present.gameReducer,
});

const mapDispatchToProps = (dispatch) =>  {
    return {
        onInit: bindActionCreators(initBoard, dispatch),
        uploadSocre: bindActionCreators(uploadScore, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
