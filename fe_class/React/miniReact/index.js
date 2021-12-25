// createElement
// jsx 一个语言，把你的js和传统的Dom混合起来用，这也是 React 不能像 Vue 那样做预编译的主要原因

const isArr = Array.isArray;
const toArray = arr => (isArr(arr ?? []) ? arr : [arr]);
const isText = txt => typeof txt === "string" || typeof txt === "number";
const flatten = arr => [
  ...arr.map(ar =>
    isArr(ar) ? [...flatten(ar)] : isText(ar) ? createTextVNode(ar) : ar
  ),
];

export function h(type, props, ...kids) {
  props = props ?? {}; // 类似 || 区别是不会像 || 一样进行空值转换 (不会屏蔽掉false和 0)
  kids = flatten(toArray(props.children ?? kids)).filter(Boolean);

  if (kids.length) props.children = kids.length === 1 ? kids[0] : kids;

  const key = props.key ?? null;
  const ref = props.ref ?? null;

  delete props.key;
  delete props.ref;
  // 把 key ref 放 vnode 外层
  return createVNode(type, props, key, ref);
}

function createTextVNode(text) {
  //为啥要专门用一个方法处理文本节点？让文本转换成为对象挂上 VNode
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

// scheduler  React 的调度
// React 的调度器是基于 IDLE -- requestIdleCallback 时间切片实现的调度器
// 但是 React 最终没有用 requestIdleCallback api 而是自己实现了一个？
// 1. 兼容性 2. 50Hz 渲染问题（最终弃用原因）
// 50毫秒 1000/50 相当于每次有 20ms, 如果切片太复杂， 20ms 就会让用户觉得卡顿了。

// postMessage ?? event-loop

// ----task queue-------|--------micro-tasks---------|--------render--------|
