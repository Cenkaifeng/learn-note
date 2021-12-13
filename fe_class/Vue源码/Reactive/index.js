export class Vue {
  constructor(options = {}) {
    this.$options = options;
    this.$el =
      typeof options.el === "string"
        ? document.querySelector(options.el)
        : options.el;
    this.$data = options.data;
    this.$methods = options.methods;

    this.proxy(this.$data);

    // observer 拦截 this.$data 开始监听
    new Observer(this.$data);
  }

  // 代理一下， this.$data.xxx -> this.xxx
  proxy(data) {
    Object.keys(data).forEach(key => {
      // this

      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key];
        },
        set(newValue) {
          // NaN !== NaN
          if (data[key] === newValue || __isNaN(data[key], newValue)) return;

          data[key] = newValue;
        },
      });
    });
  }
}

// 响应式
// data: { count: 0 }
// this.count ++ // 页面上count 也 ++
// 这个就需要发布订阅模式

class Dep {
  constructor() {
    this.daps = new Set();
  }
  add(dep) {
    // 收集依赖
    if (dep && dep.update) this.deps.add();
  }
  notify() {
    // 通知
    this.deps.forEach(dep => dep.update); // update 可以理解成执行副作用，是在watcher里的
  }
}

class Watcher {
  constructor(vm, key, cb) {
    // 一般来说，watcher 我们会在 compiler 的时候调用
    this.vm = vm;
    this.key = key;
    this.cb = cb;

    Dep.target = this;
    this.__old = vm[key]; // 拿到当前key 对应的值 1.存下初始值，2.触发 getter
    Dep.target = null; // 移除 target 实例
  }

  update() {
    let newValue = this.vm[this.key]; // 参考 ./myvue_project 工程
    if (this.__old === newValue || isNaN(newValue, this.__old)) return;
    this.cb;
    // 更新视图阶段会 __patch__
  }
}

// edge case: array // Vue 将原生数组劫持返回自己重写的方法。
// 正常来讲要搞个 Observer.js
class Observer {
  constructor(data) {
    this.walk(data);
  }
  walk(data) {
    if (!data || typeof data !== "object") return;
    Object.keys(data).forEach(key => this.defineReactive(data, key, data[key]));
  }
  defineReactive(obj, key, value) {
    let that = this;
    let dep = new Dep();
    this.walk(value);

    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        // target 其实是 watcher 实例
        Dep.target && dep.add(Dep.target);
        return value;
      },
      set(newValue) {
        if (data[key] === newValue || __isNaN(data[key], newValue)) return;
        value = newValue;
        that.walk(newValue);
      },
    });
  }
}

function __isNaN(a, b) {
  return Number.isNaN(a) && Number.isNaN(b);
}
