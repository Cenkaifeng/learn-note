exports.b = false;

const a = require('./a.js') // here 关键， 跳回a就循环引用了，没跳，拿a当前的执行结果
exports.b = true;
console.log('b 模块输出了a 模块的内容是：', a);

console.log('b 模块执行完毕');