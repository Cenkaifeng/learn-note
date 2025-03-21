// 文件同 ../miniReact
// jsx -- babel plugin 插件
// eg const Empty = <div className='empty'></div>
// -> createElement('div', {}, [])

const isArr = Array.isArray;
const toArray = arr => (isArr(arr ?? []) ? arr : [arr]);
const isText = txt => typeof txt === "string" || typeof txt === "number";
const flatten = arr => [
  ...arr.map(ar =>
    isArr(ar) ? [...flatten(ar)] : isText(ar) ? createTextVNode(ar) : ar
  ),
];

//<div className='empty'>hello world!</div>
// babel-plugin-jsx-transform -> h('div', {className: 'empty'}, 'hello wrld!')
export function h(type, props, ...kids) {
  props = props ?? {};
  kids = flatten(toArray(props.children ?? kids)).filter(Boolean);
  if (kids.length) props.children = kids.length === 1 ? kids[0] : kids; // React child可以是一个数组或对象

  const key = props.key ?? null;
  const ref = props.ref ?? null;

  delete props.key; // 性能
  delete props.ref;

  return createVNode(type, props, key, ref);
}

function createTextVNode(text) {
  return {
    type: "",
    props: { nodeValue: text + "" },
  };
}

function createVNode(type, props, key, ref) {
  return {
    type,
    props,
    key,
    ref,
  };
}

export function Fragment(props) {
  return props.children;
}

// scheduler
/**
 * scheduler -> 把任务放进一个队列，然后开始（以某种节奏[ric (requestIdleCallback)]执行）
 * -> 还可以拆成：两步 pushTask, schedule
 * shouldYield -> should yield -> generator yield (本质上是一个返回 true / false 的函数)
 */
const queue = [];
const threshold = 1000 / 60;

// git transtions
const transitions = [];
let deadline = 0;

const now = () => performance.now();
const peek = arr => arr[0];

function shouldYield() {
  // https://github.com/WICG/is-input-pending
  // 超时、或用户输入时
  return navigator.scheduling.isInputPending() || now() >= deadline;
}

// 建立触发了一个宏任务
const postMessage = (() => {
  const cb = () => transitions.splice(0, 1).forEach(c => c());
  const { port1, port2 } = new MessageChannel();
  // port2.postMessage → 相当于下个时间片 setTimeout 里执行了 port1.onmessage ( ) 中的函数
  // 
  port1.onmessage = cb;
  return () => port2.postMessage(null);
})();

export function startTransition(cb) {
  transitions.push(cb) && postMessage(); // 为了下一个时间片拿回执行权
}
// 二合一 push / exec
export function schedule(cb) {
  queue.push({ cb }); // 这任务最重会调和 reconciliation
  startTransition(flush);
}

//requestIdleCallback 的最小实现
function flush() {
  deadline = now() + threshold;
  let task = peek(queue);

  // shouldYield 表示要不要把控制权交还给主浏览器
  while (task && !shouldYield()) {
    const { cb } = task;
    task.cb = null;
    const next = cb();

    if (next && typeof next === "function") {
      task.cb = next;
    } else {
      queue.shift();
    }

    task = peek(queue);
  }

  task && startTransition(flush); // 执行控制权翻转
}

// scheduler  React 的调度属于通用设计

/*
React 的调度器是基于 IDLE -- requestIdleCallback 时间切片实现的调度器

但是 React 最终没有用 requestIdleCallback api 而是自己实现了一个？

1. 兼容性 
2. 50Hz 渲染问题（最终弃用原因）
  50毫秒 1000/50 相当于每次有 20ms, 如果切片逻辑足够复杂， 
  20ms 就会让用户觉得卡顿了。这个是浏览器底层限制导致的，这个api 一秒只能跑50次

_requestIdleCallback 用什么实现？
messageChannel
postMessage ?? 为了把任务放到 event-loop 的某个队列
最后为啥选择 messageChannel ?

but why not setTimeout?  有4ms 延迟

为什么要制定这4ms的延时
因为浏览器本身也是基于event loop的，所以如果浏览器允许0ms，可能会导致一个很慢的js引擎不断被唤醒，从而引起event loop阻塞，对于用户来说就是网站无响应，这是让人很难接受的。
所以chrome 1.0 beta限制为1ms。
但是后来发现1ms也会导致CPU spinning，计算机无法进入睡眠模式，经过多次实验后，Chrome团队选定了4ms，之后主流浏览器纷纷采用了这个4ms的设定。

why not rAF?
也有时间上的问题，执行权由浏览器决定，而且需要递归自身调用
----task queue-------|--------micro-tasks---------|--------render--------|
*/
//but why not setTimeout?  间隔时间 越往后越大
let start = +new Date();
let count = 0;
console.log("start", 0, 0);
function testSetTimeout() {
  setTimeout(() => {
    console.log("exec time", ++count, +new Date() - start);
    if (count === 50) return;
    testSetTimeout();
  });
}

testSetTimeout();

/*

why not generator? 
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator
https://github.com/facebook/react/issues/7942#issuecomment-254987818

why not web-worker?


数据传递用 web-worker 默认走一套结构化克隆算法，当数据量大的时候是非常消耗性能的
（history.pushState 里面的state 状态也是结构化克隆，属于深克隆）

https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage
> 将要发送到其他 window 的数据。它将会被结构化克隆算法序列化。 

*/
