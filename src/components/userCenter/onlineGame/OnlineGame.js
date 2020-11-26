import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { connect } from 'react-redux'

const ENDPOINT = 'http://localhost:3030/';

let socket;

class OnlineGame extends React.Component {
    // const [name, setName] = useState('');
    // const [room, setRoom] = useState('');
    // const [users, setUsers] = useState('');
    // const [message, setMessage] = useState('');
    // const [messages, setMessages] = useState([]);

    // useEffect(() => {
    //     const { name, room } = props;
    //     // console.log(name)
    //     // console.log(room)
    //     socket = io(ENDPOINT);
    //
    //     setRoom(room);
    //     setName(name);
    //
    //     socket.emit('join', { name, room }, (error) => {
    //         if(error) {
    //             alert(error);
    //         }
    //     });
    // }, [ENDPOINT, name, room]);
    //
    // useEffect(() => {
    //     socket.on('message', message => {
    //         setMessages(messages => [ ...messages, message ]);
    //     });
    //
    //     socket.on("roomData", ({ users }) => {
    //         setUsers(users);
    //     });
    // }, []);
    //
    // const sendMessage = (event) => {
    //     event.preventDefault();
    //
    //     if(message) {
    //         socket.emit('sendMessage', message, () => setMessage(''));
    //     }
    // }
    componentDidMount() {
        const { name, room } = this.props;
        socket = io(ENDPOINT);
        socket.emit('join', { name, room }, (error) => {
            if(error) {
                alert(error);
            }
        });
    }

    componentWillUnmount() {
        socket.disconnect();
    }

    render() {
        return (
            <div className="outerContainer">
                <div className="container">
                    <label>房间名: {this.props.room}</label>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        name: state.onlineGameInfo.username,
        room: state.onlineGameInfo.room
    }
}

export default connect(mapStateToProps, null)(OnlineGame);
