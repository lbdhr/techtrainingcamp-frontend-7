import React, {useState} from 'react';

import './Input.css';

const Input = ({ sendMessage }) => {

    const [message, setMessage] = useState('');

    const sendMyMessage = (e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage('');
    }

    return (
        <form className="form">
            <input
                className="input"
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyPress={event => event.key === 'Enter' ? sendMyMessage(event) : null}
            />
            <button className="btn btn-primary btn-lg" onClick={(e) => sendMyMessage(e)}>发送！</button>
        </form>
    )
}

export default Input;