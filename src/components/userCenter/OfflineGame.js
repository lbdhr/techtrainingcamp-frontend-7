import React from 'react';
import Main from '../../pages/Main';
import { connect } from 'react-redux';

class OfflineGame extends React.Component {

  render() {

    const detailsToMain = {
      username: this.props.username,
      mode: "offline",
    };

    return (
      <div className="jumbotron">
        {/*<p>单机模式！！！</p>*/}
          <Main detailsToMain={detailsToMain}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.present.auth.user.username,
  }
}

export default connect(mapStateToProps, null)(OfflineGame)