const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use('/', express.static(__dirname + '/public')) //to specify the public folder

let users = {
    'abhinav': '12345'
}

let socketMap = {}

io.on('connection', (socket) => {
    console.log(`Connected to socket id: ${socket.id}`);

    socket.on('login', (data) => {
        if (users[data.username]) {
            if (users[data.username] == data.password) {
                socket.join(data.username)
                socket.emit('logged_in')
                socketMap[socket.id] = data.username
            } else {
                socket.emit('incorrect_pass')
            }
        }
        else {
            users[data.username] = data.password
            socket.join(data.username)
            socket.emit('logged_in')
            socketMap[socket.id] = data.username
        }
    })

    socket.on('msg_sent', (data) => {
        data.from = socketMap[socket.id]

        if (data.to) {
            io.to(data.to).emit('msg_rcvd', data)
        }
        else {
            socket.broadcast.emit('msg_rcvd', data)
        }
    })

})

server.listen(3000, () => {
    console.log('Listening on http://localhost:3000');
})
