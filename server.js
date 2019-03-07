const express = require('express')
const app = express()

const server = require('http').Server(app)
    .listen(3000,()=>{console.log('open server!')})
const io = require('socket.io')(server)

io.on('connection', socket => {
    socket.on('addRoom', room => {
        socket.join(room)
        //發送給在同一個 room 中除了自己外的 Client
        //socket.to(room).emit('addRoom', '已有新人加入聊天室！')
        //發送給在 room 中所有的 Client
        io.sockets.in(room).emit('addRoom', '已有新人加入聊天室！')
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

        room = Object.keys(socket.rooms).find(room =>{
            return room !== socket.id
        })
        console.log(room)
        io.sockets.in(room).emit('getMessageRoom', message)
    })
})