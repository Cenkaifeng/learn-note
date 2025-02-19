# 前端安全知识体系

---

## 一、网络安全基础（攻击类型）

### **被动攻击**

- **特点**：隐蔽性强，难以检测  
- **典型形式**：网络监听（如明文传输窃取）  
- **防御手段**：加密传输（SSH/HTTPS）

### **主动攻击**

- **常见形式**：  
  - 假冒身份、重放攻击、消息篡改  
  - 拒绝服务攻击（DoS/DDoS）  
- **防御手段**：  
  - 防火墙、入侵检测系统（IDS）  
  - SYN攻击防御（缩短超时时间、SYN Cookies技术）

---

## 二、前端攻击与防御

### 1. XSS（跨站脚本攻击）

#### **攻击类型**

| 类型       | 触发场景                 | 示例                          |
|------------|--------------------------|-------------------------------|
| **存储型** | 恶意代码存入数据库       | 论坛评论中嵌入`<script>alert(1)</script>` |
| **反射型** | URL参数触发              | `https://xxx.com/search?q=<script>...</script>` |
| **DOM型**  | 浏览器直接执行恶意代码   | `javascript:alert(document.cookie)` |

#### **防御措施**

- **输入过滤**：转义HTML/JS敏感字符  

  ```js
  // 转义示例
  function escapeHTML(str) {
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  ```

- **CSP策略**：限制资源加载来源  

  ```http
  Content-Security-Policy: default-src 'self' *.trusted.com; script-src 'unsafe-inline'
  ```

- **HttpOnly Cookie**：阻止JS访问敏感Cookie  

### 2. CSRF（跨站请求伪造）

#### **攻击步骤**

1. 用户登录受信网站A并保留Cookie  
2. 诱导用户访问恶意网站B  
3. 网站B伪造A的请求（携带用户Cookie）  

#### **攻击类型**

- **GET型**：
  在页面中的某个img发起一个get请求
  `<img src='xxxxx'/>`

- **POST型**：
  自动提交表单到恶意网站

  ```html
    <form methdo="POST">
      <input type="hidden" name="account" value="jervis"/>
    </form>
    <script>document.forms[0].submit()</script>
  ```

#### **防御策略**

- **CSRF Token**：动态Token验证请求  

  ```html
  <!-- 表单中嵌入Token -->
  <input type="hidden" name="csrf_token" value="随机字符串">
  ```

- **同源检测**:

  - request header 对下面两个字段的监测
      [origin](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Origin)
      [referer](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Referer)
      referer 中也有不同的策略

  - [Referer-Policy](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Referer)
    如果请求中没有referer相当于被安全策略`Referer-Policy`拦下了，所以可以不去访问这个请求
    [Referer-Policy 的新默认值](https://cloud.tencent.com/developer/article/1748911)

    > Origin 属性只包含了域名信息，并没有包含具体的 URL 路径，这是 Origin 和 Referer 的一个主要区别。在这里需要补充一点，Origin 的值之所以不包含详细路径信息，是有些站点因为安全考虑，不想把源站点的详细路径暴露给服务器。因此，服务器的策略是优先判断 Origin，如果请求头中没有包含 Origin 属性，再根据实际情况判断是否使用 Referer 值。
- **Cookie策略**：设置 `SameSite=Strict`  
  完全禁用第三方 cookie

  ```http
  Set-Cookie: sessionId=abc123; SameSite=Strict 
  Lax: POST / img / iframe 不会携带 cookie
  None: 不设置，默认
  ```

### 3. SQL注入与防范(偏后端，但前端也要留意)

- **攻击原理**：通过用户输入注入恶意SQL语句  

  ```sql
  -- 恶意输入示例
  ' OR 1=1; --
  ```

- **防御策略**：  
  - 前端：输入格式校验（正则限制）  
  - 后端：参数化查询、特殊字符转义  
  - 部署WAF防火墙  

---

## 三、浏览器安全策略

### 1. 关键HTTP头配置

| 策略                          | 作用                               | 示例配置                          |
|-------------------------------|------------------------------------|-----------------------------------|
| `Content-Security-Policy`     | 限制资源加载来源                   | `default-src 'self'`              |
| `X-Frame-Options`             | 禁止页面被嵌入iframe               | `DENY`                            |
| `Strict-Transport-Security`   | 强制HTTPS连接                      | `max-age=31536000; includeSubDomains` |
| `Subresource-Integrity`       | 验证CDN资源完整性                  | `<script integrity="sha256-...">` |

### 2. SRI（子资源完整性）

- **实现步骤**：  
  1. 生成资源哈希值  

     ```bash
     openssl dgst -sha384 -binary file.js | openssl base64 -A
     ```

  2. 注入到HTML  

     ```html
     <script src="https://cdn.example.com/file.js" 
             integrity="sha384-生成的哈希值"></script>
     ```

---

## 四、服务端安全（Node.js相关）

### 1. 文件操作风险

- **漏洞场景**：路径遍历攻击  

  ```js
  // 恶意请求示例：访问敏感文件
  app.get('/file', (req, res) => {
    const filePath = req.query.path; // 用户传入../../../etc/passwd
    res.sendFile(filePath);
  });
  ```

- **防御**：使用安全库处理路径  

  ```js
  const { resolve } = require('path');
  const safePath = resolve('./public/', userInput);
  ```

### 2. ReDoS（正则表达式攻击）[demo:](./redos.js)

- **恶意正则示例**：  

  ```js
  // 高风险正则（回溯爆炸）
  const regex = /^(a+)+$/;
  ```

- **防御**：简化正则或使用检测工具  
  [ReDoS测试工具](https://regex.rip/)

参考：
[一个正则的地狱回溯](https://snyk.io/node-js/connect)

### 3. 时序攻击

- **漏洞代码**：  

  ```js
  //比如 realArray= [2, 3, 6, 1]
  function compareArrays(a, b) {
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false; // 响应时间泄露信息
    }
    return true;
  }
  ```

- **攻击者尝试下面操作**

1. `inputArray= [1, 2]`
2. `inputArray = [1, 3]`
  发现两种响应时间几乎一致，则可以认为第一个数字不是1
3. `inputArray= [2, 3]`

以此类推，攻击者可以用大量的数据碰撞猜测出逻辑。

- **如何防御？**：
所有逻辑执行时间、逻辑分支执行时间一致，攻击者才无法判断走了哪只逻辑

- **修复代码**：使用恒定时间比较  

  ```js
  const crypto = require('crypto');
  crypto.timingSafeEqual(aBuffer, bBuffer);
  ```

### 4. DoS/DDoS

SYN攻击示例

- **SYN攻击是什么？**：
服务器端的资源分配是在二次握手时分配的，而客户端的资源是在完成三次握手时分配的，所以服务器容易受到SYN洪泛攻击。SYN攻击就是Client在短时间内伪造大量不存在的IP地址，并向Server不断地发送SYN包，Server则回复确认包，并等待Client确认，由于源地址不存在，因此Server需要不断重发直至超时，这些伪造的SYN包将长时间占用未连接队列，导致正常的SYN请求因为队列满而被丢弃，从而引起网络拥塞甚至系统瘫痪。SYN 攻击是一种典型的 DoS/DDoS 攻击。

检测 SYN 攻击非常的方便，当你在服务器上看到大量的半连接状态时，特别是源IP地址是随机的，基本上可以断定这是一次SYN攻击。在 Linux/Unix 上可以使用系统自带的 netstat 命令来检测 SYN 攻击。

```bash
# 检测SYN攻击（Linux）
netstat -nap | grep SYN_RECV
```

- **SYN攻击的防御**：

1. 缩短超时（SYN Timeout）时间增加最大半连接数过滤网关防护SYN cookies技术，
2. 直接用 https

---

## 五、网络层安全

### 1. DNS劫持

- **防御措施**：  
  - 使用公共DNS（如`8.8.8.8`）  
  - 定期检查HOSTS文件  
  - 使用复杂的密码重置路由器的默认密码。
  - 使用DNS注册器时使用双因素身份验证，并修补路由器中存在的所有漏洞以避免危害。
  - 远离不受信任的网站，避免下载任何免费的东西。
- **补救措施**：
  - 如果您已被感染，建议删除HOSTS文件的内容并重置Hosts File

### 2. CDN击穿

- **场景**：缓存未命中导致回源请求激增  
- **应对策略**：  
  - **预热CDN**：提前加载热点资源  
  - **自动刷新**：配置CDN定期更新  

---

## 六、其他安全实践

### 1. ARP欺骗防御

- **原理**：伪造成网关，让受害者的数据经过攻击者的电脑，从而抓去别人的用户信息,针对以太网地址解析协议- ARP (网络层)的一种攻击技术，通过欺骗局域网内访问者PC的网关MAC地址，使访问者PC错以为攻击者更改后的MAC地址是网关的MAC，导致网络不通。
(常见作用于路由器Arp表)
- **防御**：绑定IP-MAC、使用ARP防火墙  

### 2. HTTPS强制

- **配置HSTS**：  

  ```http
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  ```

### 3 XFF 协议头伪造ip注入攻击

- **原理**：payload：X-Forwarded-For: 协议头伪造ip注入攻击 [HTTP X-Forwarded-For](https://www.runoob.com/w3cnote/http-x-forwarded-for.html)

### 4. 输入验证

- **双重校验**：  

  ```js
  // 前端校验（格式）
  if (!/^[a-zA-Z0-9]{6,20}$/.test(username)) {
    throw new Error('用户名不合法');
  }
  // 后端校验（内容）
  if (containsMaliciousCode(input)) {
    throw new Error('检测到恶意输入');
  }
  ```

---

## 八、附录：攻击模拟与测试工具

- **XSS攻击模拟**：  
  [XSS挑战平台](https://alf.nu/alert1)
- **正则表达式测试**：  
  [regex.rip](https://regex.rip/)
