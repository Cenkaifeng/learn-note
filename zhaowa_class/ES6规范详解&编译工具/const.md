## const 标识常量

```js
const AREA = 10;
const OBJ_MAP ={
    a: 'A',
    A: 'a'
};
const PIPE_LINE = [1, 2, 3, 4, 5];
```

### 1. 不允许重复声明

```js
var arg1 = 'yy';
arg1 = 'hxy';

// 常量
// *如何定义一个常量？ 在ES5中

Object.defineProperty(window, 'arg2', {
    value: 'yy',
    writable: false
});

// * 会不会报错，能不能修改？
arg2 = 'hxy'

// ES6 会不会改变？ 会不会报错 (考察点：做错误收集的时候会关注哪些东西会报错便于前端错误收集)
const arg3 = 'yy';
arg3 = 'hxy';

// const 可以分开声明和赋值吗？ 不行，会报错
const arg4;
arg4 = 'yy';


// const 不允许重复声明
var arg5 = 'yy';
var arg5 = 'hxy';

```


### 2. 块级作用域
```js
const PERMIT = 'true';
if(PERMIT) {
    var arg1 = 'yy';
}
console.log(arg1);

// const

if(PERMIT) {
    const arg2 = 'yy';
}
console.log(arg2);


```


### 3. 无变量提升

```js
console.log(arg3);
var arg3 = 'yy';

console.log(arg4);// 无变量提升, 先声明再使用
const arg4 = 'yy'

var arg5 = 'yy';
console.log(window.arg5);
// const 不在window中
const arg6 = 'yy';
console.log(window.arg6);// 静默报错
```

### 4. dead zone ， 临时死区
```js

const PERMIT = 'true';

if(PERMIT) {
    // 暂时性死区
    console.log(arg1);
    const arg1 = 'yy'
}
```


### 5. let
#### let 和 const 啥时候用
* bad - 优先使用let,常量时候再去使用const
* prefer - 优先使用const

### 面试附加题
```js
// 引用类型的内部属性值无法被常量化
const obj = {
    teacher: 'yy',
    leader: 'hxy'
}

obj.teacher = 'hxy';
const arr = ['yy', 'hxy']
arr[0] = 'hxy';

// * 引用类型如何冻结 ？ 原理 - 指向地址
// 破局 - Object.freeze();

Object.freeze(arr);// *可否被修改？ 会报错吗？ 不可、不会

// *追问 - 符合类型的对象可否freeze?
const obj2 = {
    teacher: 'yy',
    leader: 'hxy',
    zhaowa: ['bubu', 'xiaoke']
}

Object.freeze(obj2); //freeze无法冻结嵌套引用类型

// *如何破局？
// freeze 如何deep化 （深冻结）
// 思路： 嵌套遍历并且逐层freeze

function deepFreeze(obj = {}) {
    Oject.freeze(obj);
    (Object.key(obj) || []).forEach( key => {
        if(typeof obj[key] === 'object') {
            deepFreeze(obj[key]);
        }
    })
}

```