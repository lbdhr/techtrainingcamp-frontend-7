import React from "react";
import io from "socket.io-client";
import { connect } from 'react-redux'

import TextContainer from './TextContainer/TextContainer';
import Messages from './Messages/Messages';
import InfoBar from './InfoBar/InfoBar';
import Input from './Input/Input';

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
            startedGame: false
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

    render() {
        return (
            <div class="row">
                <div className="col-md-6">
                    <InfoBar room={this.props.room}/>
                    <Messages messages={this.state.chattings} name={this.props.name}/>
                    <Input sendMessage={this.clickChange} />
                    <TextContainer users={this.state.roomData}/>
                </div>
                <div className="col-md-6">
                    {this.state.startedGame ? "棋盘组件" : (this.state.isMaster ? (<div><p>{this.props.name}，您是房主：</p><button onClick={this.startGame} className="btn btn-primary btn-lg">点击开始游戏！</button></div>) : "请等待房主开始游戏")}
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
