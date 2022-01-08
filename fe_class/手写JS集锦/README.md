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
## api 实现类

1. 实现一个new
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

- Promise
  1. 实现 Promise.all