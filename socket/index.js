module.exports = (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        socket.emit('chat message', '我收到了谢谢');
    });
    socket.on('disconnect', () => {
        console.log('user disconnected 断开连接');
    });
}