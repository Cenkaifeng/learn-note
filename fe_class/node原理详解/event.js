// const EventEmitter = require('events');

// const event = new EventEmitter()

// 手写实现eventbus

class EventEmitter {
    constructor() {
        this.events = {};
    }
    /** 触发监听事件 */
    emit(event, ...args) {
        const cbs = this.events[event];

        if(!cbs) {
            console.log('当前事件未注册');
            return this;
        }

        cbs.forEach(cb => {
            cb.apply(this, args)
        });
        return this;
    }
    /** 创建监听事件 */
    on(event, cb) {
        if(!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(cb);
        return this;
    }
    /** 创建监听一次事件 */
    once(event, cb) {
        const func = (...args) => {
            this.off(event, func);
            cb.apply(this, args);
        }
        this.on(event, func);
        return this;
    }
    /** 移除事件 */
    off(event, cb) {

    }
}