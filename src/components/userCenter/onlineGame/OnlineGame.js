import React from "react";
import io from "socket.io-client";
import { connect } from 'react-redux'

import TextContainer from './TextContainer/TextContainer';
import Messages from './Messages/Messages';
import InfoBar from './InfoBar/InfoBar';
import Input from './Input/Input';
import ViewOtherBoards from "./ViewOtherBoards";
import Main from "../../../pages/Main"
import classnames from 'classnames'


// const ENDPOINT = 'http://localhost:3030/';
const ENDPOINT = 'http://202.120.42.141:3030/';

let socket;

class OnlineGame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chattings: [],
            roomData: "",
            isMaster: false,
            startedGame: false,
            gameTime: 0,
            gameTimeErr: false,
            otherBoards: [],
            timeEnd: 0,
            timeMin: 0,
            timeSec: 0
        };
    }

    componentDidMount() {
        const { name, room } = this.props;
        socket = io(ENDPOINT);
        socket.emit('join', { name, room }, (error) => {
            if(error) {
                alert(error);
            }
        });

        socket.on('message', message => {
            this.setState({
                chattings: [...this.state.chattings, message]
            })
        });

        socket.on("roomData", ({users}) => {
            if(users.length === 1) {
                this.setState({
                    roomData: users,
                    isMaster: true
                })
            } else {
                this.setState({
                    roomData: users,
                })
            }
        });
        socket.on('startGame', message => {
            console.log(`endTime: ${message/60000}`)
            this.setState({
                startedGame: true,
                timeEnd: parseInt(message)
            });
        });
        socket.on('endGame', message =>{
            this.setState({
                startedGame: false
            });
        })
        socket.on('newBoard', message => {
            let tempBoards = this.state.otherBoards;
            let idx = tempBoards.findIndex(item => item.username === message.username)
            if (idx!==-1) {
                tempBoards[idx].score = message.score;
                tempBoards[idx].board = message.board;
                this.setState({
                    otherBoards: tempBoards
                })
            }
            else {
                tempBoards.push(message);
                this.setState({
                    otherBoards: tempBoards
                });
            }
            // console.log(`OnlineGame: ${this.state.otherBoards[0].board}`)
        });
    }

    componentWillUnmount() {
        socket.disconnect();
    }

    clickChange = (message) => {
        if(message) {
            socket.emit('sendMessage', message, ()=>{});
        }
    }

    startGame = (event) => {
        event.preventDefault();
        if(this.state.gameTime >= 1) {
            // const message = {timePeriod: this.state.gameTime};
            socket.emit('startGame', this.state.gameTime, () => {
            });
        }
        else{
            this.setState({
                gameTimeErr: true
            })
        }
    }

    submitRes = (message) => {
        if(message) {
            socket.emit('updateBoard', message, ()=>{});
        }
    }

    handleChange = (event) => {
        this.setState({
            gameTime: event.target.value
        });
    }

    showTimer = () => {
        this.timer = setInterval(()=>{
            const timeLast = this.state.endTime - Date.now();
            if(timeLast>1000){
                this.setState({
                    timeMin: Math.floor(timeLast%60),
                    timeSec: Math.floor(timeLast/60)
                })
            } else {
                clearInterval(this.timer);
            }
        }, 1000);
    }


    render() {

        const detailsToMain = {
            username: this.props.name,
            mode: "online",
        };

        return (
            <div>
                <div class="row">
                    <div className="col-md-6">
                        <InfoBar room={this.props.room}/>
                        <Messages messages={this.state.chattings} name={this.props.name}/>
                        <Input sendMessage={this.clickChange} />
                        <TextContainer users={this.state.roomData}/>
                    </div>
                    <div className="col-md-6">
                            {this.state.startedGame ? <div><p>距离游戏结束还有：{this.state.timeMin}分{this.state.timeSec}秒</p><Main detailsToMain={detailsToMain} submitRes={this.submitRes}/></div> :
                                (this.state.isMaster ? (
                                    <form onSubmit={()=>{}}>
                                        <div>
                                            <p>{this.props.name}，您是房主，请设置本局游戏时间（分钟）并点击以开始游戏：</p>
                                            <div className="form-group">
                                                <input type="text" name="gameTime" onChange={this.handleChange}
                                                       className={ classnames('form-control',{ 'is-invalid': this.state.gameTimeErr }) }/>
                                                { this.state.gameTimeErr && <span className="form-text text-muted">最短游戏时间不能少于3分钟</span> }
                                            </div>
                                            <div className="form-group">
                                                <button onClick={this.startGame} className="btn btn-primary btn-lg">点击开始游戏！</button>
                                            </div>
                                        </div>
                                    </form>
                                    ) : "请等待房主开始游戏")}
                    </div>
                </div>
                <div class="row">
                    <p>游戏房间内其他玩家目前状态:</p>
                    <ViewOtherBoards otherBoards={this.state.otherBoards}/>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        name: state.present.onlineGameInfo.username,
        room: state.present.onlineGameInfo.room
    }
}

export default connect(mapStateToProps, null)(OnlineGame);
