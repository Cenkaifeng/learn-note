// 实现一个 compose 函数， 用法如下:

function fn1(x) {
  return x + 1;
}

function fn2(x) {
  return x + 2;
}

function fn3(x) {
  return x + 3;
}

function fn4(x) {
  return x + 4;
}

const a = compose(fn1, fn2, fn3, fn4);
console.log(a(1)); // 1 + 4 + 3 + 2 + 1 = 11

// 解答

function compose(...args) {
  return curr => {
    args.forEach(fn => {
      curr = fn(curr);
    });
    return curr;
  };
}

// 讲义解法
function compose() {
  const argFnList = [...arguments];

  return num => {
    return argFnList.reduce((pre, cur) => cur(pre), num);
  };
}
