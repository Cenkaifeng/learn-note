// exports.key = 'hello world';

// exports.key2 = 'hello key2'

// module.exports = 'hello world'



// 问题：为什么通过exports = xxx 导出不了一个commonjs 模块化规范
const obj = {
    key: {}
};

// obj.key = 'key hello'

const key = obj.key;

key.key1 = 'hello world2';

// key = 'hello world'; // 答：你没有通过引用来改变模块的值是没有变化的。

console.log(obj)