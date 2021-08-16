# 网络

## TCP/IP 网络协议

OSI七层模型

第七层： 应用层 为操作系统或者网络应用程序提供访问网络的服务接口. 协议： HHTP HTTPS SMTP POP3 SSH
第六层： 表示层 压缩，格式转换
第五层： 会话层 负责数据传输负责维持网络设备之间的通讯连接。
第四层： 传输层 把传输表头加到数据上形成数据包，完成端到端的数据传输. 协议：TCP UDP
第三层： 网络层 负责对子网间的数据包进行寻址和路由选择，可以实现拥塞控制、网际互联等功能。 协议：IP；路由器在这
第二层： 数据链路层 物理地址寻址 交换机在这
第一层： 物理层 在局域网上进行数据串户，负责电脑通信设备与网络媒体之间的互通。

1. 牛客网的视频面试，底层是采用的什么协议？TCP？ UDP？
UPD. 

2. 路由器在哪一层？

3. html 在哪一层？
应用层

4. 协议是什么？
协议定义了每一层的作用是什么，每一层的职责是什么，类似于规范和约束。

5. TCP/IP 网络协议具体是指什么？

大多数时候指的是互联网通信所需的协议，是一个协议家族，以TCP和 IP 协议为核心，包含 HTTP HTTPS。

6. TCP/IP 参考模型

一共有4层，是一个抽象的分层模型.

7. 数据包？

网络层及以上分层中包的单位。

每个分层都会对发送的数据添加一个首部，首部包含了该层协议相关的信息，而真正要发送的内容称之为数据。

首部 + 数据 = 数据包

对于下层来说，上层发过来的所有内容，都会被当做本层的数据。

传输层 TCP包： TCP 包首部 + 数据
网络层 IP 包： IP包首部 + （TCP 包首部 + 数据)
数据链路层：以太网包： 以太网包首部 + （IP包首部 + （TCP 包首部 + 数据)）

8. 每层在接受到数据后，除了添加首部，还要做什么？

用户1 
* 传输层：通过添加TCP首部，来保证数据的可靠传输
* 参考路由控制表，决定接收此IP包的路由和主机
* 数据链路层：将生成的包通过物理层传输给接受端

用户2 
* 数据链路层：接受到数据后，判断数据是否是发给自己的，MAC地址
* 网络层：从首部里判断此IP是否和自己当前IP匹配
* 传输层：检查端口号

总结一下几个地址：

* 数据链路层的MAC地址，用来识别统一链路中不同计算机
* 网络层IP地址，用来识别TCP/IP网络中互联的主机和路由器
* 传输层的端口号，用用程序地址，识别同一计算机中进行通信的不同应用程序.

9. 我们通过上述这三个地址，就可以识别一次通信了吗？

* IP首部：源IP地址
* IP首部：目标IP地址
* 协议号： TCP/UDP
* TCP首部： 源端口号
* TCP首部： 目标端口号

10. TCP/UDP 的区别？ 应用场景？

* UDP是无连接的，TCP必须三次握手建立连接
* UDP是面向报文的，没有拥塞控制，所以速度快，适合多媒体通信要求（实时聊天，一对一，一对多，多对一，多对多）
* TCP只能是一对一的可靠性传输

市面上常见的直播服务，底层是什么协议？

rtmp 和hls 直播，都是基于TCP的，希望能听稳定可靠的直播环境。

11. TCP是通过什么方式提供可靠性？

* 超时重发，发出的报文段没有收到及时的确认，会重发
* 数据包的校验，校验首部数据和
* 对失序的数据重新排序
* 进行流量控制，防止缓存区的溢出
* 快重传和快恢复
* TCP会将数据截断为合理的长度


12. TCP 是如何进行拥塞控制的？

防止过多数据涌入造成路由器或链路过载。

发送方要维持一个拥塞窗口，是一个状态变量。cwnd

ssthresh 慢开始门限(可以看成是个常量)

cwnd < ssthresh ，使用慢开始算法，也就是乘法算法
cwnd > ssthresh ，使用拥塞避免算法，也就是加法算法
cwnd = ssthresh ，慢开始和拥塞避免算法都可以

当出现拥塞的时候，

当连续收到三个重传的时候，就用到快重传和快恢复。

13. TCP协议的一次数据传输，从建立链接到结束链接都有哪些流程？

14. IP地址。
IPv4, 是由32位正整数表示的，二进制。

172.112.110.11// 由8位二进制 * 4 所以是32位

172.112.110 是网络标识，同一网段内网络标识必须相同

11是主机标识，同一网段内主机标识不能重复

15. DNS
domain name system

zh.wikipedia.org

* 客户端 query zh.wikipedia.org => dns 服务器（首先检查自身缓存，蜀国存在记录则直接返回)
* DNS服务器 => 根域名服务器（返回顶级域名.org服务器地址）
* DNS服务器 => .org 的顶级域名服务器（返回.wikipedia.org 的权威域名服务器地址）
* DNS服务器 => .wikipedia.org的权威域名服务器地址（返回zh.wikipedia.org的记录）=> （存入自身缓存后）客户端

### 如何通过Nodejs来创建一个TCP服务？

Socket, 套接字, 是应用层和传输层之间的一个抽象层，把TCP/IP复杂的操作抽象为几个简单的接口，供应用层调用。

用来实现进程在网络间的通信， create listen, connect, read, write

http: 应用层模块，主要按照特定协议编解码数据。
net: 传输层模块，主要负责传输编码后的应用层数据
https: 包含http crypto, 主要是为了确保数据的安全。



### 如何使用NodeJs 来创建UDP


## HTTP

1. HTTP 是建立在TCP还是UDP之上?
TCP

2. 一次完整的HTTP通信是什么样子？

1. 建立TCP连接，先建立TCP连接，才能建立HTTP连接（先建立底层）
2. 客户端想服务端发送请求命令
GET/info HTTP/1.1

3. 客户端发送请求头信息

request headers, 结束后会发送一个空白行给服务端

4. 服务端应答

HTTP/1.1 200 OK

协议的版本号和响应的状态码

5. 服务端返回响应头信息

response headers

6. 服务端向客户端发送个数据

Content-Type

7. 服务器关闭TCP连接

Connection: keep-alive, // 1.1 提出的一个tcp连接可以发送多个http请求。

### HTTP 协议有哪些特点

1. 通过请求和响应的交换达成通信

2. 无状态

3. Cookie 来做状态管理

Set-Cookie

4. 通过URL定位资源

URI: 统一资源标识符，比如你的身份证号
URL: 统一资源定位符，比如地址/广东省/深圳市

URI是一个抽象类，他规定实体类需要实现找到资源的功能.
URL extends URI,

URL 类似于通过定位实现的URI

5. 通过各种方法来标识自己的意图

GET POST PUT DELETE

6. 持久连接

HTTP/1.1 所有请求都是默认持久连接的

如果对方不想连接可以设置 Connection: close

7. 管道机制
支持在同一个TCP连接里，客户端可以同时发送多个请求. 服务器还是要按照顺序回应(以前同一TCP同时只能发一个请求)

队头阻塞，如果一个TCP链接里的第一个HTTP响应非常慢。

为什么有的人说 chrome浏览器最大支持6个同域名请求并发？

chrome 最大支持同时开启6个TCP连接.

### 那么HTTP 1.0/1.1/2.0 在并发请求上的主要区别是什么？

1.  HTTP/1.0

每个TCP连接只能发送一个请求，当服务器响应后就会关闭这个TCP连接，下次请求需要再次建立TCP连接

2. HTTP/1.1

默认采用持久连接
增加了管道机制

3. HTTP/2.0

加了双工模式，不仅客户端能够同时发送多个请求，服务器也能同时响应多个，解决了对头阻塞.
多路复用，做到一个连接并发处理多个请求，并发请求的数量比1.1大了好几个数量级
增加了服务器推送功能，服务器可以主动向客户端发送数据


### 请求报文结构