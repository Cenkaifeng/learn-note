const dgram = require('dgram');

const message = Buffer.alloc(5, 'Jervis');

const client = dgram.createSocket();

client.send(message, 0, message.length, 44444, 'localhost', (err, bytes) => {
    //第二个参数是数据偏移量
    console.log(`发送成功${bytes}字节`);
})

client.on('message', (buffer) => {
    console.log(buffer.toString());
})
