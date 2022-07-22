# Vue 的 Diff 原理

1. 为什么需要 diff? 

数据 -> virtual dom -> 视图(DOM)

DSL: { type: 'div', props: {}, ...} -> DOM 结构

 - ans: 本质的原因是
  1. 通过一个虚拟 dom 的隔离来**减少我们实际操作 dom 的次数**这是其一
  2. 我们**通过架设一个中间层**，一个调用 DSL 描述整个 dom 结构，把我们原来开发的模式从原本直接操作 Dom 变成了通过框架提供的响应式方法来改变数据，数据最终会映射到树，然后经过 diff 等等流程渲染到视图。相**当于我们最终操作都是为了改 vdom 树，让我们解耦**。f(state) -> View

Svelte -> Rollup 作者

2. 为什么有 vdom?
我们用一个对象来描述了视图层和数据层这个中间结构，我们需要通过虚拟 DOM 的隔离来减少我们操作 DOM 产生的开销

现代前端也基于 vdom 变成如下的开发模式
f(state) -> View

并不能说 vdom 就快，参考[benchmark.js](https://github.com/bestiejs/benchmark.js)跑的效果，原生js比 Vue React 要快的。

3. 为什么原始 diff 的时间复杂 O(n^3) ?

衡量两个树、两个文本的异同，这里复杂度需要衡量的是【操作数】，借鉴的数学模型就是最短编辑距离
> 莱温斯坦最小边际距离[Levenshtein Distance] 也叫 Edit Distance
[最短编辑距离](./../../../%E7%AE%97%E6%B3%95/%E6%9C%80%E7%9F%AD%E7%BC%96%E8%BE%91%E8%B7%9D%E7%A6%BB.md)

vue借鉴了 [inferno](https://github.com/infernojs/inferno) 的diff

> InfernoJS: InfernoJS 是一个非常快的、类似 React 的库，用于在客户端和服务器上构建高性能用户界面。项目的主要目标是为 Web 应用程序提供尽可能快的运行时性能。Inferno 擅长渲染实时数据视图或大型 DOM 树。

inferno 能达到 O(mlogn) 最长上升子序列

回到问题本身，为什么是O(n^3) 实际上查找数本身的复杂度是O(n^2) ~ O(logn) 然后计算同层 m 最后, 复杂度是 O(mn^2) ~ O(mlogn) 传统比较需要跨层比较。到 React 优化成同层比较

4. how O(n)?

react 是怎么设计将复杂度降下来的？其实就是在算法复杂度、虚拟 dom 渲染机制、性能中找到一个平衡，react 采用了启发式的算法，做了如下最优假设：

a. 如果节点类型相同，那么以该节点为根节点的 tree 结构，大概率是相同的，所以如果类型不同，可以直接「删除」原节点，「插入」新节点
b. 跨层级移动子 tree 结构的情况比较少见，或者可以培养用户使用习惯来规避这种情况，遇到这种情况同样是采用先「删除」再「插入」的方式，这样就避免了跨层级移动
c. 同一层级的子元素，可以通过 key 来缓存实例，然后根据算法采取「插入」「删除」「移动」的操作，尽量复用，减少性能开销
d. 完全相同的节点，其虚拟 dom 也是完全一致的

基于这些假设，可以将 diff 抽象成只需要做同层比较的算法，这样复杂度就从指数曲线变成线性。


5. 
补充: 不管是 Vue 还是 React , 在写 v-for 这类遍历的时候一定是不建议用下标来做 key 的

vue 会判断 sameNode, 假如你删掉第一个，有可能是最后一个被删掉了。
[0, 1, 2] -> [0, 1] diff 一下发现下标2就是多余的，直接没了
[参考](Vue2.x核心模块源码/README.md/为什么不建议 v-key 使用 index?)

React 不会有vue这样的问题，但是它直接把整个数组父节点重新渲染了，所以也不建议用数组下标做key 

举个例子，假设原来有 [1, 2, 3] 三个子节点渲染了，假设我们这么操作了一波，将顺序打乱变成 [3, 1, 2]，并且删除了最后一个，变成 [3, 1]
那，最优的 diff 思路应该是复用 3, 1组件，移动一下位置，去掉 2 组件，这样整体是开销最小的，如果有 key 的话，这波操作水到渠成，如果没有 key 的话，那么就要多一些操作了:
a. 判断哪些可以复用，有 key 只需要从映射中康康 3, 1在不在，没有 key 的话，可能就执行替换了，肯定比「复用」「移动」开销大了
b. 删除了哪一个？新增了哪一个？有 key 的话是不是很好判断嘛，之前的映射没有的 key，比如变成 [3, 1, 4]那这个 4 很容易判断出应该是新建的，删除也同理
   但是没有 key 的话就麻烦一些了

那既然 key 很重要，那么就有两种操作是误区了
第一是使用随机数，这种导致的问题肯定就是每次 key 都不一样，那复用毛线，都是新建了
第二种是使用数组下标，这个就有意思了，看看这个 demo:https://codesandbox.io/s/ancient-moon-427u7?file=/src/App.vue，看看能不能看出问题

我们来分析一下vue：
[1, 2, 3] 这是原来的渲染节点，页面展示出 1, 2, 3，然后我们 splice(0, 1) 删除第一个元素后，理想情况是变成 [2, 3]
但是因为使用了下标为 key，对比前后两次 keys
[0, 1, 2] -> [0, 1] 
因为 vue 的机制，sameNode 判断一波后，误认为是 下标 2 的元素被删除了！
```js
 function sameVnode (a, b) {
  return (
    a.key === b.key &&  // key值
    a.tag === b.tag &&  // 标签名
    a.isComment === b.isComment &&  // 是否为注释节点
    // 是否都定义了data，data包含一些具体信息，例如onclick , style
   isDef(a.data) === isDef(b.data) &&  
    sameInputType(a, b) // 当标签是<input>的时候，type必须相同
  )
 }
 ```
 react 呢？
 还是给大家写个 demo: https://codesandbox.io/s/fervent-nightingale-b7slr?file=/src/App.js
 然后大家来分析分析，为啥？
 [a, b, c, d, e]
 [b, c, d, e]
 
 提示
 [0('a'), 1, 2, 3, 4] -> [0('b'), 1, 2, 3]
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
ps:理论上就是个**对象嵌套树**

2. 怎么创建虚拟 DOM

-> h、 createElement...

3. 使用
templete 语法

JSX:
```html
<div>
  <ul className='padding-20'>
    <li key='li-01'>this is li 01</li>
  </ul>
</div>
```


经过工具转换一下
createElement('div', {
  children: [
    createElement('ul', {
      className: 'padding-20'
    },createElement('li', {key:'li-01'}, 'this is li 01'))
  ]
})

4. 渲染(mount/render)

f(vnode) -> view
需要实现这个f
```jsx
f(vnode) {
  document.createElement();
  ...

  parent.insert() // parent 相当于 el
  .insertBefore.... //靠这个映射到真实dom
}

export const render = (vnode, parent) => { }

<div id='app'></div>
```
5. 最后到 diff 相关(patch)

f(oldVnodeTree, newVnodeTree, parent) -> 调度 ？ -> view

// TODO: vue 相关面试题合集
// TODO: 课件复习

## 参考资料
paper: https://grfia.dlsi.ua.es/ml/algorithms/references/editsurvey_bille.pdf
浏览器工作原理揭秘: https:/www.bilibili.com/video/av35265997/
Levenshtein: https://en.wikipedia.org/wiki/Levenshtein_distance
inferno: https://github.com/infernojs/inferno
启发式算法: https://www.zhihu.com/topic/19864220/hot
最长上升子序列算法: https://en.wikipedia.org/wiki/Longest_increasing_subsequence