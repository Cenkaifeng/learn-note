# 高频前端面试题

1. 和前端技术相关的代码题 / 数据格式转换
2. 纯算法题

## 前端技术相关

### 1. 你了解Vue的双向绑定原理吗？

所谓的双向绑定简历在 MVVM 的模型基础上的：

* 数据层 Model:应用的数据以及业务逻辑
* 视图层 View: 应用的展示效果，各类的UI组件等
* 业务逻辑层 ViewModel: 负责将数据和视图关联起来

1. 数据变化后更新视图
2. 视图变化后更新数据

包括两个主要的组成部分

* 监听器 Observer: 对所有的数据属性进行监听
* 解析器 Compiler: 对每个元素节点的指令进行扫描和解析，根据指令替换数据，绑定对应的更新函数

#### 具体的实现原理

1. new Vue() 执行初始化，对data通过Object.defineProperty 进行像樱花处理，这个过程发生在Observer中。没一个key都会有一个dep实例来存储watcher实例数组。
2. 对模板进行编译时，v-开头的关键词作为指令解析，找到动态绑定的数据。从data中获取数据并初始化视图，这个过程发生在 Compiler中，如果遇到了v-model,就会监听input事件，更新data对应的数值。
3. 在解析指令的过程中，会定义一个更新函数和Watcher,之后对应的数据变化时 Watcher 会调用更新函数。new Watcher 的过程中回去读取 data 的 key,触发getter的依赖收集，将对应的watcher添加到dep里。
4. 将来data中数据一旦发生变化，会首先找到对应的dep,通知所有的watcher执行更新函数


#### Coding

1. 来简单实现一个响应式函数？对对象内的所有key添加响应式的特性。

2. vue 对数组类型是怎么处理的？你能简单模拟一下么？

3. 能否监听对象属性的删除操作？基于proxy实现以下响应式。

### 2. 你了解虚拟DOM吗？能说一下他的优缺点吗？

对于真是DOM的抽象，用嵌套对象表示，用属性来描述节点，最终通过一系列的操作映射到真实dom上。

#### 优点
1. 保证性能的下限

在不进行手动优化的前提下，也能提供过得去的性能

2. 无需手动操作dom

3. 跨平台

虚拟dom本质上其实就是一个js对象，它可以很方便的跨平台，比如服务端渲染 比如uniapp

#### 缺点

* 首次喧嚷大量dom的时候，由于多了一层虚拟DOM计算，回避innerHTML的插入速度慢
* 做一些针对性优化的时候，真实dom的操作还是更快一点的。

#### Coding

1. 给你一段数据结构，将其转换为真实的dom

#### Coding

1. 具体如何让一个对象可遍历呢？

2. JSON.stringify 会忽略 symbol? 除了这个，还会忽略什么呢？

3. 如果对象有循环引用，可以用 JSON.stringify 来处理吗？

4. 确定是 stringify 会报错，而不是 parse 会报错吗？

5. 实现一个深拷贝

### 4. 平时都如何判断对象类型的呀？，分别适合哪些场景呢？

* typeof
* instanceof
* Object.prototype.toString.call(obj)
* Array.isArray

#### Coding

1. 实现一个`instanceof`

## 算法相关

二叉树层序遍历相关的各种变形