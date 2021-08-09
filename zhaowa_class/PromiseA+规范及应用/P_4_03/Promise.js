
// 2 定义三种状态

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MPromise  {
    FULFILLED_CALLBACK_LIST = [];
    REJECTED_CALLBACK_LIST = [];
    _status = PENDING;

    constructor(fn) {
        this.status = PENDING;// 初始化状态
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
        switch(newStatus) {
            case FULFILLED: {
                this.FULFILLED_CALLBACK_LIST.forEach(callback => {// es5 把循环调用放到resolve
                    callback(this.value)
                })
                break;
            }
            case REJECTED: {
                this.REJECTED_CALLBACK_LIST.forEach(callback => {// es5 把循环调用放到reject
                    callback(this.reason);
                })
                break;
            }
        }
    }
    resolve(value) {
        if(this.status === PENDING) {
            this.value = value;
            this.status = FULFILLED;
        }

    }

    reject(reason) {
        if(this.status === PENDING) {
            this.reason = reason;
            this.status = REJECTED;
        }
    }

    then(onFulfilled, onRejected) {
        const fulfilledFn = this.isFunction(onFulfilled) ? onFulfilled : (value) => value;
        const rejectedFn = this.isFunction(onRejected) ? onRejected: (reason) => reason;

        const fulFilledFnWithCatch = (resolve, reject, newPromise) => {
            queueMicrotask(() => {
                try {
                    if(!this.isFunction(onFulfilled)) { // isFunction 这里可以精简一下
                        resolve(this.value);
                    } else {
                        const x = fulfilledFn(this.value);
                        this.resolvePromise(newPromise, x, resolve, reject)
                    }
                } catch(e) {
                    reject(e);
                }                
            })

        }
        const rejectedFnWithCatch = (resolve, reject, newPromise) => {
            queueMicrotask(() => {
                try {
                    if(!this.isFunction(onRejected)) {
                        reject(this.reason)
                    } else {
                        const x = rejectedFn(this.reason);
                        this.resolvePromise(newPromise, x, resolve, reject);
                    }
                } catch(e) {
                    reject(e);
                }                
            })

        }
        switch(this.status) {
            case FULFILLED: {
                const newPromise = new MPromise((resolve,reject) => fulFilledFnWithCatch(resolve, reject, newPromise))
                return newPromise;
            }
            case REJECTED: {
                const newPromise = new MPromise((resolve,reject) => rejectedFnWithCatch(resolve, reject, newPromise));
                return newPromise;
            }
            case PENDING: {
                const newPromsie = new MPromise((resolve, reject) => {
                    this.FULFILLED_CALLBACK_LIST.push(()=> fulFilledFnWithCatch(resolve, reject, newPromsie));
                    this.REJECTED_CALLBACK_LIST.push(() => rejectedFnWithCatch(resolve, reject, newPromsie));
                }) 
                return newPromsie
            }
        }
            const promise2 = new MPromise()//
       
        return promise2

    }

    resolvePromise(newPromise, x, resolve, reject) {
        if (newPromise === x) {
            return reject(new TypeError('err'));
        }
        if (x instanceof MPromise) {
            x.then(y => {
                this.resolvePromise(newPromise, y, resolve, reject)
            }, reject)
        } else if (typeof x === 'object' || this.isFunction(x)) {
            if (x === null) {
                return resolve(x)
            }
            let then = null;
            try {
                then = x.then;
            } catch (error) {
                return reject(error);
            }

            if (this.isFunction(then)) {
                let called = false;
                try {
                    then.call(x, 
                    (y) => {
                        if(called){
                            return
                        }
                        called = true;
                        this.resolvePromise(newPromise, y, resolve, reject);
                    },
                    (r) => {
                        if (called) {
                            return;
                        }
                        called = true;
                        reject(r)
                    })
                } catch (e) {
                    if (called) {
                        return;
                    }
                    reject(error);
                }
            } else {
                resolve(x);
            }
        } else {
            resolve(x)
        }
    }
    catch(onRejected) {
        return this.then(null, onRejected)
    }

    isFunction(param) {
        return typeof param === 'function';
    }
}

 const test = new MPromise((resolve, reject) => {
     setTimeout(() => {
         reject(1111);
     }, 1000);
 }).then((value) => {
 console.log('完成' + value);
 }).catch(reject => {
     console.log('报错' +reject)
 })