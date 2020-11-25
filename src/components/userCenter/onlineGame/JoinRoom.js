import React, { useState } from 'react';
import { connect } from "react-redux"
import { Link } from "react-router-dom";
import classnames from "classnames";
import {bindActionCreators} from "redux";
import { addUserOnlineInfo } from "../../../actions/userActions";

const JoinRoom = (props) => {
    // const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [inputNull, setInputNull] = useState(false)

    const onChange = (room) => {
        console.log(room);
        props.addUserOnlineInfo({
            username: props.auth.user.username,
            room: room,
            score: 0,
            board: []
        });
        props.history.push('/onlinegame')
    }

        return (
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <form onSubmit={()=>{}}>
                        <h3>请输入要加入的房间名</h3>
                        <p>若房间号不存在则自动创建房间</p>
                        <div className="form-group">
                            <label className="control-label">用户名</label>
                            <input type="text" name="username" className="form-control" value={props.auth.user.username} disabled />
                        </div>
                        <div className="form-group">
                            <label className="control-label">房间名</label>
                            <input type="text" name="username" onChange={(event) => setRoom(event.target.value)}
                                   className={ classnames('form-control',{ 'is-invalid': inputNull }) }
                            />
                            { inputNull && <span className="form-text text-muted">请输入房间名</span> }
                        </div>
                        <div className="form-group">
                            <Link onClick={e => !room ? setInputNull(true) : onChange(room)} >{/*to={`/onlinegame?name=${props.auth.user.username}&room=${room}`}>*/}
                                <button className="btn btn-primary btn-lg">前往游戏！</button>
                            </Link>
                        </div>
                    </form>
                </div>
                <div className="col-md-3"></div>
            </div>
        );

}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        addUserOnlineInfo :bindActionCreators(addUserOnlineInfo,dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinRoom)