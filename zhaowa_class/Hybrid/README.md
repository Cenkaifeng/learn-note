# 现代 Hybrid 开发与原理解析

1. Native App

具体氛围 android 和 iOS 系统。

Java/Swift, C++

优点：拥有最好的性能和最好的体验
缺点：开发和发布成本非常高，两端都需要不同的技术人员来维护。

2. Web App

H5 应用， spa mpa(mutiple)

js/ts, vue/react/angular(rxjs)

* 优点

  1. 开发和发布非常方便
  2. 可以随时发布更新
  3. 可以跨平台，调试非常方便
  4. 不存在多版本的问题，维护成本很低

* 缺点：

  1. 性能和体验比较一般
  2. 受限于浏览器，能做的事情不多，兼容各种浏览器.Android 4.2/4.4 / ios9 等
  3. 入口强依赖浏览器，只能以url的形式存在。

3. RN / Weex

4. Flutter

dart


## Hybrid 基本介绍

把 H5 / Native 的开发形式混合在一起。

app -> webview -> h5

### 微信 jssdk

sdk 中提供了什么样的方法是我们需要关心的。他们之间的通信其实不需要关注。

```js
wx.config({
  appId: 'xxx'
})

wx.ready(() => {
  wx.onMenuShareAppMessage({
    title:'',
    desc: '',
    link:''
  })
})
```

## 现代 Hybrid 开发与原理解析

### Hybrid 开发架构

最核心的是 Native 和 H5 的双向通讯，而这个通讯其实完全依赖于 native 提供的 webview 容器.

webview 到底有什么特点可以撑起双向通讯？

具体的通讯流程又是什么样子的？

A：主要有两种方式：

1. URL Schema: 客户端通过拦截 webview 请求来完成通讯。xxxname://
2. Native 向 webview 中的js 执行环境注入 Api, 以此来完成通讯。


#### 一、URL Schema

1. 原理

webview 中发起的请求，都会被客户端监听和捕获到。

2. 定义自己的私有协议

在应用内使用路径容易和http协议搞混。
一定要定制一套 h5 和 native 交互的私有协议，我们通常称呼为 URL Schema

Jervis://

Jervis://setLeftButton?xxx=1&p2=xxx
...

3. 请求的发送

webview中请求的发送，我们一般使用iframe的方式，（location.href也行，就是容易跳所以pass掉了）

```js
const doc = window.document;
const body = doc.body;
const iframe = doc.createElement('iframe');

iframe.style.display = 'none';
iframe.src = 'Jervis://setLeftButton?p1=xxx';

body.appendChild(iframe);

setTimeout(() => {
  body.removeChild(iframe);
}, 200)// 通常是用客户端callback 通知后再移除
```

安全性：客户端一般会设置域名白名单

4. 客户端拦截协议请求

iOS 和 Android

* iOS：shouldStartLoadWithRequest
* Android: shouldOverrideUrlLoading



5. 请求处理完成后的回调

callback
window.addEventListenner, window.dispatchEvent

```js
webbiew.setLefButton({param1: 111}, (err) => {
  if(err){

  }
  // 业务逻辑
})
```

* H5调用setLeftButton方法的时候，需要通过 webviewapi的名称 + 参数作为唯一标识，注册时间。

```js

const handlerId = Symbol();

const eventName = `setLeftButton_${handlerId}`;

const event = new Event(eventName);

window.addEventListener(eventName, (res)=> {
  if(res.data.errcode){
    //todo
    return
  }
  console.log('success')
})

JsBridge.send('xxx://xxx')
```

* 客户端在接收到请求的时候，完成自己对应的处理，dispatchEvent,携带回调的数据触发自定义时间


```js

event.data = { errcode: 0};

window.dispatchEvent(event);
```

#### 注入API

URL Schame 有个比较大的缺点，如果参数太长，会被截断。

native 向 js 执行环境中注入 API

1. 向native传递信息

window.JervisJsBridge = {
  setLeftButton: (params) => {},
  xxx: (params) => {}
}

```js
window.JervisJsBridge['setLeftButton'](params);
```

一般情况会对参数进行编码（以防参数乱码），比如转换为base64的格式

2. 准备接受native的回调

我们同样在window上去生命接收回调api
```js
// 一定要和调用方一致
window['setLeftButton_Callback_1'] = (errcode, response) => {
  console.log(errcode)
}
```

3. native调用回调函数

```js
const callbackName = 'setLeftButton_Callback_1';
window.JervisJsBridge['setLeftButton']({
  ...params,
  trigger:callbackName
});

window[callbackName] = (errcode, response) => {
  console.log(errcode);
}

```



## H5 在 app 内的运行方式

1. app 的 webview 直接加载一个  链接
非常灵活和方便，但是拥有和浏览器一样的体验，加载速度受到网络影响

2. app 内置 H5 资源

优点：
* 首屏加载速度非常快，用户体验接近原生
* 可以不依赖网络，离线运行

缺点：
* 发版周期会受到app的制约
* app的体积也会增大
* 需要多方合作

app内的H5 资源需要随着 H5 的代码更新而更新。

完成开发后，H5代码推送到管理平台进行构建和打包，然后管理平台通过事先设计好的长连接通道将H5新版本信息推送给客户端，客户端收到更新指令后，开始下载新包，对包进行完整性校验，merge本地对应的包，更新结束。


## 开发中的常见问题

1. iOS webview 滑动不流畅

`-webkit-overflow-scrolling: touch;`;

2. 刘海屏的安全区域的留白

meta viewport vierport-fit cover

```css
.bottom {
    padding-bottom: 0;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
}
```
3. 滚动穿透（滑动穿透）

主要出现在弹窗出现的时候

3.1 弹窗内无滚动，背景页面有滚动

```js
document.body.addEventListener('touchmove', e=> {
    e.preventDefault();
})

@touchmove.prevent // vue
```

3.2 弹窗内有滚动，背景页也有滚动

```js
const inserted = () => {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

    document.body.style.cssText += `position:fixed; width: 100%; top:-${scrollTop}`;
}

const unbind = () => {
    document.body.position = '';
    const top = document.body.style.top;
    document.body.scrollTop = -parseInf(top, 10);
    document.body.style.top = '';
}
```