# WebSocket
[RFC6455](https://datatracker.ietf.org/doc/html/rfc6455)

基于 TCP,协议头兼容http协议。全双工。将TCP 全双工的能力暴露给应用层。

兼容体现在端口复用
http -> ws :80
https -> wss: 443

用途：聊天室，在线游戏。

实现客户端和服务端通信

## ws 解决了什么问题？
即使让客户端获得更新，代替了 AJAX轮询

## 设计哲学：在 Web 约束下暴露TCP给上层

- 元数据去哪里了？
  - HTTP 协议头部会存放元数据（ex: content-type: txt)
  - 由 WebSocket 上传输的应用层存放元数据
- 基于帧：不是基于留（HTTP/TCP）
  - 每一帧要么承载字符数据，要么承载二进制数据
- 



## websocket与http有什么区别？


1. websocket 有回调函数
2. http 协议头大于 websocket 协议头

握手过程：

  通过 GET / HTTP/1.1 发送请求带有
  Connection: Upgrade 
  Upgrade： websocket

  浏览器计算 `Sec-WebSocket-Key` base64值 发给服务器

  然后服务器拿到base64 用 GUID连接(GUID==base64 浏览器发的那个)，然后服务器用 SHA-1 hash -> 再base64-encode 

  返回 `Sec-WebSocket-Accept`给服务器。

  握手完成，可以通信


## websocket的协议头

