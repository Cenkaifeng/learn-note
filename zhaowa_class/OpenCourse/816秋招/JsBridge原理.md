Hybrid 混合开发

native + h5 开发

native <-> jsbridge ->h5

h5 可以通过jsbridge 获得native端能力


### URL Scheme, 客户端拦截webview请求

1. 原理

webview中发出的网络请求，都会被客户端监听和捕获

和客户端定义自己的协议头

custom://setxxx/api?params=xxx // 有长度限制可能会截断


通过 iframe 发送请求 

### 注入api

window.customWebview = {// 类似JsH5Bridge
    setLeftButton,
    //...
}

```js
const callbackName = 'xxx';
window.customWebview[lsetLeftButton]({
    trigger:callbackName,
    ...other
})


window[callbackName] = function() {
    
}
```


## H5 在 app 内的运行方式

1. app 的 webview 直接加载一个 url 链接
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