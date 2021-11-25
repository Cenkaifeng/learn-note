# Vue.js v2.x核心模块源码解析 - 云隐主讲

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
TODO: 为什么不建议使用 $set? 会在什么场景需要使用？ 替代方案是什么？
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




## Part2 深入原理

### 2-1：数据驱动、数据更新

```js
// 我们首先在实例化过程中会先做实例挂载
if(vm.$options.el) {
  vm.$mount(vm.$options.el)// 这里的el 一般来说是实例化里的 #app
}
```

###### 面试题6： vue 的实例为何不能挂载在body或者html根节点上，如果挂了会报错吗？
会报错，非生产环境下会报错：
> Do not mount Vue to <html> or <body> - mount to normal elements instead.
因为后续vnode 节点更新是对原本挂载节点的替换，如果挂载在根节点会对原本节点的结构造成破坏。

**$mount 做了什么？**

简单来讲就是，把实例上的 `render` 或者 `template` 或者是 `el` 节点统一转化成render方法然后挂载在 `options` 上。
**SFC 最后会汇合成render方法**
`entry-runtime-with-compiler.js`

```js
if(!options.render){...
  // 里面还有 if(template) 这种细节判断
  ...
  const { render, staticRenderFns} = compileToFunctions(template, {
    ...
  }, this)
  options.render = render
  options.staticRenderFns = staticRenderFns
}
```
[!-_- 懒得写了 上这里找吧](https://github.com/vuejs/vue/blob/dev/src/platforms/web/entry-runtime-with-compiler.js)

延伸：runtime/index.js 里有 Vue.prototype.$mount 方法，为什么要在 `entry-runtime-with-compiler.js` 覆写一份？
因为不同的模式下，前者能被 runtime only 这个模式直接使用 主要用了 `mountComponent`。

同样的设计方式可以在未来项目设计、多平台多端设计做类似的抽象，分基础方法和复杂方法。

然后底层还是调用 `createElement` 唯一区别是模板调用最后传参 false 手写 render 后面是 true
```js
// https://github.com/vuejs/vue/blob/dev/src/core/instance/render.js
vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)

vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)
// createElement 内对子节点也做了一些规范，然后根据节点打tag.... new vNode
// 内置节点直接创建 vNode 已注册组件名用createComponents 创建组件，未知：创建一个位置标签类型（vNode)
```

###### 面试题7： beforeMount 和 mounted 之间做了什么？

```js
// 接着前面调用$mount() 挂载后
// call beforeMount
new Watcher();
// call mounted
```
Watcher 内回调使用了 `updateComponent` 其中使用了两个方法
- `vm._update`: 更新、生成 dom （写在` lifecycle.js` 中，因为整个生命周期中会不断调用）
  - `vm.__patch__` : `patch.js` 中有接个关键步骤
    - createElm : 生成实际dom
      - native dom createElement (调用原生，生成实际dom)
    - createChildren 遍历子节点（每个子节点遍历的调用createElm）ps. 这里会执行 `invokeCreateHooks(vnode, insertedVnodeQueue)` 在生成dom后会触发这个queue里的所有东西，所有 nextTick 里的东西就是这个时候被调用的(callbackQueue)
- `vm._render`: 生成vdom
```js
updateComponent = () => {
  vm._update(vm._render(), hydrating);// 这里可以看出用了虚拟vdom作为参数生成实际dom
}
```


###### 面试题： 什么是虚拟节点，简述一下虚拟dom构成？vue 和 react 虚拟dom的区别？
1. 虚拟节点是一种对真实dom的抽象描述，把dom的一些真实定义做了描述。  
2. 这些描述性的东西，类似metadate ,有自己的规范

ps: 源码阅读小技巧，从模块返回值开始往回找。



### 2-2：组件化

- 组件渲染
  - createComponet `core/vdom/create-components.js`
    - new vNode(... 中间很多特异化参数)

- 组件配置
  - mergeOptions
  - initInternalComponent 内部组件的初始化
  ```js
  //https://github.com/vuejs/vue/blob/dev/src/core/instance/init.js
  
  vm._isVue = true
  if (options && options._isComponent) {
    initInternalComponent(vm, options) 
  } else {
    vm.$options = mergeOptions(
      resolveConstructorOptions(vm.constructor),
      options || {},
      vm
    )
  }
  // 具体可以看 core/util/options.js
  ```

### 2-3：响应式原理

###### 面试题: 对于被监听数据他的`__ob__`是在什么时候被加上的？
在执行 Observer 方法时候、或者说 defineReactive 的时候添加的
```js
//https://github.com/vuejs/vue/blob/dev/src/core/instance/observer/index.js G:46
def(value, '__ob__', this) // def 也是一个 defineReactive 简化版的
```
作用是：告诉我们当前的组件，这个数据是被监听了的。

- 依赖收集
  1. initState => initProps/ initData;
  2. defineReactive 可以看做是对 defineProperty 高等级的封装 
    ```js
    //https://github.com/vuejs/vue/blob/dev/src/core/instance/observer/index.js G:135
    ```
     1. 依赖：new Dep() // dependencies
     2. 观察：observe `let childOb = !shallow && observe(val)` 
      - new Watcher
        - pushTarget()
        - depend => addDep
          - 把 this 挂载到 Dep 的 subs 列表
          - 通过 dependArray 把子元素不断挂载监听

Dep 如何维护全局唯一性的？
用静态属性 target

- 派发更新
  - dep.notify() // defineReactive 中的set
    - 执行subs 中每个watcher.update()
    ```js
      /**
       * Subscriber interface.
       * Will be called when a dependency changes.
       */
      update () {
        /* istanbul ignore else */
        if (this.lazy) {
          this.dirty = true
        } else if (this.sync) {
          this.run()
        } else {
          queueWatcher(this)
        }
      }
    ```

  - 派发更新本质是调用 queueWatcher
    他不会在每个节点更新的时候立即更新，他会把需要更新的若干更新放到队列里，是vue中一个很厉害的优化点。
    最后指向 vm._update() //形成循环


#### dom diff



#### 了解 computed 缓存的实现和原理么？

#### 为什么不建议 v-key 使用 index?
https://juejin.cn/post/6844903577215827982
key的作用主要是为了高效的更新虚拟DOM。另外vue中在使用相同标签名元素的过渡切换时，也会使用到key属性，其目的也是为了让vue可以区分它们，否则vue只会替换其内部属性而不会触发过渡效果。

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

TODO： 根据文档再走一遍源码流程。