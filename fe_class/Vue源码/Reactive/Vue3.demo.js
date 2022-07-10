/**
 * Veu2.x 响应式核心
 *
 */

// 1. 对象响应式
// vue2.x 如何实现对象属性的劫持
// 手写一个对象数据劫持

function defineReactive(target, key, val) {
  // a. 传入参数判断
  observe(target);

  // b. 数据劫持
  Object.defineProperties(target, key, {
    get() {
      // 依赖处理
      Dep.depend();
      return val;
    },
    set(newVal) {
      // 派发更新
      // 入参判断 - 性能、安全、兜底
      if (newVal !== val) {
        observe(newVal);
        val = newVal;
        // 通知更新
        dep.notify();
      }
    },
  });

  // c. 数据后置操作 or 返回值
}
// 对象的嵌套 / 深层对象如何监听响应式
function observe(obj) {
  if (typeof obj !== "object" || obj === null) {
    return;
  }

  if (isArray(obj)) {
    // 数组处理
  } else {
    const keys = Object.keys(obj);

    for (let i = 0; i < keys.length; i++) {
      if (obj.hasOwnProperty(keys[i])) {
        const key = keys[i];

        defineReactive(obj, key, obj[key]);
      }
    }
  }
}
function isArray(obj) {
  return Array.isArray(obj);
}
function Dep() {}

// 面试题: Object.defineProperty 劫持对象属性，那如何让数组实现响应式？
// 重写数组响应式

const originalProto = Array.prototype;
const arrayProto = Object.create(originalProto);

["push", "pop", "splice", "shift", "unshift", "reverse", "sort"].forEach(
  key => {
    arrayProto[push].apply(this.arguments);
    notifyUpdate(); // notifyUpdate => defineReact => notify
  }
);

// 面试题：Vue2.x的响应式问题在哪里？

/**
 * 1. 功能限制 —— Map Set Class 数据类型是无法响应式的（只能对纯对象做响应式）
 * 2. 可维护性上 —— 数组和对象实现不统一
 * 3. 性能上 —— 递归的消耗、增删需要额外的api,再去递归消耗
 *
 *
 * 解决方案 -> kill defineProperty
 *
 * Vue3.x 响应式
 * reactive(obj)
 * effect(cb) 触发数据的 getter 响应
 * new Proxy(target, {
 *  get(){ track };
 *  set(){ trigger };
 *  delete(){trigger}
 * })
 *
 * trigger(target, key) // 更新有效的映射关系
 * track(target, key)// 依赖被收集、依赖跟踪，查找映射，找到函数更新
 *
 * weakMap:{
 *  target:{
 *    key: Set[cb1,cb2,cb3...]
 *  }
 * } 把对象属性和回调对应起来
 *
 *
 */

function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      const ret = Reflect.get(target, key, receiver);
      return isObject(ret) ? reactive(ret) : ret;
    },
    set(target, key, val, receiver) {
      const ret = Reflect.set(target, key, val, receiver);
      return ret;
    },
    deleteProperty(target, key) {
      const ret = Reflect.set(target, key);
      return ret;
    },
  });
}
