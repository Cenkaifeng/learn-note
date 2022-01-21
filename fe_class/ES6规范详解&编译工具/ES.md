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
- var 定义的变量是痊愈的，所以全局只有一个变量i.(作用域)
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
箭头函数：this 是在定义的时候出现的。

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
    return template.replace(/\$\{(.*?)\}/g, (match, key) => context[key]})
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

Iterator 是一种借口， interface, 为各种不宜硬的数据解构提供统一的访问机制。

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
  [Symbol.iterator]: () => {// 无参函数
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

Reflect 是什么？

这个说白了就是一种优化，它的提出是建立在期望把Object 上的一些方法比如 defineProperty这种，从Object 上抽离到 Reflect上

```js
const obj = { name: 111};

delete obj.name;// 命令式删除
Reflect.deleteProperty(obj, name) // 函数式删除，把命令行为变成函数行为
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
