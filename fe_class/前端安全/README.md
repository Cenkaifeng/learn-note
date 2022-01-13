# TODO: 待整理前端安全相关所有内容

XSS/CSRF

## 你了解哪些前端安全相关的知识

浏览器相关：

1. XSS
2. CSRF
3. [HTTPS](./../../网络协议/https.md)
4. CSP (内容安全策略，可以禁止加载外域的代码，禁止外域的提交)
  设置指令：
    key是资源，值是none，self（自身），eval，url（允许的域名），inline(内联)等
5. HSTS (强制客户端使用HTTPS与服务端建立连接)
6. X-Frame-Options (针对当前，控制当前页面是否可以被嵌入到iframe中)
7. SRI (subresource intergrity 子资源的完整性策略)(防止子资源被恶意篡改注入攻击脚本)
   1.  jervis-xxx-123124es213.js 注入到index.html,并且上传到cdn
   2.  用户在请求的时候，根据 jervis-xxx-123124es213.js 去请求，而这个文件可能被篡改.
   3.  SRI 作用是：打包的时候根据js内容生成一个`hash`值，并且把`hash`值作为`intergrity`属性注入到`script`上。只要哈希不一样，就能认为不一样或者不完整
8. Referer-Policy(控制 referrer的携带策略)

Node(服务端)相关的：

1. 本地文件操作相关，(有可能让不怀好意的攻击者 动你的ssh私钥或者host污染你DNS列表)
2. ReDos (正则Dos攻击)
3. 时序攻击
4. ip origin referrer / request header.(各个网站爬虫防范点)

## 能稍微详细的聊一下 XSS 吗？

1. 概念：
2. 攻击类型
3. 如何防范
4. 自己工作中是否遇到？如何解决的？


1. Cross-site scripting, 跨站脚本攻击
2. 攻击者想尽一切办法把可执行代码注入到你的网页中.

  ### 外在表现上，都有哪些攻击场景呢？
  1. 评论区植入js代码(即可输入的地方)
  2. url 上拼接js代码

  ### 技术角度上，有哪些类型的 XSS 攻击？
  1. 储存型 Server

    论坛发帖，商品评价，用户私信等等这些用户保存数据的网站.

    攻击步骤：

    * 攻击者将恶意代码提交到目标网站的数据库中
    * 用户打开目标网站的时候，服务端将评论(其实是恶意代码)从数据库中取出，拼接到html返回给浏览器。(这种场景一般是SSR项目出现)
    * 用户浏览器收到html后，混在其中的恶意代码就会被执行。
    * 窃取用户数据，发送到攻击者网站。

  2. 反射型 Server (说白了就是钓鱼链接)
  攻击者结合各种手段，诱导用户点击恶意url. 

  通过URL传参数的功能，比如网站的搜索或者跳转等。

  攻击步骤：

    * 攻击者构建出自己恶意的url
    * 直接执行可执行的恶意代码,

  3. Dom 型 Browser (demo: index.html / type-dom.js / remote.js)

  取出和执行恶意代码的操作，由浏览器完成.

  攻击步骤：
    比如获取一个 url参数
    * redirectUrl = javascript:alert(xxx)

  ### 如何去防范 XSS 攻击？

  主旨：防止攻击者提交恶意代码，防止浏览器执行恶意代码。

  1. 对数据进行严格的输入编码. 比如 html 元素，js，css，url
    少用 vue v-html 接收用户传入东西
    react dangerouslyHtml
    总之就是对输入严格控制

  2. CSP Content Security Policy (这是个请求头，如果久版本不支持可以用 X-XSS-Protection 代替方案)

  default-src 'self' 所有加载的内容必须来自站点的同一个源
  你可以加可信域名 *.jervis.com

  3. 输入验证 input type phone, Url, 电话号， 邮箱

  4. 开启浏览器的 XSS 防御： Http Only Cookie

  5. 验证码

xss 模拟网站
https://alf.nu/alert1

## 能再稍微详细聊一下CSRF吗？

概念: Cross-site request forgery,跨站请求伪造 (现在很少见了，各大公司和浏览器已经有完善的应对策略)
攻击者诱导受害者进入恶意网站，在恶意网站里向攻击的网站发送恶意请求。

### 攻击步骤
  1. 受害者 登录 a.com,并保留了登录凭证 cookie
  2. 攻击者诱导受害者访问 b.com
  3. b.com 向 a.com 发送请求， a.com/xxx, 浏览器就会直接带上 a.com的cookie
  4. a.com 收到请求了，忠实执行了对应操作
  5. 攻击者在受害者并不知情的情况下，冒充受害者让a.com执行了自己定义的操作

  比如攻击者目标是 a.com/getCash/ 这个接口用到用户的cookie，那么通过上述的步骤就成功伪造的了这个行为。没有任何防御措施的情况下会出现这类的攻击

### 攻击类型

  * GET型：在页面中的某个img发起一个get请求
  `<img src='xxxxx'/>`

  * POST型： 自动提交表单到恶意网站
  ```html
    <form methdo="POST">
      <input type="hidden" name="account" value="jervis"/>
    </form>
    <script>document.forms[0].submit()</script>
  ```

  * 诱导用户点击链接
  `<a herf="xxx" />`

### 如何防范 CSRF 攻击

CSRF一般都是发生在第三方域名，攻击者无法获取到cookie信息的。

  #### 阻止第三方域名的访问

  1. 同源检测
    * request header 对下面两个字段的监测
      [origin](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Origin) 
      [referer](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Referer)
      referer 中也有不同的策略
    * [Referer-Policy](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Referer)
    如果请求中没有referer相当于被安全策略`Referer-Policy`拦下了，所以可以不去访问这个请求

  2. Cookie SameSite

    Strict: 完全禁用第三方cookie
    Lax: POST / img / iframe 不会携带 cookie
    None: 不设置，默认

  #### 提交请求的时候附加额外信息

  1. CSRF Token (最大特点是，攻击者拿不到这个Token)
    * 用户打开页面的时候，服务器利用加密算法生成一个 Token
    * 每次页面加载的时候，前端把获取到的Token,加到能够发送请求的Html元素上，比如form, a这样的参数
    * 每次js 发起请求，也都携带Token
    * 服务器端每次接受请求时，就校验Token的有效性

  2. 双重Cookie (和上面类似)
    * 用户在访问网站的时候，服务器向浏览器注入一个额外的cookie. 内容随意，ex:csrfcookie=jervissxfasdfasdf
    * 每次前端发起请求，都拼上一个参数 csrfcookie=jervissxfasdfasdf
    * 服务校验csrfcookie是否正确

    **(它也是有问题的)**
    服务器发给前端 cookie 让前端取那就肯定不是 http only,
      1. 如果前端域名和服务器域名不一致，比如: 前端 fe.a.com, 服务端rd.a.com, cookie只能种到 .a.com 一级域名，并且设置为非 http only
      2. a.com 下每个子域名都可以获取到这个cookie
      3. 一旦某个子域名遭到了XSS攻击，cookie很容易被窃取或者篡改

## 本地文件操作 demo:static-server-dangerous.js

比如我们提供一个静态服务，通过请求的参数url来返回给用户/前想要的资源.
`localhost:8080/?/../../../`

防范措施：
  * express.static
  * koa-static
  * resolve-path

## ReDoS 正则表达式攻击 [demo:](./redos.js)

正则表达式会先去匹配第一种可能性

比如：ACCCD, 可以直接匹配发现成功，耗时很短

ACCCX, 没当一次匹配不成功，就会尝试回溯到上一个字符，看看能不有其他组合来匹配到这个字符串

1. CCC 
2. CC + C
3. C + CC
4. C + C + C

会排列组合出非常多的组合

参考：
[一个正则的地狱回溯 ](https://snyk.io/node-js/connect)
ReDoS 攻击测试网站 https://regex.rip/?

### node 时序攻击

```js

function compareArray(realArray, userInputArray) {
    for( let i = 0; i < realArray.lenght; i++ ) {
        if(realArray[i] !== userInputArray[i]) {
            return false;
        }
    }

    return true;
}
```

比如 realArray= [2, 3, 6, 1]

攻击者尝试

inputArray= [1, 2]
inputArray = [1, 3]
发现两种响应时间几乎一致，则可以认为第一个数字不是1
inputArray= [2, 3]

攻击者可以用大量的数据碰撞猜测出逻辑。

如何防御？
所有逻辑执行时间、逻辑分支执行时间一致，攻击者才无法判断走了哪只逻辑
