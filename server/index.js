const http = require('http');
const express = require("express");
const app = express();
const users = require("./routes/users")
const debug = require("debug")("my-application");
const bodyParser = require("body-parser")
const auth = require("./routes/auth")
const defaultRouter = require('./routes/defaultRoute')

// const cors = require('cors');

const mySocketIo = require('socket.io');
const server = http.createServer(app);
// 用于配置跨域访问的问题，否则React端的连接是走不通的
const io = mySocketIo(server, {
    cors: {
        origin: '*',
    }
});
// const http = require('http').Server(app)
// const io = require('socket.io')(http)
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/rooms')
let roomTimers = [];

app.use(bodyParser.json());
app.use("/api/users",users);
app.use("/api/auth",auth);
// app.use(cors);
app.use("/", defaultRouter);
// app.use(cors);

//以下都是socket.io收到连接后的处理代码
io.on('connect',(socket)=>{
    console.log("connect has been touched!");
    socket.on('join', ({ name, room }, callback) => {
        console.log("Join has been touched!");
        const {error, user} = addUser({id: socket.id, name, room});

        if (error) return callback(error);

        socket.join(user.room);

        socket.emit('message', {
            user: 'admin',
            text: `${user.name}, welcome to room ${user.room}.`
        });
        socket.broadcast.to(user.room).emit('message', {
            user: 'admin',
            text: `${user.name} has joined!`
        });

        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        });

        callback();
    });


    socket.on('sendMessage', (message, callback) => {
        console.log("sendMessage has been touched!");
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();
    });

    socket.on('startGame', (message, callback) => {
       console.log(`startGame: ${message} minutes`);
       const user = getUser(socket.id);
       const timeEnd = Date.now() + parseInt(message)*60000;
       const roomTimer = {
           room: user.room,
           timeEnd
       };
       roomTimers.push(roomTimer);
       io.to(user.room).emit('startGame', timeEnd);
       callback();
    });

    socket.on('updateBoard', (message, callback) => {
        const user = getUser(socket.id);
        console.log(`updateBoard from ${user.name}`);
        console.log(message);
        socket.to(user.room).emit('newBoard', message);
    });

    socket.on('disconnect', () => {
        console.log("disconnect has been touched!");
        const user = removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
    });

});

server.listen(3030,(req,res) =>{   //http
    debug("服务器运行在3030端口上");
})



setInterval(()=>{
    roomTimers.slice().reverse().forEach(function (item, index, arr1) {
        let timeNow = Date.now();
        if (item.timeEnd <= timeNow) {
            io.to(item.room).emit('endGame', {});
            roomTimers.splice(arr1.length - 1 - index, 1);
        }
    });

}, 500)