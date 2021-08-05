exports.a = false;
// exports.a = true;

// exports.c = false
const b = require('./b.js')

// exports.d = false
exports.a = true
console.log('a 模块输出了b 模块的内容是：', b);

console.log('a 模块执行完毕');