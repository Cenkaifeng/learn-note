

## HTTP/2 是不是必须基于 TLS/SSL 协议？

* IETF 标准不要求必须基于TLS/SSL协议
* 浏览器要求必须基于TLS/SSL协议
* 在TLS层ALPN(Application Layer Protocol Negotiation)扩展做协商，只认HTTP/1.x的代理服务器不会干扰HTTP/2
* shema: http:// 和 https:// 默认基于80和443端口
* h2: 基于TLS协议运行的HTTP/2 被称为h2
* h2c: 直接在TCP协议之上运行的HTTP/2 被称为h2c


## HTTP/2 核心概念

* 链接Connection: 1个TCP链接，包含一个或多个Stream
* 数据流Stream: 一个双向通讯数据流，包含1条或者多条Message
* 消息 Message: 对应HTTP/1 中的请求或者响应，包含一条或者多条Frame
* 数据帧Frame:最小单位，以二进制压缩格式存放HTTP/1中的内容