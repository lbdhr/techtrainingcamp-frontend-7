import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

const ENDPOINT = 'http://localhost:3030/';

let socket;

const OnlineGame = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        console.log(name)
        socket = io(ENDPOINT);

        setRoom(room);
        setName(name);

        socket.emit('join', { name, room }, (error) => {
            if(error) {
                alert(error);
            }
        });
    }, [ENDPOINT, location.search]);

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
                <label>房间名: {room}</label>
            </div>
        </div>
    );
}

export default OnlineGame;
