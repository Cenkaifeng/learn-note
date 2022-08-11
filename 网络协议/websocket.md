# WebSocket

基于 TCP,协议头兼容http协议。全双工。将TCP 全双工的能力暴露给应用层。

兼容体现在端口复用
http -> ws :80
https -> wss: 443

用途：聊天室，在线游戏，实时通知（小红点），扫码登录轮询，前端工程热更新

实现客户端和服务端通信

## ws 解决了什么问题？
及时让客户端获得更新，代替了 AJAX 利用 http 层的轮询请求

## 设计哲学：在 Web 约束下暴露TCP给上层

- 元数据去哪里了？
  - HTTP 协议头部会存放元数据（ex: content-type: txt)
  - 由 WebSocket 上传输的应用层存放元数据，所以需要用户通过应用层的应用对数据进行编码，比如 mqtt、Socket.io 等 websocket库
- 基于帧：不是基于流（HTTP/TCP）
  - 每一帧要么承载字符数据，要么承载二进制数据
- 基于浏览器的**同源策略**模型（非浏览器无效） 
  所以也需要处理跨域问题`Access-Control-Allow-Origin`等头部

- 基于 URI、自协议支持同主机同端口上的多个服务
> 子协议 Sec-WebSocket-Protocol: xxxx 在这个头可以查看


## websocket的协议头

ABNF 描述的帧格式
- ws-frame = frame-fin; 1 bit in length
  - frame-rsv1; 1 bit in length
  - frame-rsv2; 1 bit in length // rsv 是协议的拓展保留位
  - frame-rsv3; 1 bit in length
  - frame-opcode;4 bit in length // opcode 数据类型1~4
  - frame-masked; 1 bit in length
  - frame-payload-length; 3 种长度
  - [frame-masking-key]; 32 bits in length
  - frame-payload-data; n*8 bits in; length, where; n >= 0

  [websocket数据格式](https://datatracker.ietf.org/doc/html/rfc6455#section-5.2)
``` 
协议头结构
      0                   1                   2                   3
      0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
     +-+-+-+-+-------+-+-------------+-------------------------------+
     |F|R|R|R| opcode|M| Payload len |    Extended payload length    |
     |I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
     |N|V|V|V|       |S|             |   (if payload len==126/127)   |
     | |1|2|3|       |K|             |                               |
     +-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
     |     Extended payload length continued, if payload len == 127  |
     + - - - - - - - - - - - - - - - +-------------------------------+
     |                               |Masking-key, if MASK set to 1  |
     +-------------------------------+-------------------------------+
     | Masking-key (continued)       |          Payload Data         |
     +-------------------------------- - - - - - - - - - - - - - - - +
     :                     Payload Data continued ...                :
     + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
     |                     Payload Data continued ...                |
     +---------------------------------------------------------------+
```
## websocket与http有什么区别？


1. websocket 有回调函数
2. http 协议头大于 websocket 协议头

### 格式
- ws-URI = "ws:" "//" host [":" port] path ["?" query]
  - 默认 port 端口 80 
- wss-URI = "wss:" "//" host [":" port] path ["?" query]
  - 默认 port 端口 443 

- 客户端提供信息
  - host 与 port: 主机名与端口
  - shema: 是否基于SSL
  - 访问资源： URI
  - 握手随机数: Sec-WebSocket-Key
  - 选择子协议(可选)： Sec-WebSocket-Protocol
  - 拓展协议(可选)： Sec-WebSocket-Extensions
  - CORS 跨域(可选): Origin

### 它是怎么握手的
握手过程：//TODO: 这里画个握手图方便理解

  1. 通过 GET / HTTP/1.1 发送请求必须带有（http 通过 upgrade 升级 ws）
    Sec-WebSocket-Version: 13 // ws版本
    Host: xxxxx.xxx.xxx
    Connection: keep-alive, Upgrade 
    Upgrade： websocket // http2 这个地方有点区别
    Sec-WebSocket-Key：浏览器计算 `Sec-WebSocket-Key` base64值 发给服务器
    ...

  2. 然后服务器拿到base64 经过下面三步计算处理
    1. 用 GUID连接(`${base64}${GUID}` 浏览器发的那个)，GUID = `258EAFA5-E914-47DA-95CA-C5AB0DC85B11`
    2. 然后服务器用 SHA-1 hash -> 
    3. 再base64-encode  
  Ps: GUID -> Globallly Unique Identifier 是一个**全局统一**固定值
  返回 `Sec-WebSocket-Accept`给服务器。

    response 
    HTTP/1.1 101 Switching Protocols
    Upgrade: websocket
    Connection: Upgrade
    Sec-WebSocket-Accept: xxxxxxx
  返回状态码：101
  握手完成，可以通信

### 如何证明握手被服务器接受？预防意外？

- 请求中的 Sec-WebSocket-Key 随机数(base64)

- 响应中的 Sec-WebSocket-Accept 证明值 GUID [RFC4122] 一顿拼接（看上面握手过程）

### mask 掩码左右（只有客户端发送的数据需要[mask])
针对代理服务器的缓存污染攻击

### 连接过程中的 ping pong (心跳检测)
心跳通过穿插在数据帧中实现，参考上面协议头结构 opcode
* ping 帧对应一个
  1. opcode=9
  2. 可以含有数据
* pong 帧
  1. opcode=A || 10
  2. 必须与 ping 帧数据相同

每个 ping 帧对应一个 pong, 心跳帧是可以带数据的

## 会话关闭的方式

- 控制帧中的关闭帧：在TCP链接之上的双向关闭
  - 发送关闭帧后，不能再发送任何数据（但是可以接受，因为对面还不知道）
  - 接收到关闭帧后，不再接收任何到达的数据

- TCP 连接意外中断

### 关闭帧格式
- opcode = 8
- 可以含有数据，但仅用于解释关闭会话的原因
  - 前 2 字节为无符号类型
  - 遵循 mask 掩码规则

## 来实现一个 demo1
看了上面这么多理论，那我们实际用 websocket 来实现一个 demo 吧。

首先我们 用 nodejs 起一个 websocket 的服务

```js
// server.js
// npm init && npm i ws 
const WebSocket = require('ws');
const wss = new WebSocket.Server({port: 8686});

wss.on('connection', ws => {
    console.log('A visitor has came');

    ws.on('message' , data => {
        ws.send(`data from server: ${data.toString()}`);
    });

    ws.onclose = _ => {
        console.log('A visitor leaving');
    }

    ws.onerror = (err) => {
        console.log('error', err)
    }
})
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script>
        // demo 用 ws 实际开发会用 wss
        const ws = new WebSocket('ws://localhost:8686');

        ws.addEventListener('open', _ => {
            console.log('ws is connecting...');
            ws.send('test message');
        });

        ws.addEventListener('message', ({data}) => {
            console.log(data);
        })

    </script>
</body>
</html>
```
写完这个demo 可以在浏览器打开 index.html 打开 devtool network 看看抓包信息捣鼓一下。
### demo 一些和测试网站
https://www.piesocket.com/websocket-tester

## 参考资料

* [WebSocket RFC6455 官方文档](https://datatracker.ietf.org/doc/html/rfc6455)
* [《Web 协议详解与抓包实战》](https://time.geekbang.org/course/intro/100026801?tab=catalog)

https://juejin.cn/post/6844903544978407431#heading-11