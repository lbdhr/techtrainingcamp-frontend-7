import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { getUserInfo, setUserInfo } from '../../../actions/userActions'
import Ranking from './Ranking'

class RankingList extends React.Component{

    componentWillMount() {
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
            <div>
                <p>对战模式积分榜</p>
                <table border="1">
                    <tr>
                        <th align="center">排位</th>
                        <th align="center">用户</th>
                        <th align="center">积分</th>
                    </tr>
                    { tableOnline }
                </table>
                <p></p>
                <p></p>
                <p>离线模式积分榜</p>
                <table border="1">
                    <tr>
                        <th align="center">排位</th>
                        <th align="center">用户</th>
                        <th align="center">积分</th>
                    </tr>
                    { tableOffline }
                </table>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.userInfo
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        getUserInfo:bindActionCreators(getUserInfo,dispatch),
        setUserInfo: bindActionCreators(setUserInfo, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RankingList);