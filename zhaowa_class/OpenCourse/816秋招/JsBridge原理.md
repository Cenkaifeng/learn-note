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
