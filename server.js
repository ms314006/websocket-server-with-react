const express = require('express')
const app = express()

const server = require('http').Server(app)
    .listen(3000)
const io = require('socket.io')(server)

io.on('connection', socket => {

    socket.on('setRoom', room => {
        socket.join(room)
    })

    /*只回傳給發送訊息的 client*/
    socket.on('getMessage', message => {
        socket.emit('getMessage', message)
    })

    /*回傳給所有連結著的 client*/
    socket.on('getMessageAll', message => {
        io.sockets.emit('getMessageAll', message)
    })

    /*回傳給除了發送者外所有連結著的 client*/
    socket.on('getMessageLess', message => {
        socket.broadcast.emit('getMessageLess', message)
    })

    /*回傳給和發送者相同房間的 client*/
    socket.on('getMessageRoom', message => {
        console.log(socket)
        io.sockets.in('game').emit('message', 'cool game')
    })
})