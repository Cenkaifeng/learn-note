

React 一直强调的理念：

基于函数思想，践行代数效应 `v = f(d)`
代数效应：解决副作用
hooks

原理: 调度 & Vdom

### React 解决了什么问题？
异步

* cpu的瓶颈
* IO 的瓶颈（）
* Vdom 快么？


### React Hooks 的开发体验问题逐渐被正视

* Hooks 执行原理和原生 JS 心智模型的差异
* 不能条件式调用
* Stale Closure（过期闭包）的心智负担
* 必须手动声明 useEffect 依赖
* 如何“正确”使用 useEffect 是一个复杂的问题
* 需要 useMemo / useCallback 等手动优化 


### React 和 Vue 的差异

React 纯运行时
Vue 可选编译 + 运行时
模板 VS 渲染函数
1. 本质不同 
2. 表现能力不同，vue 语法糖比 react 多很多
3. vue 代码一致性比较弱，很多条路径达成同一个效果  v-model，单向数据流, 所以需要小团队用【约定大于规范】来进行约束
4. 性能，compiler 优化