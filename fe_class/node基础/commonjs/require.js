// node.js 模块 ：一个专门处理沙箱的虚拟机模块，底层主要来调用v8相关的api进行源码解析
const vm = require('vm');
const path = require('path');
const fs = require('fs');


function r(filename) {
    const pathToFile = path.resolve(__dirname, filename)
    const content = fs.readFileSync(pathToFile, 'utf-8');

    const wrapper = [
        '(function(require, module, exports) {',
        '})'
    ]

    const wrapperContent = wrapper[0] + content + wrapper[1];
    // console.log(wrapperContent);
    const script = new vm.Script(wrapperContent, {
        filename: 'index.js'
    })
    // console.log(typeof result)
    const module = {
        exports: {}
    } 
    const result = script.runInThisContext();
    result(r, module, module.exports);    // require 在模块内需要递归不断读取文件依赖
    return module.exports;
}


global.r = r;