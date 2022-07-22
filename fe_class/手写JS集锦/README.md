# JS 手写题集锦，主要记录高频的前端面试题


## 实用性方法

1. 函数柯里化
  [Jump to demo](./README.md)

2. 防抖

3. 节流

4. eatMan [Jump to demo](./eatMan.js)

5. 实现一个发布订阅

6. 数组去重

7. 对象全等

8. 字符串替换
## 高频大厂手写
* TX
  写一个 LRU 缓存函数
  写个防抖和节流函数
  实现一个 compose 函数

* pdd
  实现一个深拷贝
  实现一个二叉搜索树转链表的方法
  实现一个数组转树形结构的函数
  实现一个 Promise.all


## api 实现类

1. 实现一个new
```js
function createObject(Con) {
    // 创建新对象obj
    // var obj = {};也可以
    var obj = Object.create(null);

    // 将obj.__proto__ -> 构造函数原型
    // (不推荐)obj.__proto__ = Con.prototype
    Object.setPrototypeOf(obj, Con.prototype);

    // 执行构造函数，并接受构造函数返回值
    const ret = Con.apply(obj, [].slice.call(arguments, 1));

    // 若构造函数返回值为对象，直接返回该对象
    // 否则返回obj
    return typeof(ret) === 'object' ? ret: obj;
}

function newObj(Father) {
  if(typeof Father !== 'function') {
    throw new Error('new Operator Function this first param must be a function !')
  }
  var obj = Object.create(Father.prototype); // 省掉了 上个写法的 setPrototypeOf 的写法
  var result = Father.applay(obj, Array.prototype.slice.call(arguments, 1)); // [].slice.call(arguments, 1)
  return result && typeof result === 'object' && result !== null ? result : obj;
}
```
  new 的优先级 [ref](https://www.jianshu.com/p/412ccd8c386e)
```js
function foo() {
    getName = function () { console.log (1); };
    return this;
}
foo.getName = function () { console.log(2);};
foo.prototype.getName = function () { console.log(3);};
var getName = function () { console.log(4);};
function getName () { console.log(5);}
new foo.getName ();      // 第一种       
new foo().getName ();         // 第二种
new new foo().getName ();       // 第三种
```



基础数据类型（类型监测）
每一种数据类型的方法属性（遍历、插入等）

继承（复制、原型、混合）原型链、

2. 完全无延迟的定时器

3. 0.1 + 0.2 = 0.3 怎么处理
```js
//JavaScript为此引入了Math.abs。这将帮助你比较两个数字之间的绝对差。

function almostEqual(numOne, numTwo) {
  return Math.abs( numOne - numTwo ) < Number.EPSILON;
}
console.log(almostEqual(0.1 + 0.2, 0.3));
```

4. 深拷贝浅拷贝 [Jum to demo](./deepClone.js)

## 事件循环类
TODO:
- Promise
  1. 实现 Promise.all 



### 手写题思考

如何在一个题目中展现自己的能力？


### how to build a object

- Object.create();
- new Object();
- var bar = {}

new 做了啥？

创建一个对象有几种方法？
```js
let a = {}
let b = new Object();
let c = Object.create({})
let d = Object.create(null)
let e = Object.create(Object.prototype)
```
一样么？

判断一个对象有没有属性最安全做法
```js
if(Object.prototype.hasOwnProperty) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
```

// ps hasOwn TC39 stage4 解决了我创建一个空对象，没有原型属性怎么办 var a = {}