# Vue 的 Diff 原理

1. 为什么需要 diff? 

数据 -> virtual dom -> 视图(DOM)

DSL: { type: 'div', props: {}, ...} -> DOM 结构

 - ans: 本质的原因是
  1. 通过一个虚拟 dom 的隔离来减少我们实际操作 dom 的次数这是其一
  2. 我们通过架设一个中间层，一个调用 DSL 描述整个 dom 结构，把我们原来开发的模式从原本直接操作 Dom 变成了通过框架提供的响应式方法来改变数据，数据最终会映射到树，然后经过 diff 等等流程渲染到视图。相当于我们最终操作都是为了改 vdom 树，让我们解耦。f(state) -> View


2. 为什么有 vdom?
我们用一个对象来描述了视图层和数据层这个中间结构，我们需要通过虚拟 DOM 的隔离来减少我们操作 DOM 产生的开销

现代前端也基于 vdom 变成如下的开发模式
f(state) -> View

[benchmark.js](https://github.com/bestiejs/benchmark.js)

3. 为什么原始 diff O(n^3)?

莱温斯坦最小边际距离[Levenshtein Distance]

vue借鉴了 [inferno](https://github.com/infernojs/inferno) 的diff

> InfernoJS: InfernoJS 是一个非常快的、类似 React 的库，用于在客户端和服务器上构建高性能用户界面。项目的主要目标是为 Web 应用程序提供尽可能快的运行时性能。Inferno 擅长渲染实时数据视图或大型 DOM 树。

补充: 不管是 Vue 还是 React , 在写 v-for 这类遍历的时候一定是不建议用下标来做 key 的

vue 会判断 sameNode, 假如你删掉第一个，有可能是最后一个被删掉了。
[参考](Vue2.x核心模块源码/README.md/为什么不建议 v-key 使用 index?)


## 这里插入一条说烂了的面试题，[v-key](https://cn.vuejs.org/v2/api/#key) 的作用是什么？

key: 特殊 attribut 主要用在 Vue 的Vdom 算法， 在新旧 nodes 对比时辨识 VNodes, 如果不使用key, Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改、复用相同类型元素的算法。





## 虚拟 DOM 5 步创建虚拟dom diff 方法
1. 什么是 ？

-> {} -> Tree

e.g
{
  type: 'div',
  props: {
    children: [

    ]
  },
  el: xxx
}
理论上就是个对象嵌套树

2. 怎么创建虚拟 DOM

-> h、 createElement...

3. 使用
templete 语法

JSX

createElement()

4. 渲染(mount/render)

5. diff 相关(patch)

f(oldVnodeTree, newVnodeTree, parent) -> 调度 ？ -> view

// TODO: vue 相关面试题合集
// TODO: 课件复习