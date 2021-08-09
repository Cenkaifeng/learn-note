// getter setter 
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MPromise {
    FULFILLED_CALLBACK_LIST = [];
    REJECTED_CALLBACK_LIST = [];
    _status = PENDING;

    /**
     * 
     * @param {Function} fn (reasolve, reject) =>
     */
    constructor(fn) {
        // 初始状态为pending
        this.status = PENDING;
        this.value = null;
        this.reason = null;

        try {
            fn(this.resolve.bind(this), this.reject.bind(this));
        } catch(e) {
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
        // 判断状态，只有PENDING状态才可以变成FULFILLED
        if ( this.status === PENDING ) {
            this.value = value;
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
        const realOnFulfilled = this.isFunction(onFulfilled) 
                              ? onFulfilled 
                              : (value) => {
                                    return value;
                              } 
        const realOnRejected = this.isFunction(onRejected) 
                              ? onRejected 
                              : (reason) => {
                                    throw reason;
                              } 
        
        // .then 返回值整体是一个promise

        const promise2 = new MPromise((resolve, reject) => {

            const fulfilledMicrotask = () => {
                queueMicrotask(()=> {
                    try {
                        // 6.1 onFulfilled 或者 onRejected 执行结果为x, 调用resolvePromise.
                        const x = realOnFulfilled(this.value);
                        this.resolvePromise(promise2, x, resolve, reject);
                    } catch(e) {
                        reject(e);
                    }
                })

            }

            const rejectedMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        const x =realOnRejected(this.reason);
                        this.resolvePromise(promise2, x, resolve, reject);
                    } catch(e) {
                        reject(e);
                    }                    
                })

            }
            // 调用.then 状态值改变的情况
            switch(this.status) {
                // 同步执行
                case FULFILLED: {
                    fulfilledMicrotask()
                    break;
                }
                // 同步执行
                case REJECTED: {
                    rejectedMicrotask()
                     break;
                }
                case PENDING: {// 异步情况：执行.then 还是pending的情况
                    this.FULFILLED_CALLBACK_LIST.push(fulfilledMicrotask);
                    this.REJECTED_CALLBACK_LIST.push(rejectedMicrotask);
                    // break;
                }
            }
        })
        return promise2;
    }

    catch(onRejected) {
        return this.then(null, onRejected);
    }
    resolvePromise (promise2, x, resolve, reject) {
        if (promise2 === x) {
            return reject(new TypeError('The promise and return value are then same'));
        }

        if (x instanceof MPromise) {
            // 如果x是promise，那么让新的promsie接收x的新状态
            // 即继续执行x,如果执行的时候又拿到了一个y,那么继续解析y

            queueMicrotask(() => {
                x.then((y)=> {
                    this.resolvePromise(promise2, y, resolve, reject);
                }, reject);                
            })

        } else if (typeof x === 'object' || this.isFunction(x)) {
            if (x === null) {
                return resolve(x);
            }
            let then = null;

            try{
                 // 取x.then 赋值给then 如果then是一个reject会触发报错
                then = x.then;
            } catch(e) {
                return reject(e);
            }

            // 如果获取的then是一个函数
            if ( this.isFunction(then)) {
                let called = false;
                try {
                    then.call(
                        x,// this
                        (y) => {
                            if (called) {
                                return;
                            }
                            called = true;
                            this.reasolvePromise(promise2, y, resolve, reject);
                        },
                        (r) => {
                            if (called) {
                                return;
                            }
                            called = true;
                            this.reject(r);
                        }
                    )
                } catch (error) {
                    if (called) {
                        return
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
        return typeof value === 'function';
    }
    static resolve(value) {
        if (value instanceof MPromise) {
            return value;
        }
        return new MPromise((resolve) => {
            resolve(value);
        })
    }

    static reject(reason) {
        return new MPromise((resolve, reject) => {
            reject(reason)
        })
    }

    static race(promiseList) {
        return new MPromise((resolve, reject) => {
            const length = promiseList.length;

            if (length === 0) {
                return resolve();
            } else  {
                for (let i = 0; i < length; i++) {
                    MPromise.resolve(promiseList[i]).then(
                        (value) => {
                            return resolve(value);
                        },
                        (reason) => {
                            return reject(reason);
                        }
                    )
                }
            }
        })
    }
}

// 下面这个例子的.then 会因为定时器的原因没有立即执行（状态还是pending）
// new MPromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(1)
//     }, 1000)
// }).then()
// const test = new MPromise((resolve, reject) => {
//     // setTimeout(()=> {
//     //     resolve(111);
//     // }, 1000)
//     reject(111)
// }).then(value => {
//     console.log(value);
// }).catch((e) => {
//     console.log(e);
// })


// 问题3：为什么我在catch 的回调里打印test的status 是pending.在3s后打印的test status是fulfilled?

const test = new MPromise((resolve, reject) => {
    setTimeout(() => {
        reject(111);
    }, 1000);
}).catch((reason) => {
    console.log('报错' + reason);
    console.log('内部',test)// test status 是什么？
})

setTimeout(()=> {
    console.log('第二次',test) // test status 是什么？
}, 3000);

// 1. catch 函数会返回一个新的promise, 而test就是这个新的promise
// 2. catch 回调里，打印Promise的时候，整个回调并没有执行完成. pending. 只有当整个回调完成了，才会更改状态
// 3. catch 回调函数，如果成功执行完成了，那么新的promise状态会变成fulfilled.