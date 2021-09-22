# CMJ

文件是一个模块，私有。内置两个变量 module require (exports = module.exports)

一个引入一个导出，就构成了通信的基本结构

## 需要注意的两个问题

1. 缓存，require 会缓存一下，所以

```js
// a.js
var name = 'morrain'
var age = 18
exports.name = name
exports.getAge = function(){
    return age
}
// b.js
var a = require('a.js')
console.log(a.name) // 'morrain'
a.name = 'rename'
var b = require('a.js')
console.log(b.name) // 'rename'
```

2. 引用拷贝还是值拷贝的问题(CMJ 是值拷贝)

```js
// a.js
var name = 'morrain'
var age = 18
exports.name = name
exports.age = age
exports.setAge = function(a){
    age = a
}
// b.js
var a = require('a.js')
console.log(a.age) // 18
a.setAge(19)
console.log(a.age) // 18
```

3. 运行时加载 / 编译时加载（多阶段，异步）ESM