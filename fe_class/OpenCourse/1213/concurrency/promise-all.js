function PromiseAll(promiseArray) {
  // 2. return Promise
  return new Promise(function (resolve, reject) {
    //3. 判断类型
    if (!Array.isArray(promiseArray)) {
      return reject(new TypeError("arguments must be array"));
    }
    const promiseNum = promiseArray.length;
    const res = [];
    let counter = 0;
    for (let i = 0; i < promiseNum; i++) {
      // 4. 注意数组元素类型
      Promise.resolve(promiseArray[i])
        .then(value => {
          // 用 resolve强转Promise
          counter++;
          //5. 不能用 push res.push(value); 返回结果和数组位置一一对应，所以不可以用 push
          res[i] = value;
          // 6. 用 counter 计数，不能用数组长度
          if (counter === promiseNum) {
            resolve(res);
          }
          // if (res.length === promiseNum) {
          //   resolve(res);
          // }
        })
        .catch(e => {
          reject(e);
        });
    }
  });
}

Promise.prototype.all = function () {};

Promise.all = function () {};

//1. 首先排除 2， 因为 all 是一个静态方法，所有选 3，

// 测试

const pro1 = new Promise((res, rej) => {
  setTimeout(() => {
    res("1");
  }, 1000);
});

const pro2 = new Promise((res, rej) => {
  setTimeout(() => {
    res("2");
  }, 2000);
});

const pro3 = new Promise((res, rej) => {
  setTimeout(() => {
    res("3");
  }, 3000);
});

const proAll = PromiseAll([pro1, pro2, pro3]).then(res => {
  console.log(res);
});
