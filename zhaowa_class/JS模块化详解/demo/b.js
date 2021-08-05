exports.b = false;

const a = require('./a.js')
exports.b = true;
console.log('b 模块输出了a 模块的内容是：', a);

console.log('b 模块执行完毕');