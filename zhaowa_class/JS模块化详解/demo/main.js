const a = require('./a.js');
const b = require('./b.js');// 这里调用的b 是require缓存里的，因为在a 中b已经被调用并缓存过了。

console.log('执行 main，输出', a, b)