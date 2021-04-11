const rooms = require('../funcClass/room')

module.exports = (io) => {
    // socket连接
    io.on('connection', (socket) => {

        console.log('a user connected!');

        socket.on('create', function ({id, userName}) {
            const room = rooms.push(id) 
            socket.join("room-" + id);
            if (room && !room.socket) {
                // 初始化房间socket
                console.log('初始化房间socket');
                room.getSocketIo(io.sockets.in("room-" + id))
            }
        });
        
        socket.on('testRoom', (msg) => {
            const {id, userName} = msg
            const room = rooms.push(id) 
            // 指定房间广播多房间数据
            room.socket.emit('ontestRoom', msg)
        });
        socket.on('chat message', (msg) => {
            console.log('message: ' + msg);
            socket.emit('chat message', '我收到了谢谢');
        });
        socket.on('getrooms', (msg) => {
            console.log('getrooms: ', rooms);
            // socket.emit('chat message', '我收到了谢谢');
        });
        socket.on('disconnect', () => {
            console.log('user disconnected 断开连接');
        });
    });
}

