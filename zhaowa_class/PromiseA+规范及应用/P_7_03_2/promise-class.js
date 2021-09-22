const PENDING = "pending";
const FUFILLED = "fulfilled";
const REJECTED = "rejected";

class MPromise {
  FUFILLED_CALLBACK_LIST = [];
  REJECTED_CALLBACK_LIST = [];
  _status = PENDING;
  /**
   *
   * @param {*} fn (resolve, reject)
   */
  constructor(fn) {
    // 初始状态为 pending
    this.status = PENDING;
    this.value = null;
    this.reason = null;

    try {
      fn(this.resolve.bind(this), this.reject.bind(this));
    } catch (e) {
      this.reject(e);
    }
  }

  get status() {
    return this._status;
  }
  set status(newStatus) {
    this._status = newStatus;
    switch (newStatus) {
      case FUFILLED: {
        this.FUFILLED_CALLBACK_LIST.forEach(cb => {
          cb(this.value);
        });
        break;
      }
      case REJECTED: {
        this.REJECTED_CALLBACK_LIST.forEach(cb => {
          cb(this.reason);
        });
        break;
      }
    }
  }

  resolve(value) {
    if (this.status === PENDING) {
      this.value = value;
      this.status = FUFILLED;
    }
  }

  reject(reason) {
    if (this.status === PENDING) {
      this.reason = reason;
      this.status = REJECTED;
    }
  }

  then(onFulfilled, onRejected) {
    const realOnFulfilled = this.isFunction(onFulfilled)
      ? onFulfilled
      : value => {
          return value;
        };
    const realOnRejected = this.isFunction(onRejected)
      ? onRejected
      : reason => {
          throw reason;
        };

    // .then的返回值整体是一个promise

    const promise2 = new MPromise((resolve, reject) => {
      //6.2 onFulfulled 或者 onRejected 执行时抛出异常, promise2 应该被reject.
      const fulfilledMicrotask = () => {
        queueMicrotask(() => {
          try {
            //6.1 onFulfulled 或者 onRejected 执行的结果为x, 调用 resolvePromise.
            const x = realOnFulfilled(this.value);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      };

      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = realOnRejected(this.reason);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      };
      switch (this.status) {
        case FUFILLED: {
          fulfilledMicrotask();
          break;
        }
        case REJECTED: {
          rejectedMicrotask();
          break;
        }
        case PENDING: {
          this.FUFILLED_CALLBACK_LIST.push(fulfilledMicrotask);
          this.REJECTED_CALLBACK_LIST.push(rejectedMicrotask);

          break;
        }
      }
    });
    return promise2;
  }
  catch(onRejected) {
    return this.then(null, onRejected);
  }
  resolvePromise(promise2, x, resolve, reject) {
    // 7.1 如果 promise2 和 x , 相等， 那么 reject TypeError （会造成死循环）
    if (promise2 === x) {
      return reject(
        new TypeError("The promise and the return value are the same")
      );
    }

    if (x instanceof MPromise) {
      // 如果 x 是promise 那么 让新的 promise 接收 x 的状态
      // 即继续执行x, 如果执行的时候又拿到了一个y,那么继续解析y.
      queueMicrotask(() => {
        x.then(y => {
          this.resolvePromise(promise2, y, resolve, reject);
        }, reject);
      });
    } else if (typeof x === "object" || this.isFunction(x)) {
      if (x === null) {
        return resolve(x);
      }

      let then = null;
      //let then = x.then;  如果 x.then 这步出错， try catch(e), reject(e);
      try {
        then = x.then;
      } catch (e) {
        return reject(e);
      }

      // 如果获取到的 then 是一个函数

      if (this.isFunction(then)) {
        // 回调只执行一次，需要一个变量去标识是否已经执行了
        let called = false;

        try {
          then.call(
            x, //this
            y => {
              // onFulFilled
              if (called) {
                return;
              }
              called = true;
              this.resolvePromise(promise2, y, resolve, reject);
            },
            r => {
              // onRejected
              if (called) {
                return;
              }
              called = true;
              reject(r);
            }
          );
        } catch (error) {
          if (called) {
            return;
          }
          reject(error);
        }
      } else {
        resolve(x);
      }
    } else {
      resolve(x);
    }
  }
  isFunction(value) {
    return typeof value === "function";
  }
  static resolve(value) {
    if (value instanceof MPromise) {
      return value;
    }
    return new MPromise(resolve => {
      resolve(value);
    });
  }
  static reject(reason) {
    return new MPromise((resolve, reject) => {
      reject(reason);
    });
  }

  static race(promiseList) {
    return new MPromise((resolve, reject) => {
      const length = promiseList.length;

      if (length === 0) {
        return resolve();
      } else {
        for (let i = 0; i < length; i++) {
          MPromise.resolve(promiseList[i]).then(
            value => {
              return resolve(value);
            },
            reason => {
              return reject(reason);
            }
          );
        }
      }
    });
  }
}

const test = new MPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(111);
  }, 1000);
}).then(value => {
  console.log("then");
});

setTimeout(() => {
  console.log(test); // test 的 value 是什么？ undefined
}, 3000);

//第二题

const test = new MPromise((resolve, reject) => {
  setTimeout(() => {
    reject(111);
  }, 1000);
}).catch(reason => {
  console.log("报错" + reason);
  console.log(test); // test status 是什么
});

setTimeout(() => {
  console.log(test); // test status 是什么？
}, 3000);

const async1 = async () => {
  console.log("async1");
  setTimeout(() => {
    // mac 1
    console.log("timer1");
  }, 2000);
  await new Promise(resolve => {
    console.log("promise1");
  });
  console.log("async1 end"); // mic 1
  return "async1 success";
};
console.log("script start");
async1().then(res => console.log(res));
console.log("script end");
Promise.resolve(1) // value 透传
  .then(2)
  .then(Promise.resolve(3))
  .catch(4)
  .then(res => console.log(res)); // mic 2
setTimeout(() => {
  // mac 2
  console.log("timer2");
}, 1000);

// script start
// async1
// promise1
// script end
// async1 end
// async1 success
// 1?
// timer 2
// timer 1
