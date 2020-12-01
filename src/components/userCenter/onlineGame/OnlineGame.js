import React from "react";
import io from "socket.io-client";
import { connect } from 'react-redux'

import TextContainer from './TextContainer/TextContainer';
import Messages from './Messages/Messages';
import InfoBar from './InfoBar/InfoBar';
import Input from './Input/Input';
import ViewOtherBoards from "./ViewOtherBoards";
import Main from "../../../pages/Main"

// import './OnlineGame.css'


const ENDPOINT = 'http://localhost:3030/';

let socket;

class OnlineGame extends React.Component {
    // const [name, setName] = useState('');
    // const [room, setRoom] = useState('');
    // const [users, setUsers] = useState('');
    // const [message, setMessage] = useState('');
    // const [messages, setMessages] = useState([]);
    //
    // const sendMessage = (event) => {
    //     event.preventDefault();
    //
    //     if(message) {
    //         socket.emit('sendMessage', message, () => setMessage(''));
    //     }
    // }
    constructor(props) {
        super(props);
        this.state = {
            chattings: [],
            roomData: "",
            isMaster: false,
            startedGame: false,
            otherBoards: []
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
            this.setState({
                startedGame: true
            });
        });
        socket.on('newBoard', message => {
            let tempBoards = this.state.otherBoards;
            // let obj = tempBoards.find(function (obj) {
            //     return obj.username === message.username;
            // });
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
            console.log(`OnlineGame: ${this.state.otherBoards[0].board}`)
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
        socket.emit('startGame', "", ()=>{});
    }

    submitRes = (message) => {
        if(message) {
            socket.emit('updateBoard', message, ()=>{});
        }
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
                        {this.state.startedGame ? <Main detailsToMain={detailsToMain} submitRes={this.submitRes}/> : (this.state.isMaster ? (<div><p>{this.props.name}，您是房主：</p><button onClick={this.startGame} className="btn btn-primary btn-lg">点击开始游戏！</button></div>) : "请等待房主开始游戏")}
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
