const net = require('net');

const HOST = '127.0.0.1';
const PORT = 7777;

net.createServer((socket) => {
    const remoteName = `${socket.remoteAddress}:${socket.remotePort}`;

    console.log(`${remoteName} 连接到本服务器`);

    socket.on('data', (data) => {
        console.log(`${remoteName} - ${data}`);
        //给客户端发消息
        socket.write(`你刚刚说啥？是说的${data}吗？`);
    })

    socket.on('close', (data) => {
        console.log(`${remoteName} 连接关闭`);
    })
}).listen(PORT, HOST);

console.log(`Server listening on ${HOST}:${PORT}`);