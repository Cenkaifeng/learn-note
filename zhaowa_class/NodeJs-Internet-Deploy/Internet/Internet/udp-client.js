const dgram = require('dgram')
const message = Buffer.alloc(5, 'lubai')
const client = dgram.createSocket('udp4')

client.send(message, 0, message.length, 44444, 'localhost',
    (err, bytes) => {
        console.log(`发送成功${bytes}字节`);
        // client.close()
    }
)

client.on('message', (buffer) => {
    console.log(buffer.toString())
})