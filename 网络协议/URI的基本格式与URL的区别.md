### 什么是URI




* URL：[RFC1738](https://www.ietf.org/rfc/rfc1738.txt)(1994.12),
Uniform Resource Locator, 表示资源的位置，期望提供查找资源的方法

* URN：[RFC2141](https://www.ietf.org/rfc/rfc2141.txt)(1997.5),
Uniform Resource Name, 期望为资源提供持久的、位置无辜感的表示方式，并允许简单地讲多个命名空间映射到单个URN明明空间
    * 例如磁力链接 magnet:?xt=urn:sha1:YNCKHTQC5C

* URI: [RFC1630](https://www.ietf.org/rfc/rfc2141.txt)(1994.6)、[RFC3986](https://www.ietf.org/rfc/rfc3986.txt) (2005.1,取代 RFC2369 和 RFC2732),
Uniform Resource Identifier,用以区分资源，是URL 和 URN的超集，用以取代URL和URN的概念。

组成
    1. schema,
    2. user
    3. information
    4. host
    5. port
    6. path
    7. query
    8. fragment

ex: abc://username:password@example.com:123/path/data?key=value&key2=value2#fragidl

URI = scheme ":" hier-part [ "?" query ] [ "#" fragment]

scheme = AlPHA*(ALPHA/DIGIT/"+"/"-"/".")
    EX: HTTP,HTTPS,ftp,mailto,rtsp,file,telnet

query = *(pchar/"/"/"?")

fragment = *(pchar/ "/" / "?")