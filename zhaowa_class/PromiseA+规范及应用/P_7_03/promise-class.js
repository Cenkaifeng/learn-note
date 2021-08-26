
// 全局状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';


class MPromsie {
    FULFILLED_CALLBACK_LIST = [];
    REJECTED_CALLBACK_LIST = [];
    _status = PENDING; // 真正的status

    /**
     * 
     * @param {*} Fn (resolve, reject) => {}
     */
    constructor(Fn) {
        this.status = PENDING; // 初始状态是 pending
        this.value = null;
        this.reason = null;
        // 初始化 Promise 执行 Fn 函数

        try {
            Fn(this.resolve.bind(this), this.reject.bind(this));
        } catch (e) {
            this.reject(e);
        }
    }
    get status() {
        return this._status;
    }

    set status(newStatus) {
        this._status = newStatus;
        switch(newStatus) {
            case FULFILLED: {
                this.FULFILLED_CALLBACK_LIST.forEach(callback => {
                    callback(this.value);
                })
                break;
            }
            case REJECTED: {
                this.REJECTED_CALLBACK_LIST.forEach(callback => {
                    callback(this.reason);
                })
                break;
            }
        }
    }

    resolve(value) {
        // 改全局状态
        if ( this.status === PENDING ) {
            this.value = value; // setter 里会用到，所以更新状态前先把value更新了
            this.status = FULFILLED;
        }
    }

    reject(reason) {
        if ( this.status === PENDING ) {
            this.reason = reason;
            this.status = REJECTED;
        }
    }
    
    then(onFulfilled, onRejected) {
        // 两个入参必须都是函数
        //6.3 如果 onFulfilled 不是一个函数，promise2 以 promise1 的 value 触发 fulfilled.
        const realOnFulfilled = this.isFunction(onFulfilled) ? 
                                                onFulfilled : 
                                                (value) => {
                                                    return value;
                                                }
        //6.4 如果 onRejected 不是一个函数，promise2 以 promise1 的 reason 触发 rejected.
        const realOnRejected = this.isFunction(onRejected) ? 
                                                onRejected : 
                                                (reason) => {
                                                    return reason;
                                                }
        const promise2 = new MPromsie((resolve, reject) => {
            // 6.2 onFulfulled 或者 onRejected 执行时抛出异常, promise2 应该被reject.
            const fulfilledMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        //6.1 onFulfulled 或者 onRejected 执行的结果为x, 调用 resolvePromise.
                    const x = realOnFulfilled(this.value);
                    this.resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e)
                    }                    
                })

            }

            const rejectedMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        //6.1 onFulfulled 或者 onRejected 执行的结果为x, 调用 resolvePromise.
                       const x = realOnRejected(this.reason);
                       this.resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                })
            }

            // 当调用.then 的时候，不同的状态，调用不同的回调.
            switch(this.status) {
                case FULFILLED: {
                    // realOnFulfilled();
                    fulfilledMicrotask()
                    break;
                }
                case REJECTED: { 
                    // realOnRejected();
                    rejectedMicrotask();
                    break;
                }
                case PENDING: { // promise 内部还是异步的时候
                    this.FULFILLED_CALLBACK_LIST.push(fulfilledMicrotask);
                    this.REJECTED_CALLBACK_LIST.push(rejectedMicrotask)
                    break;
                }
            }
        })  
        return promise2                                      
    }
    catch(onRejected) {
        return this.then(null, onRejected);
    }
    resolvePromise(promise2, x, resolve, reject) {
        if (promsie2 === x) {
            return reject(new TypeError('The promsie and the return value are the same'));
        }

        if ( x instanceof MPromsie) {
             // 如果x是 promise ，那么让新的promise 接收 x 的状态
             // 即继续执行 x, 如果执行的时候又拿到一个y ,那么继续解析y.
             queueMicrotask(() => {
                 x.then((y) => {
                     this.resolvePromise(promise2, y, resolve, reject);
                 }, reject)
             })
        } else if (typeof x === 'object'  || this.isFunction(x)) {
            if ( x === null) { // null 也会被判断object
                return resolve(x);
            }
            let then = null
            try {
                // 取x.then 赋值给then
                /**
                 * let then = x.then;
                    如果 x.then 这步出错， try catch(e), reject(e);
                    如果 then 是一个函数，then.call(x, resolvePromise, rejectPromise)
                 */
                then = x.then;
            } catch (e) {
                return reject(e)
            }

            // 如果 then 是函数
            if(this.isFunction(then)) {
                let called = false;
                try {
                    then.call(
                        x, 
                        (y) => {// onFulfilled
                            if ( called ) {
                                return;
                            }
                            called = true;
                            this.resolvePromise(promise2, y, resolve, reject);
                        },
                        (r) => {
                            if (called) {
                                return;
                            }
                            called = true;
                            reject(r);
                        }
                    )
                } catch(error) {
                    if ( called ) {
                        return
                    }
                    reject(error);
                }
            } else {
                resolve(x);
            }
        } 
        else { // 不是函数，不是对象，就是一个普通值
            resolve(x);
        }
    }


    isFunction(value) {
        return typeof value === 'function'
    }

    static resolve(value) {
        if (value instanceof MPromsie) {
            return value;
        }

        return new MPromsie((resolve) => {
            resolve(value);

        })
    }

    static reject(reason) {
        return new MPromsie((resolve, reject) => {
            reject(reason);
        })
    }

    static race(promiseList) {
        return new MPromsie((resolve, reject) => {
            const length = promiseList.length;

            if ( length === 0) {
                return resolve();
            } else {
                for (let i = 0; i< length; i++) {
                    MPromsie.resolve(promiseList[i]).then((value) => {
                        return resolve(value);
                    },
                    (reason) => {
                        return reject(reason);
                    })
                }
            }
        })
    }

}

const promise = new MPromsie((resolve, reject)=>{})

new MPromsie((resolve, reject) => {

}).then();

/**
 * 1. 设置状态、入参、resolve reject 方法与状态流转
 * 2. Promise 的 fn 入参
 * 3. then 的返回值和入参
 * 4. then 的回调，设置数组，在改变状态后调用CALLBACK_LIST
 * 5. then 的异常处理 try catch
 * 6. resolvePromsie
 *  6.1 resolvePromise 的调用
 *  6.2 入参 promise2 还有 x 的判断
 *  6.3 其他边界判断
 */

// 课后题

const test = new MPromsie((resolve, reject) => {
    setTimeout(() => {
        resolve(111);
    }, 1000);
}).then((value) => {
    console.log('then');
})

setTimeout(() => {
    console.log(test); // value 是什么值
}, 3000)

// 问题，then 每次都会返回 new Promise 那么链式调用为什么要用callback_list 存then 回调呢？