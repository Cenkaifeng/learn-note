const http = require('http');// 启动服务、监听端口、发送请求

const  proxy = http.createServer((req, res) => {
    res.writeHead(200, {'x-zhaowa': 'hello-commonjs'});
    res.end('hello world');
})

proxy.listen(8888, '127.0.0.1', () => {
    console.log('server start')
})