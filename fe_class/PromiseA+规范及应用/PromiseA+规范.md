# PromiseA+规范

## 术语

1. Promise 是一个有then方法的对象或者函数， 行为遵循promiseA+规范
2. thenable 是一个有then方法的对象或者函数
3. value 是promise状态成功时的值，也就是resolve的参数.包括各种数据类型, undefined、 number boolean promise
4. reason 是promise状态失败时的值，也就是reject的参数.表示拒绝的原因.
5. exception throw 抛出去的异常

## 规范

### Promise States 

promise应该有三种状态,要注意他们之间的流转关系.

resolve reject 是动作
fulfilled rejected 是状态，是动作的结果.

1. pending

    1.1 初始的状态，可改变。
    1.2 一个promise再被resolve或者reject之前，都处于这个状态
    1.3 通过 resolve -> fulfilled
    1.4 通过 reject -> rejected


2. fulfilled

    2.1 最终态，不可以改变.
    2.2 一个promise经过resolve后变成这个状态
    2.3 必须拥有一个value值. // resolve() undefined

3. rejected

    3.1 最终态, 不可以改变.
    3.2 一个promise经过 reject 后变成这个状态
    3.3 必须拥有一个reason 值. // undefined


pending -> resolve(value) -> fulfilled
pending -> reject(reason) -> rejected


### then

promise 应该提供一个then方法, 用来访问最终的结果, 无论是value还是reason.

```js
promise.then(onfFulfilled, onRejected);
```

1. 参数要求

    1.1 onFulfilled 必须是函数类型，如果不是函数应该被忽略
    1.2 onRejected 必须是函数类型，如果不是函数应该被忽略

2. onFulfilled 特性

    2.1 在promise变成 fulfilled 时，应该调用 onFulfilled,参数是 value.
    2.2 在promise变成 fulfilled 之前，不应该被调用。
    2.3 只能调用一次. (需要一个变量来限制执行次数.)

3. onRejected 特性

    3.1 在promise变成 rejected 时，应该调用 onRejected,参数是 reason.
    3.2 在promise变成 rejected 之前，不应该被调用。
    3.3 只能调用一次

4. onFulfilled 和 onRejected 应该是微任务

    queueMicrotask 实现微任务的调用（而不是setTimeout)

5. then方法可以被调用多次

    5.1 promise 变成 fulfilled 后， 所有onFulfilled的回调都应该按照then的顺讯执行。
        在实现promise的时候，我们需要一个数组来存储 onFulfilled 的cb.

    5.2 promise 变成 rejected 后， 所有 onRejected 的回调都应该按照then的顺讯执行。
        在实现promise的时候，我们需要一个数组来存储 onRejected 的cb.


6. 返回值

    then返回值是一个promise.新的？还是旧的？ // 是一个新的promise实例

    ```js
    promise2 = promise1.then(onFulfilled, onRejected);
    ```

    6.1 onFulfilled 或 onRejected 执行的结果是x, 调用resolvePromise。
    6.2 onFulfilled 或 onRejected 执行时抛出异常, promise2 需要被reject.
    6.3 如果 onFulfilled 不是一个函数， promise2 以promise1 的value 触发 fulfilled
    6.4 如果 onRejected 不是一个函数， promise2 以promise1 的reason 触发rejected


7. resolvePromise

    ```js
    resolvePromise(promise2, x, resolve, reject)
    ```

    7.1 如果 promise2 和 x 相等，那么reject TypeError.
    7.2 如果 x 是有个promise
        如果 x 是pending，promise 的状态必须也是等待pending 直到x 变成了 fulfilled/ rejected