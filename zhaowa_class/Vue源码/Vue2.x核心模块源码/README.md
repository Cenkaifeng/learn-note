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

#### core: vue核心代码
vue实例
内置组件
全局api封装
观察者模式
vdom
...

为什么 core/instance/index.js function Vue(){} 用了函数对象而非class?
除了可读性易读性之外，后续会在Vue的prototype上进行拓展，用函数对象更方便可读，以及拓展

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

###### 面试题4
props 和 data 是如何把属性挂载在vm上？
core/instance/state.js 中挂载

通过 proxy() 代理 vm._props.xxx => vm.xxx 直接访问
vm是当前实例

    if (!(key in vm)) {
      proxy(vm, `_props`, key)
    }


##### initState

1. $set
   1. 会调用 set 方法，会把对象遍历一般。
2. $delete
3. $watch: 新建watcher 实例，对特定目标进行观察
   1. watcher
   2. 依赖搜集
4. $data
5. $props
###### 面试题5：vm.$option
为什么data是函数，而components是对象？
用新的实例做数据隔离
components本质是一个对象出现在相同区域，参数不会冲突 // TODO: 二刷


##### eventMixin
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



### 深入原理

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

