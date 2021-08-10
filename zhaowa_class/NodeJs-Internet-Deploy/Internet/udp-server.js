const dgram = require('dgram');

const server = dgram.createSocket('udp4');

server.on('message', (msg, remote) => {
    console.log(`${remote.address}:${remote.port} - ${msg}`);
    server.send(`收到！${remote.port}: ${remote.address}`);
}) 

server.on('listening', () =>{
    const address = server.address();
    console.log(`Server Listening on ${address}: ${address.port}`);
})// 不需要在listen绑端口

server.bind(44444)// 0.0.0.0 绑定公网ip