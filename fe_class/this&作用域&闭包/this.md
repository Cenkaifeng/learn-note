### 上下文 + 作用域

ps: 上下文在执行时确定，作用域在定义时确定

#### 作用域链
```js
let a = 'global';
console.log(a);

function course() {
    let b = 'zaowa';
    console.log(b);

    session();
    function session() {
        let c = 'this';
        console.log(c);

        teacher();
        function teacher() {
            let d = 'yy';
            console.log(d);
        }
    }
}
course();

// es6取消了全局作用域，引入块级作用域

if( true) {
    let e = 111;
    console.log(e);
}
```

### this 上下文 context
* 我家门前有条河，我家门前的和尚有座桥，我家门前河里有群鸭
** 我家门前有条河，「这河」上有座桥
#### this 是在执行时动态读取上下文决定的，不是在定义时决定的（执行时赋值）
#### 函数直接调用 - this 指向 window
```js
function foo() {
    console.log('函数内部的this:', this)
}

foo();
```
#### 隐式绑定 - this指向调用堆栈的上一级

```js
function fn() {
    console.log('隐式绑定：', this.a)
}
const obj = {
    a: '1'
}

obj.fn = fn;
obj.fn();
```

### 实战：
```js
const foo = {
    bar: 10,
    fn: function() {
        console.log(this.bar);
        console.log(this);
    }
}

let fn1 = foo.fn;
fn1();

// 追问，如何改变指向

const o1 = {
    text: 'o1',
    fn: function() {
        return this.text;
    }
}
const o2 = {
    text: 'o2',
    fn: function() {
        return o1.fn;
    }
}
const o3 = {
    text: 'o3',
    fn: function() {
        let fn = o1.fn;
        return fn();
    }
}
console.log(o1.fn());
console.log(o2.fn());
console.log(o3.fn());// 独立的函数孤立在全局
```
* 1. 在执行函数时，如果函数被上一级所调用，那么上下文即指向上一级。
* 2. 否则为全局孤立，指向window

#### 追问： 现在我需要将console.log(o2.fn()) 结果是o2

```js
// 思路 1 - 人为干涉、改变this - bind/call/apply
// 2 - 不许改变this
const o1 = {
    text: 'o1',
    fn: function() {
        return this.text;
    }
}
const o2 = {
    text: 'o2',
    fn: o1.fn
}
// this指向最后调用它的对象，在fn执行时，函数挂到o2上即可
```

#### 显式绑定 （bind | apply | call)

```js
function foo() {
    console.log('函数内部的this:', this);
}
foo();

foo.call({a: 1});
foo.apply({a: 1});
const bindFoo = foo.bind({a: 1})
bindFoo();
```

#### 追问：call、apply、bind 有啥区别
* 1. 传参不同
* 2. 返回不同，最终执行返回相同

#### new - 
```js
class Course {
    constructor(name) {
        this.name = name;
        console.log('构造函数中的this', this);
    }
    test() {
        console.log('类方法中的this', this);
    }
}

const course = new Course('this');
course.test();
```

#### 追问： 异步方法中的this有区别么
```js
class Course {
    constructor(name) {
        this.name = name;
        console.log('构造函数中的this', this);
    }
    test() {
        console.log('类方法中的this', this);
    }
    asyncTest() {
        console.log('异步方法外的this', this);
        setTimeout(function() {
            console.log('异步方法中的this', this);
        }, 1000)
    }
}

const course = new Course('this');
course.test();
course.asyncTest();
```

* 1. 执行setTimeout时，传入匿名函数function执行，效果和全局执行函数效果相同
* 2. 再追问，如何解决： 把function改为无独立上下文的箭头函数即可。

#### 追问 bind原理 / 手写bind

* 1. bind在哪里？
```js
function sum(a, b, b) {
    console.log(a, b, b, this);
    return a + b + c;
}

// sum.bind - 在哪里？ Function.prototype

Function.prototype.newBind = function() {
    // 2.bind 是什么？ => a. 返回一个函数 b.返回原函数执行结果 c. 传参不变
    const _this = this;
    const args = Array.prototype.slice.call(arguments);// 
    // args特点: 第一项 - newThis, 第二项、最后一项 - 函数传参

    const newTis = args.shift();// shift 会改变原数组
    return function() {
        return _this.apply(newThis, args);
    }
}

```
* 2. apply的应用 - 多传参数组化
```js
Math.max(2, 5, 6);
const arr = [2, 5, 6];
let max = Math.max.apply(this, arr) // Math.max(...arr) 也行
```

### 优先级 new > 显式 > 隐式 > 默认

```js
function fn() {
    console.log(this);
}

const obj = {
    fn
}

obj.fn() // obj

// 显式 > 隐式

obj.fn.bind(111)();

function foo(a) {
    this.a = a;
}

const obj1 = {};

var bar = foo.bind(obj1);
bar(2)
console.log(obj1.a)

// new 
let baz= new bar(3);
// new > 显式
console.log(obj1.a);// 2
console.log(baz.a); // 3
```


### 聊完上下文作用域如何突破闭包(突破作用域的束缚？)？
### 闭包：一个函数和它周围状态的引用捆绑在一起的组合

#### 函数作为返回值场景

```js
function mail() {
    let content = '信';

    return function() {
        console.log(content);
    }

}

const envelop = mail();
envelo();
```

* 函数外部获取到了函数作用域内的变量值

#### 函数作为参数
```js
function envelop(fn) {
    let content = 1;
    fn.call(this)
    fn();

}

function mail() {
    // let content = 0
    console.log(content)
}

envelop(mail);
```

#### 函数嵌套
```js
let counter = 0;
function outerFn() {
    function innerFn() {
        counter++;
        console.log(counter);
    }
    return innerFn
}
```

#### 事件处理（异步执行）的闭包

```js
let lis = document.getElementsByTagName('li');

for (var i = 0; i < lis.length; i ++) {
    (function(i){
        lis[i].onclick = function() {
            console.log(i);
        }
        // setTimeout(function() {
        //     console.log(i);
        // }, 100)            
    })(i);


}
```

#### 追问：

#### 立即执行嵌套(本质也是上下查找作用域链)
```js
    (function immediateA(a){
        return (function immediateB(b) {
            console.log(a);
        })(1)
    })(0)
```

#### 立即执行遇上块级作用域

```js
let count = 0;
(function immediate() {
    if (count === 0) {
        let count = 1;

        console.log(count);
    }
    console.log(count);
})()

```

#### 拆分执行 多个闭包

```js
function createIncrement() {
    let count = 0;

    function increment() {
        count ++;
    }

    let message = `count is ${count}`;

    function log() {
        console.log(message);
    }

    return [increment, log];
}

const [increment, log] = createIncrement();
increment();
increment();
increment();
log(); // count is 0;
```
#### 实现私有变量

```js
function createStack() {
    return {
        items: [],
        push(item) {
            this.items.push(item);
        }
    }
}

const stack = {
    items: [];
    push: function() {}
}

function createStack() {
    const  items = [];
    return {
        push(item) {
            this.items.push(item);
        }
    }
}
```