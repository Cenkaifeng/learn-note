## 历史

ES3 ~ ES5.1
ES56 (也叫ES2015)

ESNext (指即将发的版 ES的下一个版本)

## ES6 及以后新增的 API 解析

需要细分版本的场景，唯一作用 polyfill.


### let 和 const

```js
for(var i = 0; i < 10; i++) {
    setTimeout(function() {
      console.log(i)
    }, 10)
}
```

运行这段代码，会输出了什么呢？

原因：
- var 定义的变量是全域的，所以全局只有一个变量i.(作用域)
- setTimeout,下一轮事件循环的时候执行.

2. let

let 引入了块级作用域的概念，也解决了变量提升问题

3. const

constant 的简写，它在 let 的基础上会报错。


### [箭头函数](./arrow_function.md)

1. 箭头函数的 this 是在什么位置定义决定的.普通函数里的this是在使用的时候决定的。

2. 简写 `(value) => Number(value)`

3. 箭头函数不能被用作构造函数.

构造函数：改变this指向，指向新实例。
箭头函数：this 是在定义的时候出现的。 没有独立上下文
```js
// 除了标题链接，也可看下列案例
var name = 'haha'
const teacher = {
  name: 'teacher',
  getName: function () {
    return this.name;
  }
}
console.log(teacher.getName());// teacher;

// 如果 getName 改成箭头函数
const teacher = {
  name: 'teacher',
  getName: () => {
    return this.name;
  }
} // 这个时候 this 指向它所声明的作用域 window // 那么 this.name 就是 haha
```
4. 而且箭头函数没有 arguments

### [Class](./class.md)

### 模板字符串

```js
const string = '
test
set
'
```
```js

const template = ` ${}
test
test2
test3
`
```

#### 编写个render函数.实现模板字符串的功能

```js
const year = '2021';
const month = '10';
const day = '01';

const template = '${year}-${month}-${day}';
const str = { year, month, day}

const str = render(template)(context)// 这种两个括号调用方法被称为高阶函数，运行一个返回后面一个

console.log(str) // 2020-10-01

function render(template) {
  return function(context) {
    return template.replace(/\$\{(.*?)\}/g, (match, key) => context[key])
  }
}

```


### 解构

解构的意义：让你非常方便的从数组或者对象里面取值，不用再`arr[0]/ arr[1] `这样。


```js
//数组
let [a, b, c] = [1, 2, 3];

//对象解构
let { a, b } = {
  f1:'f1',
  f2:'f2'
}// a b 会undefined 需要同key名

```

原理：针对可迭代对象`Iterator.`通过遍历按顺序获取对应的值进行赋值。

3.1 Iterator 是什么？

Iterator 是一种接口， interface, 为各种不宜硬的数据解构提供统一的访问机制。

任何数据解构只要有 Iterator 接口。

比方说 `for of`, 这个就相当于一个遍历器，遍历数据的时候，会去寻找 Iterator.

```js
const obj = {
  name: 'name'
}
for(let key of obj){
  console.log(key)
}// TypeError: obj is not iterable
// 这就是 for of 不能遍历对象的原因

```

3.2 Iterator 有什么用呢？

- 为各种不同的数据解构提供统一的访问接口。
- 数据解构按照顺序处理
- for of 可以进行遍历

```js
// 如何写个可迭代对象的生成器？
function generateIterator(array) {
  let nextIndex = 0;
  return {
    next: () => nextIndex < array.length ? {
      value: arrayp[nextIndex++],
      done: false
    }: {
      value: undefined,
      done: true
    }
  }
}
const iterator = generateIterator([1, 2, 3])
```
3.3 可迭代对象是什么？

是 Iterator接口的实现。

可迭代对象存在两种协议，可迭代协议，迭代器协议.

- 可迭代协议：对象必须实现 iterator 方法，对象或者原型链上必须有一个Symbol.iterator :() => 迭代器协议

- 迭代协议： 必须要实现一个 next 方法， next 方法返回对象{ done, value }:{ Boolean, Any}

```js
// 面试题：你可以给我实现一个对象，让它进行for of 遍历吗？
const obj = {
  [Symbol.iterator]: () => {// 无参函数 es6中，当对象中的key名称为一个变量时，需要用`[]`括起来
    return {
      next: () => {
        obj.count++;
        return obj.count <= 10 ? { // 假设写个10
          value: obj.count,
          done: false
        } : {
          value: undefined,
          done: true
        }
      }
    }
  }
}


for(let item of obj) {
  console.log(item)
}


```
3.3.1   **[如何关闭一个迭代器？](https://www.zhihu.com/question/462012759/answer/1914177301)**
`return` `continue` 在 `for-in/of` 里会报错的

大多数都是用 `break` 但是 `break` 在对系统文件迭代读取的过程中会有打开后没关闭，占用资源管理器情况。

所以需要在迭代协议里定制
`return()` 方法 （就像 `next()` 一样）
```js
const foo = {
  [Symbol.iterator]() {
    // 这里打开硬盘或者网络上的文件
    
    return {
      next() {
        // 这里读取一部分打开的文件, 并返回 {value, done: false}
        // 如果读完了，就做收尾工作，即关闭文件，并返回 {done: true}
      }
    }
  }
}
```
3.4
// TODO: Generator / 生成器迭代器整合
https://es6.ruanyifeng.com/#docs/generator


### 遍历

1. for in
用于遍历可迭代对象的 key 

- 遍历数组的时候，会遍历索引.
- 不仅会遍历当前对象，还会遍历原型链上的属性
- 不能 return continue (用return会报错Uncaught SyntaxError: Illegal return statement) 
- 不适合遍历数组。
- 可以用 break 和 throw 中断(补充一下 forEach 没有 break)
```js
Object.prototype.proName = 'protoName'

let obj = {
  name: 'Jervis',
  xxx: 'xx'
}

for(let key in obj) {
  // 索引一般用 Object.hasOwnProperty() 来判断是否是自己的属性来处理这类问题
  console.log(obj[key])
}
//Jervis
//xx
//protoName

```

2. for of
用于遍历可迭代对象的 Value
可迭代对象：数组，迭代器
普通对象不能适用 for of
- 可以用 break 中断


### Object

1. Object.keys()
拿到你对象的所有key组成一个数组

```js
// 如果让你手动实现 Object.keys 你怎么实现？ 
const obj = {
  a: 1,
  b: 2
};

function getObjectKeys(obj) {
  const result = [];

  for(const key in obj) {
    if(obj.hasOwnProperty(key)) {
      result.push(key)
    }
  }
  return result;
}

// console.log(Object.keys(obj));
// console.log(getObjectKeys(obj));

```

2. Object.values()
返回对象value组成的数组

3. Object.entries()
返回对象键值对的数组 二维数组。
[[key, value], [key, value]]

4. Object.getOwnPropertyNames
返回对象自有属性值数组

5. Object.getOwnPropertyDescriptor

是一个对象属性的描述符，是对象

* configurable
* writable: false // 'use strict' 生效
* enumerable
* get
* set

#### Proxy

```js

const obj = new Proxy({}, {
  get: function (target, propKey) {
    console.log(`invoke getter ${propKey}`);
    return target[propKey]
  },
  set: function(target, propKey, value) {
    console.log(`invoke setter ${propKey} ${value}`);
    return Reflect.set(target, propKey, value)
  }
})

obj.something = 1;
console.log(obj.something)
```

**Reflect 是什么？**
>反射是指在程序运行期对程序本身进行访问和修改的能力。是指计算机程序在运行时（runtime）可以访问、检测和修改它本身状态或行为的一种能力。[1]用比喻来说，反射就是程序在运行的时候能够“观察”并且修改自己的行为。 --- wiki-反射

这个说白了就是一种优化，它的提出是建立在期望把Object 上的一些方法比如 defineProperty这种，从Object 上抽离到 Reflect上




[ES6  Proxy里面为什么要用Reflect？ - rambo的回答 - 知乎](https://www.zhihu.com/question/460133198/answer/2513044373)

```js
const obj = { name: 111};

delete obj.name;// 命令式删除
Reflect.deleteProperty(obj, name) // 函数式删除，把命令行为变成函数行为 (声明式)
```

同时，Reflect 拥有所以 Proxy 的方法（一一对应，而且效果是一样的）

6. Object.assign

浅拷贝，类似解构扩展的写法 `{...a, ...b}`
```js
const newObj = Object.assign({}, {
  name: 'xxx',
  age: 12
}, {
  name: 'jervis'
})
console.log(newObj)
// 如何手动实现它？
function shallowClone(source) {
  const target = {};l
  for( const key in source ) {
    if(source.hasOwnProperty(key)) {
      target.key = source[key];
    }
  }
  return target;
}
```

## Promise
这个文档对于 Promise 的笔记只是部分 api, 完整Promise笔记[传送门: PromiseA+规范](./../PromiseA+规范及应用/PromiseA+规范.md)

Promise.allSettled : 返回所有promise的状态和结果

```js
function PromiseAllSettled(promiseArray) {
  return new Promise((resolve, reject) => {
    if(!Array.isArray(promiseArray)) {
      return reject(new TypeError('参数必须是一个数组'));
    }

    let counter = 0;
    const promiseNum = promiseArray.length;
    const resolveArray = [];

    for(let i = 0; i< promiseNum; i++) {
      Promise.resolve(promiseNum[i]).then((value) => {
        // 前面的和 Promise.all 一样，但是到这里就不同了,最大区别在于，要对每个状态进行记录
        resolveArray[i] = {
          status: 'fulfilled',
          value
        }
      })
      .catch((reason) => {
        resolveArray[i] = {
          status: 'rejected',
          reason
        };
      })
      .finally(() => {
        counter++;
        if(counter === promiseNum) {
          resolve(resolvedArray)
        }
      })
    }
  })
}
```
## async / await
`async await` 本质就是 ES7 引入的使用 generator 函数实现对 Promise 异步封装的语法糖。它提供了在不阻塞主线程的情况下使用同步代码实现异步访问资源的能力，同时使得代码逻辑清晰简明。

> 协程：是一种比线程更加轻量级的存在。你可以把协程看成是跑在线程上的任务，一个线程上可以存在多个协程，但是在线程上同时只能执行一个协程，比如当前执行的是 A 协程，要启动 B 协程，那么 A 协程就需要将主线程的控制权交给 B 协程，这就体现在 A 协程暂停执行，B 协程恢复执行；同样，也可以从 B 协程中启动 A 协程。通常，如果从 A 协程启动 B 协程，我们就把 A 协程称为 B 协程的父协程。
![协程运行流程](./async_generator.png)



参考：[手写async await的最简实现（20行）](https://juejin.cn/post/6844904102053281806)

## Array

1. Array.flat(arr, deep)
数组打平, deep 是指定深度，用Infinity 作为参数可以全层级打平。

```js
const arr1 = [1, 2, [3, 4, [5]]];

function flatDeep(arr, d = 1) {
  if( d > 0) {
    return arr.reduce((res, val) => {
      if(Array.isArray(val)) {
        res = res.concat(flatDeep(val, d - 1))
      } else {
        res = res.concat(val)
      }
      return res;
    }, [])
  } else {
    return arr.slice(); // 直接数组浅拷贝
  }
}
```

2. Array.includes
判断有没有存在元素

```js
const arr = [1, 2, 3, 4, 5];

console.log(arr.includes(6))// 返回 boolean
```

3. Array.from

如何把一个类数组转成真数组

```js
console.log(Array.from([1, 2, 3], x => x + 1)); // 2, 3, 4

```
如何 把arguments 转换成真数组？

  1. [...arguments]
  2. Array.from(arguments)
  3. Array.prototype.slice.call(arguments);// 换元操作 -> arguments.slice()

  还可以通过 Array.from(new Set(arr)) 做数组去重



## Map() Set() 区别

#### `set` 是 一种关联式容器，其特性如下：

- `set` 以 `RBTree` 作为底层容器
- 所得元素的只有 `key` 没有 `value` ，`value`就是 `key`
- 不允许出现键值重复
- 所有的元素都会被自动排序
- 不能通过迭代器来改变 `set` 的值，因为 `set` 的值就是键

#### map
`map` 和 `set` 一样是关联式容器，它们的底层容器都是红黑树，区别就在于 `map` 的值不作为键，键和值是分开的。它的特性如下：

- `map` 也是以 `RBTree` 作为底层容器
- 所有元素都是键+值存在
- 不允许键重复
- 所有元素是通过键进行自动排序的
- map的键是不能修改的，但是其键对应的值是可以修改的
