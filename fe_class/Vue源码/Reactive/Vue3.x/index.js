// Vue3 响应式
/**
 * Vue3 的响应式原理其实和 Vue2 的差不多，主要是，它用很多函数式的东西来体现，对外暴露api来实现
 * 所以你看源码里面 一堆 apiWatch / apiXXX 这种函数写法
 */

function isObject(data) {
  return data && typeof data === "object";
}

let targetMap = new WeakMap();
let activeEffect; // 源码里用了一个栈 Effect 做的事和Vue2.x 的watcher 干的事差不多
// vue 2 的 dep 是在 defineReactive 中创建，而 vue3 中只有一个全局的 targetMap
/**
 * {
 *  target: {
 *    key: [effect, effect, effect, effect]
 *  }
 * }
 *
 *
 */

function track(target, key) {
  // dep.add
  let depsMap = targetMap.get(target);
  if (!depsMap) targetMap.set(target, (depsMap = new Map()));
  let dep = depsMap.get(key);
  if (!dep) depsMap.set(key, (dep = new Set()));
  if (!dep.has(activeEffect)) dep.add(activeEffect); // Dep.target && dep.add(Dep.target)
}

function trigger(target, key) {
  // dep.notify
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  depsMap.get(key).forEach(e => e && e());
}

function effect(fn, options = {}) {
  // 看起来有点绕，但是实际上就是 声明 1. __effect; 2. 把 __effect 挂在 activeEffect 上; 然后执行 fn
  const __effect = function (...arg) {
    activeEffect = __effect;
    return fn(...arg);
  };
  if (!options.lazy) {
    __effect();
  }
  return __effect;
}
/**
 * const a = reactive({count: 0}) // reactive 返回一个代理对象
 * a.count ++
 *
 */
export function reactive(data) {
  if (!isObject(data)) return;

  return new Proxy(data, {
    get(target, key, receiver) {
      // 反射 target[key] -> 继承关系情况下有坑 :FIX
      const ret = Reflect.get(target, key, receiver);
      track(target, key); // 依赖收集
      return isObject(ret) ? reactive(ret) : ret;
    },
    set(target, key, val, receiver) {
      Reflect.set(target, key, val, receiver);
      trigger(target, key); //  通知 notify（）
      return true;
    },
    deleteProperty(target, key) {
      const ret = Reflect.deleteProperty(target, key, receiver);
      trigger(target, key);
      return ret;
    },
  });
}

/**
 * 由于 proxy 对于基本类型没办法，0, "" 这类, 所以有了 ref()
 *
 * const count = ref(0) // 把基本类型包装成对象给 proxy 搞, 所以调用要 count.value
 * count.value ++
 */
export function ref(target) {
  let value = target;
  const obj = {
    get value() {
      track(obj, "value");
      return value;
    },
    set value(newValue) {
      if (value === newValue) return;
      value = newValue;
      trigger(obj, "value");
    },
  };
  return obj;
}

// computed(() => cunt.value)
// computed({get value() { return xxx}})

export function computed(fn) {
  // 只考虑函数的情况
  // 延迟计算 const c = computed(() => `${count.value} + xxx`)
  // 调用 c.value  computed 的 getter() 的时候才会计算 computed 里的值
  let __computed;
  const run = effect(fn, { lazy: true });
  __computed = {
    get value() {
      return run();
    },
  };
  return __computed;
}

export function mount(instance, el) {
  effect(function () {
    instance.$data && update(instance, el);
  });

  instance.$data = instance.setup();
  update(instance, el);

  function update(instance, el) {
    el.innerHTML = instance.render();
  }
}
