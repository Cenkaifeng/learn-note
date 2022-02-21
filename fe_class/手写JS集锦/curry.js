function currying(fn, ...args) {
  const originFnArgumentLength = fn.length;

  let allArgs = [...args];

  const resFn = (...newArgs) => {
    allArgs = [...allArgs, ...newArgs];

    if (allArgs.length === originFnArgumentLength) {
      return fn(...allArgs);
    } else {
      // 超长怎么办？
      // 参数个数和原函数齐平
      return resFn;
    }
  };

  return resFn;
}

const add = (a, b, c) => a + b + c;
const a1 = currying(add, 1); // 确认点 a1 是否能接收多个参数
const a2 = a1(2);
console.log(a2(3)); // 6

// https://juejin.cn/post/6844904093467541517
