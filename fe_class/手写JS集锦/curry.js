/* 考察柯里化函数的意义：
柯里化函数本身是一种高阶函数的实现，考察候选人是否具备封装高阶函数能力、对闭包、函数形参的理解。

*/
function currying(fn, ...args) {
  const originFnArgumentLength = fn.length; // 原函数参数长度

  let allArgs = [...args]; // 这是个闭包

  const resFn = function (...newArgs) {
    // 被柯里化之后的调用函数
    allArgs = [...allArgs, ...newArgs];
    console.log(allArgs);
    if (allArgs.length === originFnArgumentLength) {
      // 参数个数和原函数齐平直接返回执行的结果
      return fn(...allArgs);
    } else {
      return resFn;
    }
    // return currying.call(null, fn, ...allArgs);
  };
  // resFn.toString = function () {
  //   return fn.apply(null, ...allArgs);
  // };

  return resFn;
}

// const add = (a, b, c) => a + b + c;
const add = (a, b) => a + b;

// const a1 = currying(add, 1); // 确认点 a1 是否能接收多个参数

const a1 = currying(add);
let res = a1(1)(2)(3);
console.log(res());
// console.log(a1(1)(2));

// const a2 = a1(2);
// console.log(a2(3)); // 6

// 其他解法
// https://juejin.cn/post/6844904093467541517

// const currying = (fn, ...args) =>
//   // 函数的参数个数可以直接通过函数数的.length属性来访问
//   args.length >= fn.length // 这个判断很关键！！！
//     ? // 传入的参数大于等于原始函数fn的参数个数，则直接执行该函数
//       fn(...args)
//     : /**
//        * 传入的参数小于原始函数fn的参数个数时
//        * 则继续对当前函数进行柯里化，返回一个接受所有参数（当前参数和剩余参数） 的函数
//        */
//       (..._args) => currying(fn, ...args, ..._args);

//https://juejin.cn/post/6982922246054494222#heading-3
