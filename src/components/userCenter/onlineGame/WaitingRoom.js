import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { connect } from "react-redux"

const ENDPOINT = 'https://localhost:3030';

let socket;

const WaitingRoom = () => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const name = this.props.user;

        socket = io(ENDPOINT);

        setRoom(room);
        setName(name);

        socket.emit('join', { name, room }, (error) => {
            if(error) {
                alert(error);
            }
        });
    }, [ENDPOINT, this.props.user]);

    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [ ...messages, message ]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users}/>
        </div>
    );

}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        user: state.user
    }
}

export default connect(mapStateToProps, null)(WaitingRoom)