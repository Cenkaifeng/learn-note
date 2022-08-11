

// 文件同 ../miniReact
// jsx -- babel plugin 插件
// eg const Empty = <div className='empty'></div>
// -> createElement('div', {}, [])

const isArr = Array.isArray;
const toArray = arr => isArr(arr ?? []) ? arr : [arr];
const isText = txt => typeof txt === 'string' || typeof txt === 'number';
const flatten = arr => 
  [...arr.map(ar => isArr(ar) 
    ? [...flatten(ar)] 
    : isText(ar) ? createTextVNode(ar) : ar)]

    //<div className='empty'>hello wrld!</div>
    // babel-plugin-jsx-transform -> h('div', {className: 'empty'}, 'hello wrld!')
export function h(type, props, ...kids) {
  props = props ?? {};
  kids = flatten(toArray(props.children ?? kids)).filter(Boolean);
  if(kids.length) props.children = kids.length === 1 ? kids[0] : kids;// React child可以是一个数组或对象

  const key = props.key ?? null;
  const ref = props.ref ?? null;

  delete props.key; // 性能
  delete props.ref;

  return createVNode(type, props, key, ref);
}

function createTextVNode(text) {
  return {
    type: '',
    props: { nodeValue: text + ''}
  }
}

function createVNode(type, props, key, ref) {
  return {
      type, props, key, ref 
  }
}

export function Fragment(props) {
  return props.children
}


// scheduler
/**
 * sheduler -> 把任务放进一个队列，然后开始（以某种节奏[ric (requestIdleCallback)]执行）
 * -> 还可以拆成：两步 pushTask, schedule
 * shouldYield -> should yield -> generator yield (本质上是一个返回 true / false 的函数)
 */
const queue = []
const threshold = 1000 / 60

// git transtions
const transtions = []
let deadline = 0

const now = () => performance.now();
const peek = arr => arr[0];

export function schedule(cb) {
  queue.push({ cb });

  //...todo
  startTranstion(flush)
}

//requestIdleCallback 的最小实现
function flush() {
  deadline = now() + deadline
  let task = peek(queue)

  // shouldYield 表示要不要把控制权交还给主浏览器
  while(task && !shouldYield()) {

  }

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

but why not setTimeout? 

why not rAF?
也有时间上的问题，执行权由浏览器决定，而且需要递归自身调用
----task queue-------|--------micro-tasks---------|--------render--------|
*/
//but why not setTimeout?  间隔时间 越往后越大
let start = + new Date();
let count = 0;
console.log('start', 0, 0)
function testSetTimeout() {
  setTimeout(() => {
    console.log('exec time', ++count, +new Date() - start);
    if(count === 50) return
    testSetTimeout();
  })    
}


testSetTimeout()

/*

why not generator? 
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator
https://github.com/facebook/react/issues/7942#issuecomment-254987818

why not web-worker?


数据传递用 web-worker 默认走一套结构化克隆算法，当数据量大的时候是非常消耗性能的
（history.pushstate 里面的state 状态也是结构化克隆，属于深克隆）

*/