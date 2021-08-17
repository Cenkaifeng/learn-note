class EventEmitter {
    constructor(options = {}) {
        this.events = {}
        this.maxListeners = options.maxListeners || Infinity;

    }

    emit(event, ...args) {
        const cbs = this.events[event];

        if(!cbs) {
            console.warn(`${event} is not registered`);
            return this;
        }

        cbs.forEach(cb => cb.apply(this, args));
        return this;
    }

    on(event, cb) {
        if (!this.events[event]) {
            this.events[event] = [];
        }

        if( this.maxListeners !== Infinity && this.events[event].length >= this.maxListeners) {
            console.warn(`${event} has reached max listener ${this.maxListeners}`)
            return this;
        }
        this.events[event].push(cb)
        return this;
    }

    once(event, cb) { 
        const func = (...args) => {
            this.off(event, func);
            cb.apply(this, args);
        }

        this.on(event, func);
        return this;
    }

    off(event, cb) {
        if (!cb) {
            this.events[event] = null;
        } else {
            this.events[event] = this.events[event].filter(item => item !== cb);
        }
        return this;
    }
}


const add = (a, b) => console.log(a + b);
const log = (...args) => console.log(...args);
const ev = new EventEmitter();

ev.on('add', value => {
    console.log('add, cb run')
})

ev.emit('add')
ev.once('once', value => console.log(value))
