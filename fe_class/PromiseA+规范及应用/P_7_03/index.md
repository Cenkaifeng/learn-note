# PromiseA+ 规范

## 术语

1. promise 是一个有then方法的对象或者函数，行为遵循promiseA+规范
2. thenable 是一个有then方法的对象或者函数
3. value 是promise状态成功的值，也是resovlve的参数
4. reason 是promise状态失败的值，也是reject的参数
5. exception throw 抛出去的异常

## 规范

### Promise States 

promise 应该有三种状态
resolve reject 是动作
fulfilled rejected 是状态，是动作的结果


1. pending 
    1.1 初始状态，可改变
    1.2 一个promsie在被resolve或者reject之前，都处于这个状态
    1.3 通过 resolve -> flfilled
    1.4 通过reject -> rejected

2. fulfilled

    2.1 最终态，不可以改变
    2.2 一个promise经过resolve后变成这个状态
    2.3 必须有一个value.// 如果resolve什么都不传就是 undefined resolve();

3. rejected

    3.1 最终态，不可以改变
    3.2 一个promise经过 reject 后变成这个状态
    3.3 必须有一个reason.// 如果 reject 什么都不传就是 undefined resolve();

pending -> resolve(value) -> fulfilled

pending -> reject(reason) -> rejected


### then

promise 应该提供一个then方法，用来访问最终的结果，无论是value还是reason.(即 thenable)

补充：
如果catch 函数执行成功了，是可以再调用then方法的，在catch 后想往后传递(return) 什么就要输入相应的值，如果catch里什么都没有return,后面调用的.then获取的是undefined

```js
promise.then(onFulfilled, onRejected);
```

1. 参数要求

    1.1 onFulfilled 必须是函数类型，如果不是函数，应该被忽略
    1.2 onRejected 必须是函数类型，如果不是函数，应该被忽略

2. onFulfilled 特性

    2.1 在 promise 变成fulfilled 时，应该调用 onFulfilled, 参数是 value.
    2.2 在 promise 变成 fulfilled 之前，不应该被调用。
    2.3 只能被调用一次.(**需要一个变量来限制执行次数**)

3. onRejected 特性

    2.1 在 promise 变成 rejected 时，应该调用 onRejected, 参数是 reason.
    2.2 在 promise 变成 rejected 之前，不应该被调用。
    2.3 只能被调用一次.

4. onFulfilled 和 onRejected 应该是微任务

    queueMicrotask 实现微任务的调用


5. then方法可以被调用多次

    5.1 promise 变成 fulfilled 后，所有onFulfilled 的回调都应该按照then的顺序执行.
        在实现 promise 的时候，咱们需要一个数组来储存 onFulfilled 的cb.
    
    5.2 promise 变成 rejected 后，所有 onRejected 的回调都应该按照then的顺序执行.
        在实现 promise 的时候，咱们需要一个数组来储存 onRejected 的cb.

6. then 的返回值

    then 返回值是一个promise. 返回值是新的还是旧的？

```js
    promise2 = promise1.then(onFulfilled, onRejected);
```

    6.1 onFulfulled 或者 onRejected 执行的结果为x, 调用 resolvePromise.
    6.2 onFulfulled 或者 onRejected 执行时抛出异常, promise2 应该被reject.
    6.3 如果 onFulfilled 不是一个函数，promise2 以 promise1 的 value 触发 fulfilled.
    6.4 如果 onRejected 不是一个函数，promise2 以 promise1 的 reason 触发 rejected.
    
    tip: 6.3 6.4 可以用值的穿透理解（值透传）
    

7. resolvePromise

```js
resolvePromise(promise2, x, resolve, reject)
```

    7.1 如果 promise2 和 x , 相等， 那么 reject TypeError （会造成死循环）
    7.2 如果 x 是一个promise 
        如果 x 是 pending 态，promise 状态必须也是 pending 直到 x 变成了fulfilled / rejected

        如果 x 是 fulfilled , fulfill promise with the same value
        如果 x 是 rejected , reject promise with the same reason

    7.3 如果 x 是一个Object 或者是一个function 
            下面这个可以用一周解释：防止你的使用环境修改了原型链 Object.defineProperty then throw e
        let then = x.then;
        如果 x.then 这步出错， try catch(e), reject(e);
        如果 then 是一个函数，then.call(x, resolvePromise, rejectPromise)
         (相当于 x.then)

        
        resolvePromiseFn 的入参是y, 执行resolvePromise(promise2, y, resolve, reject);
        如果调用then的时候抛出了异常e, reject reason.