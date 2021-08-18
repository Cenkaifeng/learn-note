## 前端路由 router 原理极其表现.

vue -> hash, history
react -> hash, history

1. 页面的交互不会刷新页面
2. 不同url/路径/路由 会渲染不同的内容.

Hash 和 History 的区别？

1. hash 有个#, history没有.
2. hash 的#部分不会传给服务端, history 的所有url内容服务端都可以获取到。
3. history路由， 应用在部署的时候，需要注意html文件的访问.

    nginx proxy_path 设置


4. hash 通过 hashchange 监听变化， history 通过popstate 监听变化.


### Hash

#### 特性

1. url 中有一个#, #z只是浏览器端/客户端的状态， 不会传递给服务器

www.baidu.com/#/user => http -> www.baidu.com/
www.baidu.com/#/list/detail/1 => http -> www.baidu.com/

2. hash值的改变，不会导致页面的刷新

```js

location.hash = '#aaa';
location.hash = '#bbb';
```

3. hash值的更改，会在浏览器访问历史中添加一条记录。可以通过浏览器的返回、前进按钮来控制hash的切换。

4. hash值的更改，会触发hashchange事件

```js
location.hash = '#aaa';
location.hash = '#bbb';

window.addEventListener('hashchange', () => {})
```

5. 如何更改hash

5.1 location.hash = '#aaa';

5.2 <a href="#user">点击跳转到user</a>

### History

hash 有个#符号，不美观，服务端无法接收到hash部分.

```js
winow.hastory.back();// 后退一步 go(-1)
window.history.foward();// 前进一步 go(1)
window.history.go();
window.history.pushState();// location.href 页面的浏览记录里会添加一个历史记录
window.history.replaceState();// location.replace

```

### pushState / replaceState 的参数

window.history.pushState(null, 'new', path);

1. state, 是一个对象，是一个与指定网址相关的对象. 
2. title, 新页面的地址。
3. url, 页面的新地址

### 面试题

pushState， 会触发popState事件么？

1. pushState/replaceState 都不会触发popState事件。需要手动触发页面的重新渲染
2. popState 什么时候才会触发？
    2.1 点击浏览器后退按钮
    2.1 点击浏览器前进按钮
    2.3 js back
    2.4 js forward
    2.5 js go

### Nginx 配置

1. index.html 存在服务器本地

www.jervis.com/main
```nginx
location /main/ {
    try_files $uri $uri/ /hom/dist/index.html
}


```

2. index.html 存在于远程地址。 oss/cdn

nginx 配置在a服务器， index.html 被传到cdn上.


www.jervis.com/main/a
www.jervis-cdn.com/file/index.html
```ngin
location /main/ {
    rewrite ^ /file/index.html break; 重写路径
    proxy_pass https://www.jervis-cdn.com;
}
```