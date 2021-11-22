## 1. let const

```js
var a = []
for(var i = 0; i < 10; i++) {
    a[i] = function() {
        console.log(i)
    }
}
a[3]()// 如何打印3


// 解法1 let
// 解法2 closure
var a = []
for(var i = 0; i < 10; i++) {
    a[i] = (function(i){    
        return function() {
            console.log(i)    
        }
    })(i)
}
a[3]()
```


## 2.spead 结构

极大减少了写代码的心智负担，能够非常方便的将数组遍历遍历出来。
通过结构转化类数组结构 argument || HTMLNodeList

```js
console.log(...[1, 2, 3])

a = list[0]
rest = list.slice(1);

const [a, ...rest] = list;

```

### 注意
1. 跟ESModule 模块化区分
2. 数组、对象结构
3. 默认值

## promise

1. Promise.all([]) //通过增加catch 保证每个promise都有catch
2. 新增的 allsettled方法

```js
const resolved = Promise.resolve(10);
const rejected = Promise.reject(-1);

Promise.all([resolved, rejected]).then((res) => {})
// 这个例子一定不会进入then的回调，因为第二个Promise进入了rejected 状态 这个时候处理方法是
// Promise.all([resolved.catch, rejected.catch])

Promise.allSettled([resolved, rejected]) // then 里会得到[{status: xx, value:xxx}, {...}]
```

## for of 

1. for in 和 for of 的区别
简单说就是in 遍历 key, of遍历value

```js
const arr = [1, 2, 3, 4]

for (let a in arr) {
    console.log(a);// 0 1 2 3
}

for (let a of arr) {
    console.log(a);// 1 2 3 4
}
```

## iterator // 可迭代接口，遍历器

Symbol.iterator
```js
// 手写迭代器
var it = makeIterator(['a', 'b']);

function makeIterator(array) {
    var nextInde = 0;
    return{
        next: function() {
            return nextIndex < array.length
                ? {value: array[nextIndex++], done: false}
                : {value: undefined, done: true}
        }
    }
}

it.next();


let iterable = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator],
}

for (let item of iterable) {
    console.log(item);
}
```

## Proxy & reflect

与defineproperty最大区别：不用添加特定代理,不用手动指定代理某个指定的key的结果

```js
var obj = new Proxy({}, {
    get: function(target, propKey, reveiver) {
        console.log(`getting ${propKey}`);
        // return Reflect.get(target, propKey, reveiver) // 和直接返回target[key] 没什么区别，只是更符合元编程的规范
        return target[propKey]
    },
    set: function(target, propKey, value, receiver) {
        console.log(`setting ${propKey}`);
        return Reflect.set(target, propKey, value, receiver);
    }
});

obj.something = 1;
console.log(obj.something);


```

## 装饰器语法
多用于class 内置对象的处理，目前语法不算稳定。
https://es6.ruanyifeng.com/#docs/decorator