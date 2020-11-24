const express = require("express");
const app = express();
const users = require("./routes/users")
const debug = require("debug")("my-application");
const bodyParser = require("body-parser")
const auth = require("./routes/auth")

const http = require('http').Server(app)
const io = require('socket.io')(http)
const cors = require('cors');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/rooms')

app.use(bodyParser.json());
app.use("/api/users",users);
app.use("/api/auth",auth);

//以下都是socket.io收到连接后的处理代码
io.on('connection',(socket)=>{
    socket.on('join', ({ name, room }, callback) => {
        const {error, user} = addUser({id: socket.id, name, room});

        if (error) return callback(error);

        socket.join(user.room);

        socket.emit('message', {user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined!`});

        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});

        callback();
    });


    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
    });

});



http.listen(3030,(req,res) =>{
    debug("服务器运行在3030端口上");
})