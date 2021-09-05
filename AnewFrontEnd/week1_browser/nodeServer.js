// 第九课作业
const http =require('http');
// const Buffer = require('buffer');

http.createServer((request, response) => {
    let body = [];
    request.on('error', (err) => {
        console.error(err);// 错误捕获
    }).on('data', (chunk) => {
        body.push(chunk.toString());
    }).on('end', () => {
        // console.log('body', body);
        // body = Buffer.concat([Buffer.from(body)]).toString();
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end('Hello World\n');
    })
}).listen(8088)

console.log("server started ");