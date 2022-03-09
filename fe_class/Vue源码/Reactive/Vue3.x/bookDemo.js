// 这个demo是复现 《Vue.js 设计与实现》第四章案例的代码
import { flushJob, jobQueue } from "./jobQueue";

// 用一个全局变量存储被注册的副作用函数
let activeEffect;
const effectStack = []; // 副作用栈，防止当前副作用多个连带依赖影响执行依赖链上的副作用

function effect(fn, options = {}) {
  const effectFn = () => {
    cleanup(effectFn); // 清除原有的依赖
    // 当调用 effect 注册副作用函数时，将副作用函数 fn 赋值给 activeEffect
    activeEffect = fn;

    // 在调用副作用函数之前，将当前副作用函数压入栈中
    effectStack.push(effectFn);
    // 执行副作用函数, res 承接fn() 结果并在最后副作用函数结束后返回
    const res = fn();
    // 在当前副作用函数执行完毕后，将当前副作用函数弹出栈，并把 activeEffect 还原为之前的值
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1];

    return res;
  };
  effectFn.options = options; // options 可以让用户设置调度 options.scheduler ...
  // activeEffect.deps 用来存储所有与该副作用函数相关联的依赖集合
  effectFn.deps = [];

  // 计算属性原理,非 lazy 才立即执行
  if (!options.lazy) {
    // 执行副作用函数
    effectFn();
  }
  return effectFn;
}

// 储存副作用的函数桶
const bucket = new WeakMap();

// 原始数据
const data = { text: "hello world" };

const obj = new Proxy(data, {
  // 拦截读取操作
  get(target, key) {
    // 将副作用函数 activeEffect 添加到存储副作用函数的桶中
    track(target, key);
    // 返回属性值
    return target[key];
  },
  // 拦截设置操作
  set(target, key, newVal) {
    // 设置属性值
    target[key] = newVal;
    trigger(target, key);
  },
});

// 在 get 拦截函数内调用 track 函数追踪变化
function track(target, key) {
  if (!activeEffect) return;
  // 根据 target 从“桶”中取得depsMap,它也是一个Map类型： key --> effects
  let depsMap = bucket.get(target);
  // 如果不存在 depsMap, 那新建一个Map 并与 target 关联（创建依赖收集）
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()));
  }
  // 再根据key 从 depsMap 中取得 deps, 它是一个 Set 类型，里面存储着左右与当前 key 相关联的副作用函数： effects
  let deps = depsMap.get(key);

  // 如果 deps 不存在，同样新建一个 Set 并与 key 关联
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }
  deps.add(activeEffect);
  // dpes 就是一个与当前副作用函数存在联联系的依赖集合， 将其添加到 activeEffect.deps 数组中
  activeEffect.deps.push(deps);
}

// 在 set 拦截函数内调用 trigger 函数触发变化
function trigger(target, key) {
  // 根据 target 从桶中取得 depsMap, 它是 key --> effects
  const depsMap = bucket.get(target);
  if (!depsMap) return;
  // 根据key 取得所有副作用函数 effects
  const effects = depsMap.get(key);
  //执行副作用函数
  // effects && effects.forEach(fn => fn());
  const effectsToRun = new Set(effects); // Set.prototype.forEach https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set/forEach
  effects &&
    effects.forEach(effectFn => {
      // 为了避免无线递归调用，从而避免栈溢出 e.g. effect(() => obj.foo++)

      if (effectFn !== activeEffect) {
        // 如果 trigger 触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行
        effectsToRun.add(effectFn);
      }
    });

  effectsToRun.forEach(effectFn => {
    // 如果一个副作用函数存在调度器，则调用该调度器，并将副作用函数作为参数传递
    if (effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn);
    } else {
      // 否则执行默认行为
      effectFn();
    }
  });
}

function cleanup(effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    // deps 是依赖集合
    const deps = effectFn.deps[i];

    // 将 effectFn 从依赖集合中移除
    deps.delete(effectFn);
  }
  // 最后重置 effectFn .deps数组
  effectFn.deps.length = 0;
}

// 调度案例
effect(
  () => {
    console.log("do someting");
  },
  {
    scheduler(fn) {
      jobQueue.add(fn);
      flushJob();
    },
  }
);

// 计算属性案例
function computed(getter) {
  // value 用来缓存上一次计算的值
  let value;
  // dirty 标志，用来标识是否需要重新计算值，true 则意味着“脏”，需要计算
  let dirty = true;

  // 把 getter 作为副作用函数，创建一个 lazy 的 effect
  const effectFn = effect(getter, {
    lazy: true,
    scheduler() {
      dirty = true; // 调度器内重置 true 防止缓存锁死返回值;
      // 当计算属性的响应式数据变化时，手动调用 trigger 函数触发响应
      trigger(obj, "value");
    },
  });

  const obj = {
    // 当读取 value 时才执行 effectFn
    get value() {
      // 只有“脏”时才计算值，并将得到的值缓存到 value 中
      if (dirty) {
        value = effectFn();
        dirty = false;
      }
      // 当读取 value 时，手动调用 track 函数进行追踪
      track(obj, "value");
      return value;
    },
  };
  return obj;
}

// watch 函数接受 sourc： 响应式数据， cb 是回调函数
function watch(source, cb, options = {}) {
  let getter;
  if (typeof source === "function") {
    getter = source;
  } else {
    getter = () => traverse(source);
  }
  // 定义旧值和新值
  let oldValue, newValue;

  // cleanup 用来储存用户注册的过期回调
  let cleanup;
  function onInvalidate(fn) {
    cleanup = fn;
  }
  const job = () => {
    // c重新执行副作用函数，得到的是新值
    newValue = effectFn();
    // 调用回调cb前, 先用过期回调
    if (cleanup) {
      cleanup();
    }
    // 当数据变化时调用回调函数
    cb(newValue, oldValue, onInvalidate);
    oldValue = newValue; // 更新旧值
  };
  // 使用 effect 注册副作用函数时，开启 lazy 选项，并把返回值存储到 effectFn 中以便后续手动调用
  const effectFn = effect(
    // 触发递归读取操作，从而建立联系
    () => getter(),
    {
      lazy: true,
      scheduler: () => {
        // 调度函数中判断 flush 是否为 ’post', 如果是，将其放到微任务队列中执行
        if (options.flush === "post") {
          const p = Promise.resolve();
          p.then(job);
        } else {
          job();
        }
      },
    }
  );

  if (options.immediate) {
    // 当 immediate 为 true 时立即执行 job, 从而触发回调执行
    job();
  } else {
    oldValue = effectFn();
  }
}

function traverse(value, seen = new Set()) {
  // 如果要读取的数据是原始值，或者已经被读取过了，那么什么都不做
  if (typeof value !== "object" || value == null || seen.has(value)) return;

  // 将数据添加到 seen 中，代表遍历读取过了，避免循环引用引起的死循环
  seen.add(value);
  // 暂时不考虑数据等其他结构
  // 假设 value 就是一个对象，使用 for...in 读取对象的没一个值，并递归调用 traverse 进行处理
  for (const k in value) {
    traverse(value[k], seen);
  }

  return value;
}
