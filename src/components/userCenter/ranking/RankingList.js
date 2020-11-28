import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { getUserInfo, setUserInfo } from '../../../actions/userActions'
import Ranking from './Ranking'

class RankingList extends React.Component{

    componentDidMount() {
        this.props.getUserInfo().then(res => {
            this.props.setUserInfo(res.data)
        })
    }

    render() {

        this.props.message.sort((a, b) => {return b.scoreOnline-a.scoreOnline});
        const tableOnline = this.props.message.map((item, idx) =>
            <Ranking key={idx} username={item.username} score={item.scoreOnline} id={idx+1} />
        )

        this.props.message.sort((a, b) => {return b.scoreOffline-a.scoreOffline});
        const tableOffline = this.props.message.map((item, idx) =>
            <Ranking key={idx} username={item.username} score={item.scoreOffline} id={idx+1} />
        )
        // const tables = this.props.message.map((item, idx) =>
        //     <Ranking key={idx+1} message={item} />
        // )

        return (
            <div class="row">
                <div className="col-md-6">
                    <h3>对战模式积分榜</h3>
                    <table class="table table-hover">
                        <tr>
                            <th align="center">排位</th>
                            <th align="center">用户</th>
                            <th align="center">积分</th>
                        </tr>
                        { tableOnline }
                    </table>
                </div>
                <div className="col-md-6">
                    <h3>离线模式积分榜</h3>
                    <table class="table table-hover">
                        <tr>
                            <th align="center">排位</th>
                            <th align="center">用户</th>
                            <th align="center">积分</th>
                        </tr>
                        { tableOffline }
                    </table>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.present.userInfo
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getUserInfo: bindActionCreators(getUserInfo,dispatch),
        setUserInfo: bindActionCreators(setUserInfo, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RankingList);