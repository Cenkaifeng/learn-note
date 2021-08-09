const Module = require('module');// 大写规避同名


// 从阅读CommonJS源码可以分析出 _extensions 挂载切片（切面劫持、拦截器）的方式做操作
const prevFunc = Module._extensions['.js'];
Module._extensions['.js'] = function(...args) {
    console.log('load script'); // 猴子方法
    prevFunc.apply(prevFunc, args);
}


const result = require('./module');
console.log(result);
// require('./require');

// const result = r('./module.js');
// console.log(result);

