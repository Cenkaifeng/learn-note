# HTTP 缓存策略

## 什么样的 HTTP 响应会被缓存？ RFC7234

### 使用缓存作为当前请求响应的条件

1. 响应可以被缓存理解：
  ps: 404 、206 也是可以被缓存的....

2. 响应中至少应含有一下头部中的一个或多个
  * `Expires`、`max-age`、`s-maxage`、`public`
  * 当响应中没有明确指示过期时间的头部时，如果响应码非常明确，也可以缓存

3. URI 是匹配的
  - URI 作为主要的缓存关键字，当一个 URI 同事对应多份缓存时，选择日期最近的缓存
    e.g. `Nginx` 中默认的缓存关键字: proxy_cache_key $scheme$proxy_host$request_uri

4. 缓存中的响应允许当前请求的方法使用缓存

5. 缓存中的响应 Vary 头部指定的头部必须与请求中的头部相匹配：(这个点比较冷门...可以单独开一篇代理缓存单独讲)
  - Vary = "*"/ 1#field-name （Vary: *意味着一定匹配失败)
    当收到同样请求时，代理读取缓存里的`Vary`字段，对比请求头的`Accept-Encoding`、`User-Agent`等字段，如果和上一个请求完全匹配，就可以返回缓存数据。

6. **当前请求及缓存中的响应都不包含 `no-cache` 头部**( Pragma: no-cache 或者 Cache-Control: no-cache)

7. 缓存中的响应必须是以下三者之一
  1. 新鲜的（时间上未过期）
  2. 缓存中的响应头部明确告知可以使用过期的响应（如Cache-Control: max-stale=60)
  3. 使用请求去服务器端验证请求是否过期，得到304重定向到缓存的响应 



## 缓存的位置

1. Service Worker
与浏览器其他内建的缓存机制不同，它可以让我们自由控制缓存哪些文件、如何匹配缓存、如何读取缓存，并且缓存是持续性的

2. Memory Cache
顾名思义，内存缓存，与当前页面进程强关联，一旦当前进程结束，内存缓存也会释放

3. Disk Cache
硬盘缓存，读取慢但是容量和存储有优势，出现场景见于协商缓存

4. Push Cache
http/2 的服务端推送，旨在会话中存在，一旦会话结束便会释放且存在时间也很短。


## 缓存的类型
### 强缓存
服务器会将数据和缓存规则一并返回，缓存规则信息包含在响应header中。如`Cache-Control`
> 强缓存存在有效期，缓存期内不会向服务端发送请求。超过时间后需要去服务端验证是否是最新版本
简单来说：当客户端访问服务器后，服务器说， 10s 内别来找我了，去你家缓存里找（在这10s内就不会再向服务器发送请求）
Expries X Cache-Control: max-age 缓存的最大时间，调取缓存后 `dash cache` 200ok

### 协商缓存
当强制缓存失败后会再次向服务器发送请求，服务器需要比对客户端的缓存文件和服务店是否一致，如果一致则返回304状态。
走本地缓存会有（disk cache)标识

如果文件更新了，那么就采取返回新文件的方式。 头：`Last-modified / if-modified-since`
后续访问的时候发送请求和资源标识的字段名为`If-Modified-Since`放在请求头里面


last-modified 的问题在于
  1. 最后修改时间变化了，但是内容没变
  2. 由于只精确到秒，所以同一时间无法检测多次修改

- 摘要算法 md5 hash
    1. 不同内容摘要的结果肯定不同
    2. 生成的长度相同
    3. 两个相同内容摘要的结果肯定相同
    4. 无法通过最终的结果反推原内容
    5. 输入有细微改变会导致结果产生剧烈变化（雪崩效应）

`Etag`/ `if-none-match` 如果签名一致则认为文件没有变化
后续访问的时候发送请求和资源标识的字段名为If-None-Match放在请求头里面

考虑到性能问题，一般会使用弱指纹：`last-modified` + 文件长度 成为一个指纹
（表现形式Etag:W/"xxx3423680412-d62serveav")
[关于E-tag 的强弱：RFC7232](https://datatracker.ietf.org/doc/html/rfc7232#section-2.1)

#### E-tag 的补充
[参考链接：2022年Etag 还这么重要么？](https://www.zhihu.com/question/532057768/answer/2484183784)
这里假设了一个大前提，大家都在使用 Nginx 的情况下，E-tag 使用建立在 Nginx 生成 E-tag 的前提，
> `nginx` 中的 `etag` 由 `last_modified` 与 `content_length` 组成，而 `last_modified` 又由 
> `mtime` 组成
> 当编辑文件却未更改文件内容时，`mtime` 也会改变，此时 `etag` 改变，但是文件内容没有更改。

nginx 不再依赖内容本身的哈希。使用内容长度加时间戳的格式生成 E-tag 也减小了服务器的消耗。
[nginx 缓存E-tag 是怎么生成的](https://github.com/shfshanyue/Daily-Question/issues/112)

### Cache-control
Cache-control 中的值，很多既能用在请求中也能用在响应中，但是它们的在不同语境下表述的内容是不同的，比如`max-age` 和 `no-cache`

#### 请求头中的值

请求头中的值在代理缓存中起到相当大的作用

* `max-age`: 告诉服务器，客户端不会接受`Age`超出`max-age`秒的缓存
* `max-stale`: 告诉服务器，即使缓存不再新鲜，但陈旧秒数没有超出`max-stale`时，客户端仍打算使用。若`max-stale`后没有值，则表示无论过期多久客户端都可以使用
* `min-fresh`: 告诉服务器，`Age`至少经过 `min-fresh` 秒后缓存才可使用
> `max-stale` 和 `min-fresh` 主要是对代理服务器缓存的精细控制

* `no-cache`: 告诉服务器，不能直接使用已有缓存作为相应返回，除非带着焕春条件到上游服务端得到 304验证返回码才可使用现有缓存

* `no-store`: 告诉各代理服务器不要对该请求的响应缓存（实际上不少的代理服务器并不会遵守这个...）
* `no-transform`: 告诉代理服务器不要修改消息包体的内容
* `only-if-cached`: 告诉服务器仅能返回缓存的响应，分则若没有缓存则返回 504 错误码

#### 响应头中的值

* `must-revalidate`: 告诉客户端一旦缓存过期，必须向服务器验证后才可使用

* `proxy-revalidate`： 与上面类似，但只对代理服务器的共享缓存有效

* `no-cache`：（下面参考http权威指南）

* `max-age`: 告诉客户端缓存 Age 超出 max-age 秒后则缓存过期

* `s-maxage`：与 `max-age`相似，但仅针对共享缓存，而且优先级高于 `max-age` `Expires`

* `public`: 表示无论私有还是公有缓存都可以将该响应缓存

* `private`: 表示该响应不能被代理服务器作为共享缓存使用。若 `private`后指定头部，则在发生代理服务器不能缓存指定的头部，但是可以缓存其他部分

* `no-store`: 告诉所有下游节点不能对响应进行缓存

* `no-transform`: 告诉代理服务器不要修改消息包体的内容（与请求的一致）


#### 对两个字段特别说明一下
1. `no-cache` : 不缓存，但是缓存中有，每次询问服务器。
可以在本地缓存，可以在代理服务器缓存，但是这个缓存要服务器验证才可以使用

这里描述建议参考下面这段
> 标识为 `no-cache` 的响应实际上是可以存储在本地缓存区中的。只是在于原始服务器进行新鲜度在验证之前，缓存不能将其提供给客户端使用。这个首部使用 `do-not-serve-from-cache-without-revalidation` 这个名字会更恰当一点。 ———— 《HTTP 权威指南》
所以这个头可以理解为，**缓存下来了，而且每次都请求验证新鲜度**。

2. `no-store` :真正的不缓存，压根没缓存 （不会两个都写)

> 禁止缓存对相应进行复制。缓存通常会像非缓存代理服务器一样，向客户端转发一条no-cache响应，然后删除对象。
> ———— 《HTTP 权威指南》



如果缓存在代理服务器上，Cache-control 不含`private` 和 `Authorization`值


## 缓存新鲜度的计算
优先级：cache-control(s-maxage > max-age) > Expires
Etag > last-modified


## 代理缓存（CDN缓存）

不管是强缓存和协商缓存，都可以用代理缓存，其实也是cdn缓存。最后都要加协商字段，让代理服务器和源服务器协商

通过 `age` 返回值，告诉你资源在代理服务器存了多久，
`s-maxage` 告诉你代理缓存的最大时间

关于 `Age` 首部
Age 表示自源服务器发出响应（或者验证过期缓存），到使用缓存的响应发出时经过的秒数
  - 对于代理服务器管理的共享缓存，哭护短可以根据 `Age` 头部判断时间
  - Age 的计算方式比较特殊，它根据请求从源服务器发出时间为基础，代理服务器接收响应时间为差值进行的一套计算方式。具体可以查一下规范。
  - Age = delta-seconds = 1*DIGIT (RFC 规范中的要求是，至少能支持到2^31秒数)

代理服务收到源服务器发来的响应数据后需要做两件事：
  1. 把报文转发给客户端
  2. 把报文存入自己的 Cache

所以，下次再有同样的请求，代理服务器就可以直接发送 304 或者缓存数据，不必再从源服务器获取。这样就降低了客户端的等待时间，同时节约了源服务器的网络带宽

缓存代理的身份只是一个数据的“中转站”，所以缓存代理控制分为两部分，一是源服务器端的控制，二是客户端的控制

ps: 如果缓存在代理服务器上，Cache-control 不含`private` 和 `Authorization`,同时也无法使用`http-equiv`。

## HTML meta 缓存

浏览器缓存机制，其实主要就是HTTP协议定义的缓存机制（如： Expires； Cache-control等）。但是也有非HTTP协议定义的缓存机制，如使用HTML Meta 标签，Web开发者可以在HTML页面的`<head>`节点中加入`<meta>`标签，代码如下
用于设定网页的到期时间，一旦过期则必须到服务器上重新调用。需要注意的是必须使用GMT时间格式；
```html
<meta http-equiv="Expires" contect="Mon,12 May 2001 00:20:00 GMT">
```
用于设定禁止浏览器从本地机的缓存中调阅页面内容，设定后一旦离开网页就无法从Cache中再调出；
```html
<meta http-equiv="Pragma" contect="no-cache">
```
使用上很简单，但只有部分浏览器可以支持，而且所有缓存代理服务器都不支持，因为代理不解析HTML内容本身。而广泛应用的还是 HTTP头信息 来控制缓存

## 问题
### 即使有“Last-modified”和“ETag”，强制刷新（Ctrl+F5）也能够从服务器获取最新数据（返回 200  而不是 304），请你在实验环境里试一下，观察请求头和响应头，解释原因

强刷新下的请求头字段 If-None-Match 变成了 Cache-Control: no-cache

### 如果强缓存协商缓存都没有设置，这个时候怎么办？
1. 浏览器根据 RFC7234 会有一个推荐预估时间
常见 （DownloadTime - LastModified)* 10%

2. 有初次之外一个**试探性过期**的概念：

> 如果相应中没有 `Cache-Control: max-age` 首部，也没有 `Expires` 首部，缓存可以计算出一个试探性最大试用期。可以使用任意算法，如果得到的最大试用期大于24小时，就应该向响应首部添加一个 `Warning: 113 Heuristic Expiration ` （试探性过期警告，警告113）首部。据我们所知，很少有浏览器会为用户提供这种警告信息。
`Warning`头是对缓存字段的补充字段...

**LM-Factor 算法**是一种很常用的试探性过期算法，**如果文档中包含了最后修改日期**，就可以使用这种算法。LM-Factor算法将最后修改日期作为依据，来估计文档有多么易变。

LM-Factor 算法逻辑：
  - 如果已缓存文档最后一次修改发生在很久以前，它可能会是一份稳定的文档，不太会突然发生变化，因此将其继续保存在缓存中会比较安全。
  - 如果已经缓存文档最近被修改过，就说明它很可能会频繁地 发生变化，因此在与服务器进行再验证之前，只应该将其缓存很短一段时间

实际的LM-Factor 算法会计算缓存与服务器对话的时间跟服务器声明文档最后被修改的时间之间的差值，取这个间隔时间的一部分，将其作为缓存中的新鲜度持续时间。下面是LM-factor 算法的 Perl 伪代码：
```Perl
$time_since_modify = max(0, $server_Date - $server_Last_Modified);
$server_freshness_limit = int($time_since_modify * $lm_factor);
```

> ——《http权威指南》

### 如果一个缓存在代理服务器中长时间未引用，代理服务器是通过什么办法清空它的？


手动可以通过 `purge` 字段请求进行代理服务的缓存清空操作，这个方法几乎已经是缓存里的跟GET，HEAD，POST处于相同地位的重要方法。PURGE请求告诉缓存服务器，该url对应的文件需要从系统里删除；
>There is an HTTP PURGE method, though it is not defined in the HTTP RFCs (which do allow for custom methods beyond the standard defined methods). Some HTTP servers and caching systems actually do implement PURGE, for instance Squid and Varnish:
>

代理服务器通过LRU算法来管理内存。LRU的原理是通过链表结构实现：
1. 维护一个有序单链表，越靠近链表尾部的结点是越早之前访问的。当有一个新的数据被访问时，我们从链表头开始顺序遍历链表。
2. 如果此数据之前已经被缓存在链表中了，我们遍历得到这个数据对应的结点，并将其从原来的位置删除，然后再插入到链表的头部。
3. 如果此数据没有在缓存链表中，又可以分为两种情况：
  a) 如果此时缓存未满，则将此结点直接插入到链表的头部；
  b) 如果此时缓存已满，则链表尾结点删除，将新的数据结点插入链表的头部。

> PS: 补充： 空间是有上限的，当缓存满了就需要缓存淘汰策略。常见三种：
* 先进先出策略 FIFO(First In, First Out)
* 最少使用策略 LFU (Least Frequently Used)
* 最近最少使用策略 LRU (least Recently Used)

## 参考资料


《HTTP 权威指南》
[彻底弄懂 Http 缓存机制 - 基于缓存策略三要素分解法](https://mp.weixin.qq.com/s/qOMO0LIdA47j3RjhbCWUEQ?)
[HTTP强缓存和协商缓存](https://segmentfault.com/a/1190000008956069)
《Web协议详解与抓包实战》
[缓存服务器设计与实现](https://www.cnblogs.com/my_life/articles/7216603.html)