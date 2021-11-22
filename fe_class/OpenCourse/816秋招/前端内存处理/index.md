## 平时有关注过前端的内存处理吗？

### 1. 你了解js中的内存处理吗？ 什么情况会导致内存泄漏呢？

1. 内存的生命周期

内存分配：生命变量 函数 对象的时候
内存的使用：读写内存，使用变量 函数等
内存回收：使用完毕，由辣鸡回收机制自动回收不再使用的内存

2. js 中的内存分配

```js
const n = 123;
const s = 'sss';
```


3. js 内存使用

```js
const a = 10;
console.log(a); // 使用

```

4. js中的垃圾回收机制

垃圾回收的算法主要依赖于引用的概念

4.1 引用计数法

看一个对象是否有指向他的引用，如果没有其他对象指向他了，说明当前这个对象不再被需要了.

他的问题：循环引用！！

如果两个对象相互引用，尽管他们已不再被使用，但是引用计数无法识别，导致内存泄漏。


4.2 标记清除法

将“不再使用的的对象”定义为“无法到达的对象”

从根部js的全局对象触发，定时扫描内存中的对象，凡是无法从根部到达的对象，就会被标记为不再使用，稍微进行回收


* 辣鸡收集器在运行的时候会给内存中的所有变量都加上标记
* 将从根部触发能够触及到的对象标记清除
* 剩下的还有标记的变量被视为准备删除的变量
* 辣鸡收集器销毁带有标记的值 回收内存空间

5. 常见的内存泄漏

5.1 全局变量

```js

function foo() {
    bar1 = 'aaa'; // 相当于声明在window.bar1
    this.bar2 = 'aaaa'
}

foo(); // 执行函数事this指向window ,相当于一个函数给全局变量增加了两个变量
```

2. 未被清理的定时器和回调函数

setInterval
setTimeout

clearInterval
clearTimeout

3. 闭包

一个内部函数，有权访问包含其的外部函数的变量.
// 或者其他说法（个人最喜欢《你不知道的js》里对闭包的描述

```js

var theThing = null;
var replaceThing = function() {
    var originalThing =theThing;

    var unused =function() {
        if(originalThing) {
            console.log(111);
        }
    }

    theTing = {
        longStr: '111',
        method: function() {
            console.log
        }
    }    
}



setInterval(repalceThing, 1000)
```
每次调用replaceThing, theTing 得到一个包含巨大字符串和一个对于信必报method的对象

unued引用了originThing

5.3 DOM 引用

var elements= {
    image: document.getElementById('111');
}

elements.image = null;

6. 怎么避免呢？

尽量减少全局变量
使用完数据后，及时解除引用.null
避免死循环等持续执行的操作

### 实现一个sizeof 函数

接收一个对象参数，计算传入的对象所占的Bytes数