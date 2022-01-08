class EventEmitter {
  constructor(options = {}) {
    this.events = {}; // key: []
    this.maxListener = options.maxListener || Infinity;
  }
  emit(event, ...args) {
    const cbs = this.events[event];

    if (!cbs) {
      console.log(new Error(`${event} event hasn't registered`));
      return this;
    }
    cbs.forEach(cb => cb.apply(this, args));
    return this;
  }

  on(event, cb) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    if (
      this.maxListener !== Infinity &&
      this.events[event].length >= this.maxListener
    ) {
      throw new Error("beyond the maxListener");
    }
    this.events[event].push(cb);
    return this;
  }

  once(event, cb) {
    const func = (...args) => {
      this.off(event, func);
      cb.apply(this, args);
    };

    this.on(event, func);
    return this;
  }

  off(event, cb) {
    if (!cb) {
      this.events[event] = null;
    } else {
      this.events[event] = this.events[event].filter(item => item !== cb); // 指定cb 过滤
    }
  }
}

// 题型拓展：如果要增加一个最大监听数要怎么做？
