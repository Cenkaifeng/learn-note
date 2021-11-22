# Vue.js v2.x核心模块源码解析 - 云隐

[](./1634991014692.jpg);
###### 面试题1：
mvvm的原理或者核心模式是什么（开放式）

  观察者、发布订阅模式
  可以看看新老框架例子

观察者模式的实现、如何实现响应式？

### 入口源码源码

- 六大模块

#### compiler:编译相关
目录中包含所有vue编译相关的模块
render 
离线编译
运行时编译

###### 面试题2：
<template> 和 render() 它们是怎么生成dom?
  都会转成 render() 
  template 中有很多优化算法，框架作者更推荐用template这块

###### 面试题x：
在vue-cli新建项目的时候，runtime only or runtime + compiler ,这两个版本有什么区别？分别在哪个文件里做了区分，到底有何区别？
https://www.jianshu.com/p/466510d84e36
#### core: vue核心代码
vue实例
内置组件
全局api封装
观察者模式
vdom
...

##### 小问题1
为什么 core/instance/index.js function Vue(){} 用了函数对象而非class?

除了可读性易读性之外，后续会在Vue的prototype上进行拓展，用函数对象更方便可读，以及拓展。

##### 小问题2
为何要单独抽离以下几个流程？
```js
initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMinxin(Vue);
```
不仅仅是初始化流程，还生成了 vue 必要的参数属性。

##### initMixin: 
1. _init mergeOptions把外部传参和内部参数做了一个合并挂载
2. _init init 初始化
   1. lifeCycle
   2. events
   3. render
   4. inject
   5. state
   6. provider

###### 面试题3
beforeCreate 和 created 之间做了什么？
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')


###### initState
```js
export function initState(vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if(opts.props) initProps(vm, opts.props)
  if(opts.methods) initMethods(vm, opts.methods)
  if(opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true)
  }
  if(opts.computed) initComputed(vm, opts.computed)
  if(opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm. opts.watch)
  }
}
```
1. $set
   1. 会调用 set 方法，会把对象遍历一般。
2. $deletegit
3. $watch: 新建watcher 实例，对特定目标进行观察
   1. watcher
   2. 依赖搜集
4. $data
5. $props

###### 面试题4
props 和 data 是如何把属性挂载在vm上？
core/instance/state.js 中挂载

通过 proxy() 代理 vm._props.xxx => vm.xxx 直接访问
vm是当前实例
```js
if (!(key in vm)) {
  proxy(vm, `_props`, key)
}
```
这个地方重点是 `initProps(vm, opts.props)` 和 `initData(vm)`
1. **看完就会发现一个共同点就是，他们都会在内部调用`defineReactive(props, key, value, ()=>{})`来做数据的响应式处理**
2. 通过 `proxy()` 这个工具函数 将`vm._props.xxx => vm.xxx ` 直接访问，...就是写的时候能直接用 `this.xxx`这样的写法调用 props 传参

###### initProvide
provide 本身是挂载在 vm.$options 下的，也没啥说的
```js
export function initProvide(vm: Component) {
  const provide = vm.$options.provide
  if(provide) {
    vm._provide = typeof provide === 'function'
      ? provide.call(vm)
      : provide
  }
}
```
**补充 inject:注入、provide 提供**
当两个组件之间没有亲戚关系的时候可以使用这种方式进行传参（$emit 也可以）

###### 面试题5：vm.$option
Q: 为什么data是函数，而components是对象？
因为，如果用对象，同一个vm实例，用同名的变量会同时引用造成污染，用函数相当于形成新的实例做data数据隔离.
components本质是一个相同组件在不同状态下出现在相同区域，组件是通过传参的方式来区分当前状态的。参数不会冲突就不会报错，所以components可以是对象，他本身就引用的同一个组件。// TODO: 三刷

Q:data 函数如果没有返回值会报错吗？
A:会（框架报错）

##### stateMixin
// TODO: 为什么不建议使用 $set? 会在什么场景需要使用？ 替代方案是什么？
$set 
$delete
$watch
  watcer
  依赖收集（new dep())
$data
$props

##### eventMixin
对应事件分发功能
1. $on
2. $once
3. $off
4. $emit


##### lifecycleMixin

  _update // 虚拟节点
  \__patch__ //重布局

1. _update
2. $forceUpdate
3. $destroy

###### 面试题6： beforeDestroy 和 destroyed 之间做了什么？
```js
    callHook(vm, 'beforeDestroy')
    vm._isBeingDestroyed = true
    // remove self from parent
    const parent = vm.$parent
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm)
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown()
    }
    let i = vm._watchers.length
    while (i--) {
      vm._watchers[i].teardown()
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--
    }
    // call the last hook...
    vm._isDestroyed = true
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null)
    // fire destroyed hook
    callHook(vm, 'destroyed')
```


##### renderMixin

1. $nextTick
   1. 执行本次渲染后的回调队列
   它是怎么实现的？其实就是把cb 放到一个队列里，用`flushCallbacks`包装微任务或者宏任务在渲染回调的时候执行。
   使用风险是什么？
2. _render

installRenderHelpers 迟加载用途
1. sdk
2. initApp
3. ui components 
   总而言之就是一个延迟加载，减少用户感知的加载时间

#### platform 跨平台代码
web
weex(跨端跨平台)

#### server 服务端渲染




#### sfc .vue 文件的一个解析器
parser

#### shared 共享工具方法（与模块内的 utils 文件隔离开）



## 深入原理

#### 数据驱动

###### 面试题6： vue 的实例为何不能挂载在body或者html根节点上，如果挂了会报错吗？

###### 面试题7： beforeMount 和 mounted 之间做了什么？

###### 面试题： 什么是虚拟节点，简书虚拟dom构成？vue 和 react 虚拟dom的区别？
- 虚拟节点是一种对真实dom的抽象描述，吧dom的一些真实定义做了描述。  

ps: 小技巧，从模块返回值开始往回找。

#### 组件化

- 组件渲染
- 组件配置


#### 响应式原理
- 依赖收集
  1. initState => initProps/ initData;
  2. defineReactive 
     1. 
面试题: 对于被监听数据他的`__ob__`是在什么时候被加上的？

- 派发更新


#### dom diff

#### 了解 computed 缓存的实现和原理么？


#### 补充：

- 不同项目的初始化的区别：

  1. 流式初始化，初始空对象然后不断在空对象中添加东西。
问题：项目变大后会不好维护

  2. 引用挂载初始化，类似Vue2. 先声明一个函数对象，将需要初始化的东西引用挂载在初始函数对象后，在 export default出去。 然后再从外侧引入内侧core/index.js 中的代码再次做内容修饰再暴露出来。
好处：最核心的东西抽象出来，不需要再做更多改动。好处是固定最小模块。

- 什么情况下会出现堆溢出？
对象过大

#### 考点拓展：

1. computed & watch 监听了什么，做了什么事？