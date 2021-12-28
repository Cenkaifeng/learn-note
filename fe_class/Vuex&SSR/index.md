# Vuex



### 中心化与去中心化

去中心化：
  不用规整到一个根节点 



## 关于状态管理的一点思考 



> 首先抛出一些问题，什么是状态？为什么要管理？怎么去管理？

我的理解: 状态管理是一种对通用数据的一种抽象，目的是为了数据的同构性、一致性、便捷性的实现。

`UI = f(state)`,视图通过底层框架 (`vue`, `react` 等提供的能力) 根据状态进行驱动

 
往细了看

状态大致可以分为两类，**本地状态**和**共享状态**

本地状态就是 `vue` 中的 `data`，`react`中的 `state`，这里我们一般会用来控制弹窗的现实隐藏、`loading`效果等

共享状态其实是最头疼的问题，但又是最常见的场景，业务中肯定会出现大量需要兄弟节点通信、祖孙节点通信等情况的场景，通信的目的是为了状态分享，虽然可以通过一些方式，比如回调函数等手段实现，但都不是最佳实践

> 一般情况下，你不需要什么状态管理工具，简单是避免麻烦的最佳实践，当你的应用膨胀到你已经无法理顺状态流的时候，才是你考虑使用状态管理工具的时机
>
> 项目的复杂度和组件层次结构的复杂性是衡量是否使用状态管理工具的标准，这多多少少取决于经验



面临的问题

状态管理的方式：中心化和去中心化两种模式

`Dan` 曾经说过 `SPA` 应用最佳实践是分为容器组件和展示组件，通过 `props` 向下传递状态，这样分层之后的好处显而易见，只需要维护好容器组件内的状态就行，展示组件和业务逻辑解耦，但是真的是这样吗？分析公司内的项目代码，大家可能会发现，经常出现层级嵌套个5-6层的页面，这么传下去谁也不敢保证中间环节不出什么问题，还是做不到单一，解耦。

所以 `Flux` 架构及其追随者 `Redux` `Vuex`被提出，主要思想是**应用的状态被集中存放到一个仓库中，但是仓库中的状态不能被直接修改**，**必须通过特定的方式**才能更新状态

这样，当我们完全控制了状态的改变，我们可以很容易的追踪状态的变化也让应用开发更容易调试。使用开发者工具我们不仅可以检查状态的变化，甚至可以回到上个状态（类似时间旅行）

> 但是这种模式下写的代码真的很恶心



状态划分

状态划分的粒度可大可小，`react` 社区最新的状态管理工具[`recoil`](https://github.com/facebookexperimental/Recoil) 从原子粒度 `atom` 来划分。

对我们而言，什么方式才是最好的呢？

有团队区分业务型和视觉模型，直白的说就是如视图控制的状态归一，业务逻辑相关的归一，看似美好且清爽，在实际业务实践下仍然有很大的难度，区分好模型完全靠经验，状态分的太多了共享，复用也是问题

我目前比较倾向于领域模型的方式，可参考[DDD 美团实践](https://tech.meituan.com/2017/12/22/ddd-in-practice.html)



理想的状态管理工具需要解决的问题

1. 状态更新的设计，`API` 足够少，且简单
2. 如何共享状态
3. 状态提升
4. 状态下降
5. 同步、异步的处理
6.  持久状态和临时状态如何区分维护
7.  状态更新的事务如何管理
8. 去中心化
9. ...

总的来说，这仍然是一个有很大空间的方向



## Vuex 原理



> 因为课程长度原因，且实践部分大多比较基础，VUEX 的实践部分就不做探究了，给大家找了一个实践代码项目，一本小册，看完基本从基础到高阶都可以掌握，看完之后搭配着原理分析更香
>
> [vue-vuex 最佳实践](https://github.com/weipxiu/Vue-vuex)
>
> [vuex 最佳实践](https://bigdata.bihell.com/language/javascript/vue/vuex.html#%E4%B8%80%E3%80%81vuex%E5%88%B0%E5%BA%95%E6%98%AF%E4%B8%AA%E4%BB%80%E4%B9%88%E9%AC%BC)



#### vuex 核心原理分析

[源代码地址](https://github.com/vuejs/vuex/tree/dev/src)

我们不直接硬生生的去分析源码，现在希望大家抛掉对 `vuex` 的所有记忆，让我们回到几年前`vuex`诞生的那个时间点，从头开始去思考基于 `FLUX` 思想，如何打造一个我们自己的状态管理工具

a. 站在`FLUX` 的角度去思考

在开发中面临最多的场景是状态重复但是不集中

```vue
// a.vue
<h1>{{ username }}</h1>

// b.vue
<h2>
  {{ username }}
</h2>

/**
* 如果 username 需要在每个组件都获取一次，是不是很麻烦，虽然可以通过共同的父级传入，但是不都是这种理想情况
*/
```

这里其实就出现了状态重复的问题，在不同的组件中依赖了同样的状态，重复就会导致不对等的风险，基于 `FLUX` 的思想，我们设计的状态管理将是中心化的工具，也就是集中式存储管理应用的所有组件的状态，大白话，就是将所有的状态放在一个全局的 `Tree` 结构中，集中放在一起的好处是可以有效避免重复的问题，也更好的管理，将状态和视图层解耦



> TJ 原来说过我的状态管理就是 {}，对中心化的管理工具来说，不就是这样嘛😂



b. 如何去更改状态

自由即代表了混乱，`FLUX` 推崇以一种可预测的方式发生变化，而且有且唯一一种，这样的好处是所有的行为可预测，可测试，对于之后做个` dev-tool` 去调试、时间旅行都很方便，现在的问题就是要去思考同步和异步的问题了，为了区分的更清楚，我们定义两种行为，`Actions` 用来处理异步状态变更（内部还是调用 `Mutations`），`Mutations` 处理同步的状态变更，整个链路应该是一个闭环，单向的，完美契合 `FLUX` 的思想

「页面 dispatch/commit」-> 「actions/mutations」-> 「状态变更」-> 「页面更新」-> 「页面 dispatch/commit」...



现在，可以借用这个图了

![vuex](https://i1.wp.com/user-gold-cdn.xitu.io/2020/4/2/171396e1d42df794?w=701&h=551&f=png&s=30808)

c. 如何和 `vue` 集成呢？

插件呀～这样可以和 `vue` 集成在一起，通过 `mixin` 将 `$store` 这样的快速访问 `store` 的快捷属性注入到每一个 `vue` 实例中

> [开发 vue 插件](https://cn.vuejs.org/v2/guide/plugins.html)



d. 怎么让 `store` 是响应式的呢？

利用 `vue` `data` 里的状态是响应式的啊～




# Vuex 手写实现

e. 开始撸码



Step1 - store 注册

```js
/**
* store.js - store 注册
*/
let Vue

// vue 插件必须要这个 install 函数
export function install(_Vue) {
  // 拿到 Vue 的构造器，存起来
  Vue = _Vue
  // 通过 mixin 注入到每一个vue实例 👉 https://cn.vuejs.org/v2/guide/mixins.html
  Vue.mixin({ beforeCreate: vuexInit })
  
  function vuexInit () {
    const options = this.$options
    // 这样就可以通过 this.$store 访问到 Vuex 实例，拿到 store 了
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store
    }
  }
}
```



Step2 - 响应式

```js
/**
* store.js - 实现响应式
*/
export class Store {
  constructor(options = {}) {
    resetStoreVM(this, options.state)
  }
  
  get state () {
    return this._vm._data.$$state
  }
}

function resetStoreVM(store, state) {
  // 因为 vue 实例的 data 是响应式的，正好利用这一点，就可以实现 state 的响应式
  store._vm = new Vue({
    data: {
      $$state: state
    }
  })
}
```



Step3 - 衍生数据

```js
/**
* store.js - 衍生数据（getters）
*/
export class Store {
  constructor(options = {}) {
    
    const state = options.state
    
    resetStoreVM(this, state)
    
    // 我们用 getters 来收集衍生数据 computed
    this.getters = {}
    
    // 简单处理一下，衍生不就是计算一下嘛，传人 state
    _.forEach(this.getters, (name, getterFn) => {
      Object.defineProperty(this.getters, name, {
        get: () => getterFn(this.state)
      })
    })
  }
  
  get state () {
    return this._vm._data.$$state
  }
}

function resetStoreVM(store, state) {
  store._vm = new Vue({
    data: {
      $$state: state
    }
  })
}
```



Step4 - Actions/Mutations

```js
/**
* store.js - Actions/Mutations 行为改变数据
*/
export class Store {
  constructor(options = {}) {
    
    const state = options.state
    
    resetStoreVM(this, state)
    
    this.getters = {}
    
    _.forEach(options.getters, (name, getterFn) => {
      Object.defineProperty(this.getters, name, {
        get: () => getterFn(this.state)
      })
    })
    
    // 定义的行为，分别对应异步和同步行为处理
    this.actions = {}
    this.mutations = {}
    
    _.forEach(options.mutations, (name, mutation) => {
      this.mutations[name] = payload => {
        // 最终执行的就是 this._vm_data.$$state.xxx = xxx 这种操作
        mutation(this.state, payload)
      }
    })
    
    _.forEach(options.actions, (name, action) => {
      this.actions[name] = payload => {
        // action 专注于处理异步，这里传入 this，这样就可以在异步里面通过 commit 触发 mutation 同步数据变化了
        action(this, payload)
      }
    })
  }
  
  // 触发 mutation 的方式固定是 commit
  commit(type, payload) {
    this.mutations[type](payload)
  }
  
  // 触发 action 的方式固定是 dispatch
  dispatch(type, payload) {
    this.actions[type](payload)
  }
  
  get state () {
    return this._vm._data.$$state
  }
}

function resetStoreVM(store, state) {
  store._vm = new Vue({
    data: {
      $$state: state
    }
  })
}
```



Step5 - 分形，拆分出多个 Module

```js
// module 可以对状态模型进行分层，每个 module 又含有自己的 state、getters、actions 等

// 定义一个 module 基类
class Module {
	constructor(rawModule) {
    this.state = rawModule || {}
    this._rawModule = rawModule
    this._children = {}
  }
  
  getChild (key) {
    return this._children[key]
  }
  
   addChild (key, module) {
    this._children[key] = module
  }
}

// module-collection.js 把 module 收集起来
class ModuleCollection {
  constructor(options = {}) {
    this.register([], options)
  }
  
  register(path, rawModule) {
    const newModule = new Module(rawModule)
    if (path.length === 0 ) {
      // 如果是根模块 将这个模块挂在到根实例上
      this.root = newModule
    }
    else {
      const parent = path.slice(0, -1).reduce((module, key) => {
        return module.getChild(key)
      }, this.root)
      
      parent.addChild(path[path.length - 1], newModule)
    }
    
    // 如果有 modules，开始递归注册一波
    if (rawModule.modules) {
      _.forEach(rawModule.modules, (key, rawChildModule) => {
        this.register(path.concat(key), rawChildModule)
      })
    }
  }
}

// store.js 中
export class Store {
  constructor(options = {}) {
    // 其余代码...
    
    // 所有的 modules 注册进来
    this._modules = new ModuleCollection(options)
    
    // 但是这些 modules 中的 actions, mutations, getters 都没有注册，所以我们原来的方法要重新写一下
    // 递归的去注册一下就行了，这里抽离一个方法出来实现
    installModule(this, this.state, [], this._modules.root);
  }
}

function installModule(store, state, path, root) {
  // getters
  const getters = root._rawModule.getters
  if (getters) {
    _.forEach(getters, (name, getterFn) => {
      Object.defineProperty(store.getters, name, {
        get: () => getterFn(root.state)
      })
    })
  }
  
  // mutations
  const mutations = root._rawModule.mutations
  if (mutations) {
    _.forEach(mutations, (name, mutation) => {
      let _mutations = store.mutations[name] || (store.mutations[name] = [])
      _mutations.push(payload => {
        mutation(root.state, payload)
      })
      
      store.mutations[name] = _mutations
    })
  }
  
  // actions
  const actions = root._rawModule.actions
  if (actions) {
    _.forEach(actions, (name, action) => {
      let _actions = store.actions[name] || (store.actions[name] = [])
      _actions.push(payload => {
        action(store, payload)
      })
      
      store.actions[name] = _actions
    })
  }
  
  // 递归
  _.forEach(root._children, (name, childModule) => {
    installModule(this, this.state, path.concat(name), childModule)
  })
}
```



Step6 - 插件机制

```js
(options.plugins || []).forEach(plugin => plugin(this))
```



以上只是以最简化的代码实现了 `vuex` 核心的 `state` `module` `actions` `mutations` `getters` 机制，如果对源代码感兴趣，可以看看[若川的文章](https://juejin.cn/post/6844904001192853511#heading-12)
