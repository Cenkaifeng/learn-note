### 第一章：Http/1.1协议

>HTTP 协议定义：
> 一种**无状态**、应用层的、**以请求/应答**方式运行的协议，它使用可拓展的语义和**字描述**消息格式，与基于网络的**超文本信息**系统灵活地互动。


[RFC-7230](https://tools.ietf.org/html/rfc7230)



##### HTTP 协议格式

基于[ABNF语法](https://www.ietf.org/rfc/rfc5234.txt)定义的HTTP消息格式
>巴科斯范式的英文缩写为 BNF，它是以美国人巴科斯 (Backus) 和丹麦人诺尔 (Naur) 的名字命名的一种形式化的语法表示方法，用来
描述语法的一种形式体系，是一种典型的元语言。又称巴科斯 - 诺尔形式 (Backus-Naur form)。它不仅能严格地表示语法规则，而
且所描述的语法是与上下文无关的。它具有语法简单，表示明确，便于语法分析和编译的特点。

ABNF(扩充巴克斯-淖尔范式)操作符

* 空白字符： 用来分隔定义中的各个元素
    * method SP request-target SP HTTP-version CRLF

* 选择/: 表示多个规则都是可供选择的规则
    * start-line = request-line / status-line

* 值范围 %c##-##:
    * OCTAL = "0"/"1"/"2"/"3"/"4"/"5"/"6"/"7" 与 OCTAL = %x30-37 等价

* 序列组合(): 将规则组合起来，视为单个元素
* 不定量重复m*n:
    * *元素表示零个或更多元素： *(header-field CRLF)
    * 1* 元素表示一个或更多元素， 2*4表示两个至四个元素

* 可选序列[]:
    * [ Message-body ]


##### 为什么要OSI分层: OSI 与 TCP/IP 模型

分层是为了各层之间专注于相邻层级的数据互通，便于进行模块化管理。

为什么实际没有7层分级，是因为分太细会导致数据传递延迟。

* 应用层
    DNS, WWW/HTTP, P2P, EMAIL/POP,SMTP,Telnet,FTP, DHCP

* 表示层
    Recognizing data: HTML, DOC, JPEG, MP3, AVI, Sockets

* 会话层
    Session establishment in TCP, SIP, RTP , RPC-named pipes

* 传输层
    TCP,UDP,SCTP,SSL,TLS

* 网络层
    IP, ARP, IPsec, ICMP, IGMP, OSPF

* 数据链路层
    以太网：Ethernet 802.11, MAC/LLC, VALN, ATM, HDP , FIBRE CHANNEL

* 物理层
    RS-232, Rj45, v.34, 100BASE-TX, SDH, DSL,802.11


TCP/IP:
应用层 - 传输层 - 网络层 - 网络接口层


##### OSI 七层模型 理想化的模型，给我们的网络划分层次（实际上只是理论模型）

> 我们可以将复杂的内容简单化，每一层都专人做专事

应用层：用户最终使用的接口，微信、qq、浏览器网页 【说话】
表示层：怎么去吧数据进行描述、压缩  【整理话术，表达出来】
会话层：简历会话和管理会话的

> 应用层

传输层：把数据传递给对方，怎么传？丢了要不要重新传递？
网络层：网络层是寻址【你要增加你家的具体位置还要增加对方的地址】

> 网络接口层

数据链路层：主要惯性的是将两个设备连接起来连接数据
物理层：只关系如何传递数据 0 1 传输的是比特流 【最终的交通工具】

##### 七层协议真正都做了什么事请？

- 报文 应用层+ 数据
- 数据段 传输层 + 数据 + 端口号
- 数据包 网络层 + 数据 + 端口 + ip地址
- 数据帧 链路层 + 数据 + 端口 + ip + mac地址

> ip 地址 + mac 地址

192.168.1.1
IPV4 IP地址的第四个版本 最大值 255^4 约等于 42亿个
IPV6 16位（每八个位有16进制组成）

mac地址 原则上是唯一的（每个生产出来的网卡自动会写入一个mac地址）


##### 设备
###### 物理层有什么设备呢？
- 光纤 同轴电缆 网线 中继器 集线器

网线 100m 最大传输距离（5/6类线都开始损耗，所以要个中继器放大信号... ） （局域网）
物理层就是关心怎么传数据的

###### 链路层

- 交换机 ：比中继器聪明点，（局域网通信）

###### 网络层设备

- 路由器：默认两个不同的网络不能相互通信，想让两个不同设备通信就需要经历网关。（通过子网掩码判断然后通信）
和交换机的区别就是有没有wan口，能不能上网

wan: 对外部网络（如果没有wan,可以把它看成交换机）
lan：局域网

##### 网络中的协议

- 协议就是约定和规范

应用层： http

> ARP 是有歧义的（核心价值在于将ip地址转换成mac地址） 

##### HTTP 协议解决了什么问题？

> Web's major goal was to be a shared information space through which **people and machines** could communicate. —— Tim Berners Lee

解决WWW信息交互必须面对的需求：
* 低门槛
* 可扩展性：巨大的用户群体，超长的寿命
* 分布式系统下的Hypermedia:大粒度数据的网络传输
* Internet规模
    * 无法控制的scalability(可伸缩性)
        * 不可预测的负载、非法格式的数据、恶意消息
        * 客户端不能保持所有服务器信息，服务器不能保持多个请求间的状态信息
    * 独立的组件部署：新老组件并存
向前兼容：自1993年起HTTP0.9\1.0 (1996)已经被广泛使用



##### 评估Web架构的7大关键属性

**七大关键属性**

1. 性能 Performance：影响高可用的关键因素。
    * 网络性能 Network Performance
        * Throughput 吞吐量： 小于带宽 bandwidth
        * Overhead 开销： 首次开销，每次开销（keep-alive tcp 握手、sockets 等）

    * 用户感知到的性能 User-perceived Performance
        * Latency 延迟： 发起请求到接受到响应的时间
        * Completion 完成时间： 完成一个应用动作所花费的时间

    * 网络效率 Network Efficiency
        * 重用缓存、减少交互次数(图片合成、雪碧图)、数据传输距离更近(建立CDN)、COD(按需代码)

2. 可伸缩性 Scalability：支持部署可以互相交互的大量组件。
3. 简单性 Simplicity：易理解、易实现、易验证。
4. 可见性 Visiable：对两个组件间的交互进行监视或者仲裁的能力。如缓存、分层设计等。
5. 可移植性 Portability：在不同的环境下运行的能力。
6. 可靠性 Reliability：出现部分故障时，对整体影响的程度。
7. 可修改性 Modifiability：对系统作出修改的难易程度，由可进化性、可定制性、可扩展性、可配置性、可重用性构成。
    * 可进化性 Evolvability: 一个组件独立上级而不影响其他组件
    * 可扩展性 Extensibility: 想系统添加功能，而不会影响到系统的其他部分
    * 可定制性 Customizability: 临时性、定制型地更改某一要素来提供服务，不对常规客户产生影响
    * 可配置性 Configurability:应用部署后可通过修改配置提供新的功能
    * 可重用性 Resusabilit:组件可以不做修改在其他应用中使用 


##### 从物种架构风格推导出HTTP的REST架构


2021/3/5 08 | 从五种架构风格推导出HTTP的REST架构
https://time.geekbang.org/course/detail/100026801-93593 1/1
1. 数据流风格 Data-flow Styles
优点：简单性、可进化性、可扩展性、可配置性、可重用性
2. 复制风格 Replication Styles
优点：用户可察觉的性能、可伸缩性，网络效率、可靠性也可以提到提升
3. 分层风格 Hierarchical Styles
优点：简单性、可进化性、可伸缩性
4. 移动代码风格 Mobile Code Styles
优点：可移植性、可扩展性、网络效率
5. 点对点风格 Peer-to-Peer Styles
优点：可进化性、可重用性、可扩展性、可配置性



##### HTTP 的请求行

request-line = method SP request-target Sp HTTP-version CRLF 

常用四种格式
**origin-form:**
* = absolute-pash[ "?" query]
* 向origin server（实际产生相应内容的服务器） 发起请求，path为空时必须传递/

**absolute-form:**
* 仅用于向正向代理proxy 发起请求时，详见正向代理与隧道

**authority-form:**
* 仅用与CONNECT方法，例如CONNECT www.example.com:80 HTTP/1.1

**asterisk-form:**
*仅用于OPTIONS方法


HTTP-version 发展历史

* HTTP/0.9: 只支持GET方法，过时
* HTTP/1.0: RFC1945, 1996, 常见于代理服务器（例如Nginx默认配置）
* HTTP/1.1: RFC2616,1999
* http/2.0: 2015.5正式发布


##### 常见方法

* GET: 主要的获取信息方法，大量的性能优化都针对该方法，幂等方法
* HEAD: 类似GET方法，但服务器不发生BODY,用以花去HEAD元数据，幂等方法
* POST：常用于提交HTML FORM表单、新增资源等
* PUT：更新资源，待条件时是幂等方法
* DELETE: 删除资源，幂等方法
* CONNECT: 建立tunnel睡到
* OPTIONS: 显示服务器对访问资源支持的方法，幂等方法（主要用于跨域访问监测）
* TRACE: 回显服务器收到的请求，用于定位问题。有安全风险（2007年时 nginx0.5.17对此方法不再支持）


用于文档管理的WEBDAV方法（RFC2518)

* PROPFIND: 从Web资源中检索以XML格式存储的属性。它也被重载，以允许一个检索远程系统的整合结构（也叫目录层次结构）
* PROPPATCH: 在单个原子性活动中更改和删除资源的多个属性
* MKCOL：创建集合或者目录
* COPY: 将资源从一个URI复制到另一个URI
* MOVE: 将资源从一个URI移动到另一个UIR
* LOCK: 锁定一个资源。WebDAV 支持共享锁和互斥锁
* UNLOCK：接触资源的锁定

