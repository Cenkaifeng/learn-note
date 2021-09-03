const a = require('./a.js');
const b = require('./b.js');// 这里调用的b 是require缓存里的，因为在a 中b已经被调用并缓存过了。

console.log('执行 main，输出', a, b)
// 模块执行已执行的部分

//b 模块输出了a 模块的内容是： { a: false }
// b 模块执行完毕
// a 模块输出了b 模块的内容是： { b: true }
// a 模块执行完毕
// 执行 main，输出 { a: true } { b: true }