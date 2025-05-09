// 用于应付面试coding 手写题练习

// curry 函数
function currying(fn, ...args) {
  const originFnArgumentLength = fn.length; // 原函数参数长度

  let allArgs = [...args]; // 这是个闭包

  const resFn = function (...newArgs) {
    // 被柯里化之后的调用函数
    allArgs = [...allArgs, ...newArgs]; // 覆盖之前的参数
    console.log(allArgs);

    if (allArgs.length === originFnArgumentLength) {
      // 参数个数和原函数齐平直接返回执行的结果
      return fn(...allArgs);
    } else {
      return resFn;
    }
    // return currying.call(null, fn, ...allArgs);
  };
  // resFn.toString = function () {
  //   return fn.apply(null, ...allArgs);
  // };

  return resFn;
}

/**
 * 这是一个更简洁的柯里化实现，与上面的 currying 函数相比主要有以下区别：
 * 1. 实现更简洁，代码量更少
 * 2. 不需要显式维护 allArgs 数组，而是通过闭包和参数拼接实现
 * 3. 返回箭头函数保证了 this 指向的一致性
 * 4. 判断逻辑更直接：只要参数数量够了就直接执行，否则继续收集参数
 */
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn.apply(this, args);
    return (...args2) => curried.apply(this, args.concat(args2));
  };
}
// curry 函数的用例
const add = (a, b, c) => a + b + c;
const a1 = currying(add);
let res = a1(1)(2)(3);

/**
 * 1. 实现一个 Math.sqrt 方法
 *
 **/
/**
 * 使用二分法实现平方根计算
 * @param {number} num - 需要计算平方根的数字
 * @param {number} precision - 精度要求，默认为1e-10
 * @returns {number} - 计算得到的平方根
 *
 * 实现原理:
 * 1. 通过二分查找逐步逼近平方根
 * 2. 对于小于1的数和大于1的数采用不同的初始区间
 * 3. 当区间长度小于精度要求时返回结果
 */
function sqrtBisection(num, precision = 1e-10) {
  // 参数校验
  if (typeof num !== "number") throw new TypeError("输入必须为数字");
  if (num < 0) throw new Error("负数无实数平方根");
  if (num === 0) return 0;
  if (num === 1) return 1;

  // 确定初始搜索区间
  let low, high;
  if (num < 1) {
    // 对于小于1的数，平方根比原数大
    low = num;
    high = 1;
  } else {
    // 对于大于1的数，平方根比原数小
    low = 1;
    high = num;
  }

  // 二分查找过程
  while (high - low > precision) {
    const mid = (low + high) / 2;
    const midSquare = mid * mid;

    // 处理浮点数精度问题
    if (Math.abs(midSquare - num) < precision) {
      return mid.toFixed(2);
    }

    if (midSquare > num) {
      high = mid;
    } else {
      low = mid;
    }
  }

  // 返回区间中值作为最终结果，保留两位小数 precision == (high - low)
  return Number(((low + high) / 2).toFixed(2));
}

// 2. 手写实现 now 方法
/**
 * 这是一个模拟实现 new 操作符的函数
 *
 * 实现原理:
 * 1. 创建一个新对象,并将其原型指向构造函数的 prototype
 * 2. 执行构造函数,并将 this 指向新创建的对象
 * 3. 如果构造函数返回一个对象,则返回该对象;否则返回新创建的对象
 *
 * 参数说明:
 * @param {Function} constructor - 构造函数
 * @param {...any} args - 传递给构造函数的参数
 * @returns {Object} - 返回新创建的实例对象
 *
 * 使用示例:
 * function Person(name) { this.name = name; }
 * const person = myNew(Person, 'John');
 */
function myNew(constructor, ...args) {
  // 创建一个新对象,原型指向构造函数的prototype
  const obj = Object.create(constructor.prototype);
  // 执行构造函数,并将this指向新创建的对象
  const result = constructor.apply(obj, args);
  // 如果构造函数返回的是对象类型,则返回该对象
  // 否则返回新创建的对象
  return result instanceof Object ? result : obj;
}
// 3. 实现一个 bind 方法
// 4. 实现一个 call 方法
// 5. 实现一个 apply 方法
/**
 * myCall 是一个自定义的 call 方法实现
 *
 * 实现原理:
 * 1. 接收一个 context 参数作为函数执行时的 this 指向,如果不传默认为 window
 * 2. 使用 Symbol 创建唯一的属性键,避免属性名冲突
 * 3. 将当前函数(this)作为 context 的一个方法
 * 4. 执行该方法并传入参数
 * 5. 删除临时添加的方法
 * 6. 返回函数执行结果
 *
 * 使用示例:
 * function greet() { console.log(`Hello, ${this.name}!`); }
 * const person = { name: 'John' };
 * greet.myCall(person); // 输出: Hello, John!
 */
Function.prototype.myCall = function (context, ...args) {
  // 如果没有传入 context,默认为 window
  context = context || window;
  // 创建唯一的属性键
  const fnKey = Symbol();
  // 将当前函数绑定到 context 上
  context[fnKey] = this;
  // 执行函数并保存结果
  const result = context[fnKey](...args);
  // 删除临时属性
  delete context[fnKey];
  // 返回执行结果
  return result;
};

Function.prototype.myApply = function (context, args) {
  context = context || window;
  const fnKey = Symbol();

  context[fnKey] = this;

  const result = args ? context[fnKey](...args) : context[fnKey]();
  delete context[fnKey];
  return result;
};

// 6. 实现一个防抖函数

/**
 * debounce 函数是一个防抖函数的实现
 *
 * 实现原理:
 * 1. 通过闭包保存 timeout 计时器状态
 * 2. 每次触发时先清除之前的计时器
 * 3. 设置新的计时器,延迟执行传入的函数
 * 4. delay 时间内重复调用会不断重置计时器
 *
 * 参数说明:
 * @param {Function} fn - 需要进行防抖处理的函数
 * @param {number} delay - 防抖延迟时间,单位毫秒
 * @returns {Function} - 返回经过防抖处理的新函数
 *
 * 使用场景:
 * - 搜索框输入联想
 * - 按钮快速点击
 * - 浏览器窗口大小改变后重新计算布局
 */
function debounce(fn, delay) {
  let timeout = null;
  return function () {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}
function onInput(event) {
  const value = event.target.value;
  if (value) {
    console.log(value);
  }
}
const debounceOnInput = debounce(onInput, 300);

// 7. 实现一个节流函数

/**
 * 这是一个节流函数的实现,主要用于限制函数的执行频率
 *
 * 实现原理:
 * 1. 通过闭包保存timer状态
 * 2. 首次调用时timer为null,设置定时器并执行函数
 * 3. delay时间内重复调用,由于timer存在,不会重复执行
 * 4. delay时间后timer被清空,可以进行下一次执行
 *
 * 特点:
 * - 在delay时间内,只会执行一次函数
 * - 使用setTimeout实现,属于"后执行"型节流
 * - 保存了函数执行时的this指向和参数
 */
function throttle(func, delay) {
  let timer = null;
  return function () {
    const context = this;
    const args = arguments;
    if (!timer) {
      timer = setTimeout(function () {
        func.apply(context, args);
        timer = null;
      }, delay);
    }
  };
}

// 8. [场景] 实现一个格式化函数，数字输入转换成字符串，改成千分位，头尾不需要千分符

// 9. 实现一个发布订阅

/**
 * EventEmitter 是一个发布订阅模式的实现
 * 主要包含以下功能:
 * 1. events: 用于存储事件和对应的回调函数列表
 * 2. on: 订阅事件,将回调函数存储到对应的事件列表中
 * 3. emit: 触发事件,执行该事件对应的所有回调函数
 */
class EventEmitter {
  constructor() {
    // 存储所有事件及其对应的回调函数
    this.events = {};
  }

  // 订阅事件
  on(type, fn) {
    // 如果该事件类型不存在,则初始化为空数组
    if (!this.events[type]) {
      this.events[type] = [];
    }
    // 将回调函数添加到事件列表
    this.events[type].push(fn);
  }

  // 触发事件
  emit(type, ...args) {
    // 获取该事件类型的所有回调函数并执行
    const fns = this.events[type] || [];
    fns.forEach((fn) => {
      fn.apply(this, args);
    });
  }
}

// 基础算法准备

// bfs

// dfs 深度优先遍历
