# 高频面试题 Part 2

## 1.closures 你了解闭包吗？ 你平时常用的闭包的应用场景有哪些？

### 闭包的定义

闭包是指那些能够访问**自由变量**的函数。

自由变量：指在函数中使用的，但既不是函数参数也不是函数局部变量的变量。

  1. 从理论角度：所有的函数都有可能是闭包。函数中去访问全局变量就相当于是在访问自由变量
  2. 从实践角度：
    1. 即使创建它的上下文已经被销毁了，但是它仍然存在。（内部函数从父函数中返回，柯里化常见概念）
    2. 代码中引用了只有变量
  
  **应用场景**

  1. 柯里化函数

  避免频繁调用具有相同参数的函数，同事能够轻松的复用。
  其实就是封装一个高阶函数（一个函数返回值是一个新的函数，和 React 高阶组件一样）。

```js
function getArea(width, height) {
  return width * height;
}

const area1 = getArea(10, 20);
const area2 = getArea(10, 30);
const area3 = getArea(10, 40);
const area4 = getArea(10, 50);
// 如果出现上述需求场景
function getArea(width) {
  return height => {
    return width * height;
  }
}



const getTenWidthArea = getArea(10);
const area1 = getTenWidthArea(20);
const area2 = getTenWidthArea(30);
const area3 = getTenWidthArea(40);
const area4 = getTenWidthArea(50);


```
2. 使用闭包实现私有化方法/变量

模块。

现代化的打包方式 最终就是每个模块的代码都是相互独立的。

```js
function funOne(i) {
  function funTwo() {
    console.log('数字' + 1)
  }
  return funTwo;
}

const fa = funOne(110);
const fb = funOne(111);
const fc = funOne(112)

```

3. 匿名自执行函数

```js
var funOne = (function() {
  var num = 0;
  return function() {
    num++;
    return num;
  }
})();

console.log(funOne());//1
console.log(funOne());//2
console.log(funOne());//3
```

4. 缓存一些结果

外部函数中创建一个数组，闭包函数可以获取或者修改这个数组的值，延长了变量的生命周期。

```js
// EventBus 发布订阅里也用了一个私有数组来储存

function funParent() {
  let memo = [];

  function funTwo(i) {
    memo.push(i);
    console.log(memo.join(','));
  }
  return funTwo;
}

const fn = funParent();
fn(1);
fn(2);
```
### 总结
- 创建私有变量
- 延长变量的生命周期


### 代码题
// 见 closures/*


## 2. eventbus

// eventemitter3、Vue中的事件总线、Vuex、发布订阅

这种模式，事件的触发和回调之间是同步的还是异步的？（同步）

```js
const event = new Event();

event.on('test', () => console.log(111))
console.log(222)
event.emit('test');
console.log(333);
// 222
// 111
// 333
```

## 3. network and concurrency

### HTTP 1.0/1.1/2.0 在并发请求上的主要区别是什么？

1. HTTP/1.0

每次 TCP 连接都只能发送一个请求，当服务器响应后就会关闭此次连接，下次再发请求还需要再次建立 TCP 连接。

2. HTTP/1.1
默认采用持续连接， TCP 连接默认不关闭，可以被多个请求复用，不用显式声明keep-alive

增加了管道机制（说白了还是在并发这块做优化），在同一个 TCP 连接里，允许多个请求同时发送（只是发送），增加一定的并发性。但是同一个 TCP 连接里，所有的数据通信是按照顺序进行的，如果服务器响应慢，会有很多的请求在排队，造成“队头阻塞”

client: 1,2,3,4

server:
0s 1 -> 10s
10s 2 -> 1s
11s 3 -> 1s


3. HTTP/2.0

加了双工模式，客户端可以同时发送多个请求，服务器也可以同时响应多个请求，解决了 HTTP 的队头阻塞问题。使用了多路复用技术，做到了同一个 TCP 连接可以并发处理多个请求。
服务器可以主动向卡护短发送数据（server push)

### HTTP/1.1 长连接和 HTTP/2.0 多路复用的区别

1.1：同一时间一个 TCP 连接只能处理一个请求，采用一问一答形式，上一个请求响应后才能处理下一个请求。由于浏览器***同域名**最大连接数的限制，所以才有了最大并发请求数的限制。

2.0： 同域名下的所有通信都在单个连接上完成。

### 为什么 HTTP1.1 不能实现多路复用的功能呢？

HTTP/2 基于二进制帧的协议
HTTP/1.1 基于文本分割解析的协议

## 4. data structure

## 5. debounce and throttle
 
// TODO: 防抖回流在公开课系列里说了很多了，可以整个成一个单独的专题

