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