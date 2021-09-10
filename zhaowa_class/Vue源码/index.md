1. 为什么需要 diff?


数据 -> virtual dom -> 视图(DOM)
2. 为什么有 vdom?
我们需要通过虚拟 DOM 的隔离来减少我们操作 DOM 产生的开销

现代前端也基于 vdom 变成如下的开发模式
f(state) -> View


补充: 不管是 Vue 还是 React , 在写 v-for 这类遍历的时候一定是不建议用下标来做 key 的

key: 特殊 attribut 主要用在 Vue 的Vdom 算法， 在新旧 nodes 对比时辨识 VNodes, 如果不使用key, Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改、复用相同类型元素的算法。

vue 会判断 sameNode, 假如你删掉第一个，有可能是最后一个被删掉了。