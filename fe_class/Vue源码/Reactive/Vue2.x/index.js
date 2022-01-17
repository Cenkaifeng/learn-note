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

    new Compiler(this);
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
  // static target = null;
  constructor() {
    this.deps = new Set();
  }
  add(dep) {
    // 收集依赖
    if (dep && dep.update) this.deps.add(dep);
  }
  notify() {
    // 通知
    this.deps.forEach(dep => dep.update()); // update 可以理解成执行副作用，是在watcher里的
  }
}

// html -> <h1>{{ count }}</h1> -> compiler 发现有个 {{ count }}
// -> new Watcher(vm, 'count', () => renderToView(count)) -> count getter 被触发
// -> dep.add(watcher 实例) -> this.count++ -> count setter -> dep.notify
// -> () => renderToView(count) -> 页面改变
class Watcher {
  constructor(vm, key, cb) {
    // 一般来说，watcher 我们会在 compiler 的时候调用
    this.vm = vm;
    this.key = key;
    this.cb = cb;

    Dep.target = this;
    this.__old = vm[key]; // 拿到当前key 对应的值 1.存下初始值，2.触发 getter
    // (哪个？先触发ProxyData 代理实例, 获取 this.$data[key],
    //  但是$data 已经被拦截了，优化触发defineReactive 的getter)
    // 这样就能让 Dep.target $$ dep.add(Dep.target) 执行起来
    Dep.target = null; // 移除 target 实例 (毕竟已经在getter触发完了)
  }

  update() {
    let newValue = this.vm[this.key]; // 参考 ./myvue_project 工程
    if (this.__old === newValue || __isNaN(newValue, this.__old)) return;
    this.cb(newValue);
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
    this.walk(value); // walk 一定要在 dep 实例化之前
    let dep = new Dep();

    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        // target 其实是 watcher 实例
        Dep.target && dep.add(Dep.target);
        return value;
      },
      set(newValue) {
        if (value === newValue || __isNaN(value, newValue)) return;
        value = newValue;
        that.walk(newValue);
        dep.notify();
      },
    });
  }
}

class Compiler {
  constructor(vm) {
    this.el = vm.$el;
    this.vm = vm;
    this.methods = vm.$methods;

    this.compile(vm.$el);
  }

  compile(el) {
    let childNodes = el.childNodes;
    // 类数组
    Array.from(childNodes).forEach(node => {
      if (this.isTextNode(node)) {
        this.compileText(node);
      } else if (this.isElementNode(node)) {
        this.compileElement(node);
      }

      if (node.childNodes && node.childNodes.length) this.compile(node);
      // ...
    });
  }
  // ' this {{ count }}'
  compileText(node) {
    let reg = /\{\{(.+?)\}\}/;
    let value = node.textContent;
    if (reg.test(value)) {
      let key = RegExp.$1.trim();
      node.textContent = value.replace(reg, this.vm[key]);

      new Watcher(this.vm, key, val => {
        node.textContent = val;
      });
    }
  }
  // <input v-model="msg" />
  compileElement(node) {
    if (node.attributes.length) {
      Array.from(node.attributes).forEach(attr => {
        let attrName = attr.name;
        if (this.isDirective(attrName)) {
          // v-on:click v-model 只对以上标识符做匹配
          attrName =
            attrName.indexOf(":") > -1
              ? attrName.substr(5)
              : attrName.substr(2);
          let key = attr.value;
          this.update(node, key, attrName, this.vm[key]);
        }
      });
    }
  }
  update(node, key, attrName, value) {
    if (attrName === "text") {
      node.textContent = value;
      new Watcher(this.vm, key, val => (node.textContent = val));
    } else if (attrName === "model") {
      node.value = value;
      new Watcher(this.vm, key, val => (node.value = val));
      node.addEventListener("input", () => {
        this.vm[key] = node.value;
      });
    } else if (attrName === "click") {
      node.addEventListener(attrName, this.methods[key].bind(this.vm));
    }
    // ....
  }
  // 指令分析
  isDirective(str) {
    return str.startsWith("v-");
  }
  isElementNode(node) {
    return node.nodeType === 1;
  }
  isTextNode(node) {
    return node.nodeType === 3;
  }
}

function __isNaN(a, b) {
  return Number.isNaN(a) && Number.isNaN(b);
}
