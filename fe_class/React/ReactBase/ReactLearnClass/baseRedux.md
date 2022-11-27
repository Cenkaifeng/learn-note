# base redux

## [Redux](https://redux.js.org/) 相关

### 简单讲下 redux 单向数据流？

React 有 props 和 state
props意味着父级分发下来的属性
state意味着组件内部可以自行管理的状态，并且整个React没有数据向上回溯的能力，这就是react的单向数据流

Redux 出现的背景是 React 组件之间通讯需要大量 handleClick/ callback 函数进行层级管理，带来非常大的性能开销
![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/7/29/16c3b1b733c7f372~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

redux 单向数据流过程
    Store（state tree）: 1: 更新视图 -> Connect (hooks 写法常用 useSelector)
    View: 2: 发起更新作用 -> Action
    Reducers: 3: 发起更新状态 -> Dispatch -> 触发一个 action 然后被对应 reducer 处理， state 完成更新

> 在 Redux 中，累计运算的结果就是 state 对象，将要累计运算的是 action。Reducer 由上次累积的结果 state 与当前被累积的 action 计算得到一个新 state。Reducer 必须是纯函数——即相同的输入只会返回相同的结果的函数。纯函数不能产生任何副作用。只有这样，才可能实现一些花里胡哨的特性，比如热重载和时间旅行（time travel）。

*tips: reducer 该函数把一个集合归并成一个单值，参考 `Array.prototype.reduce()`*

### react-redux connect 的作用是？

将React 组件和Redux store 真正关联起来，也就是将 state 更新到视图的操作

```js
import React from 'react'
class DemoComp extends React.component {
    //...
}
const Comp = connect(...args)(DemoComp);
//connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options]) 
```

### [TODO:]mapStateToProps 中的 state 是稳定的引用地址么，如 preState === nextState 是什么？为什么？

作用：mapStateToProps （首先一定要是一个存函数） 的作用就是将 store 的 state 映射到 React 中的 props 中；
原理：对第一层的key:value 做 `===` 比较

只做浅层 === 比较

>当state更新时（即nextState !== state，注意这里用===来比较，所以每次更新state需要用文章开头的方式来更新），
react-redux会调用所有的mapStateToProps函数（所以每个mapStateToProps函数应该很快能运算结束，不然会成为应用性能瓶颈），
针对每次调用mapStateToProps，检查函数的结果（是个对象）的每个key的value跟上一次对应的value是否一致（这里也是用===来比较！）如果所有value都一致，不会渲染这个组件；如果有任意一个value变了，就重新渲染该组件。
PS. 所以react-redux中对mapStateToProps的结果的比较是浅比较，即会遍历所有key来判断是否相等，对每个key的value的判断方法是===。所以，要搞清楚“引用比较”（===）、“浅比较”、“深比较”的差别。


mapStateToProps(state, ownProps); state / ownProps 的变化都会调用函数然后 生成新的 stateProps (最后merge ownProps) 返回；
```js
// 示例：如果 state 直接改变
const mapStateToProps = (state) => {
    
    return state;
}
```


[【参考】](https://juejin.cn/post/6900944151504912398)

是，connect 生成的包装器组件订阅 Redux store。每次分派动作时，它都会调用 store.getState() 并检查是否 preState === nextState。如果两个状态值通过引用相同，那么它不会重新运行您的 mapStateToProps 函数，因为它假定Store State的其余部分也没有改变。

参考文章 
1. https://juejin.cn/post/6973250730077454367
2. https://zhuanlan.zhihu.com/p/81569230

### 【了解】react-redux 的 Provider 怎么把 store 提供给子组件的？

绑定到顶层？ 将 store 作为参数传入 Provider 中，通过 `getChildContext` 将传入的全局 store 的引用交给子组件

```jsx
<Provider store = {store}>
    <App />
<Provider>
```

下面是 Provide 的部分源码

```js
import { Component, Children } from 'react'
import PropTypes from 'prop-types'
import storeShape from '../utils/storeShape'
import warning from '../utils/warning'

export default class Provider extends Component {
    getChildContext() { //获取子上下文
        return { store: this.store }
    }

    constructor(props, context) {
        super(props, context)
        this.store = props.store
    }

    render() {
        return Children.only(this.props.children)
    }
}
```

connect 也会有一层Provide

// useSelector 代理 connect

[【参考】](https://juejin.cn/post/6844903505199628301)

### handleActions 的第二个参数的作用？

handleAction 是redux 用来操作 状态的，通常第二参数放置操作状态的初始值

```js
import type from '../../constants/actionType'
import {handleActions} from 'redux-actions'

const initialState = {
  movieDetail: {},
  commentData: {}
}

const actions = {}

actions[type.MOVIE_DETAIL + type.FETCH_SUCCESS_SUFFIX] = (state, action) => {
  return {
    ...state,
    movieDetail: action.payload.data
  }
}

actions[type.MOVIE_COMMENT_LIST + type.FETCH_SUCCESS_SUFFIX] = (state, action) => {
  return {
    ...state,
    commentData: action.payload.data
  }
}

const reducer = handleActions(actions, initialState)

export default reducer
```

### [TODO:]useSelector 的第二个参数的作用是？

useSelector 接收一个 selector 函数。selector 函数接收 Redux store 的 state 作为其参数，然后从 state 中取值并返回。
`useSelector( state => state.xxxx)`
useSelector 使用严格的 === 来比较结果，因此只要 selector 函数返回的结果是新地址引用，组件就会重新渲染！这意味着如果在 selector 中创建并返回新地址引用，那么每次 dispatch action 后组件都会被重新渲染，即使数据值确实没有改变。

第二参数也是传方法，能对比新旧新旧返回值（实际上是一个比较值的回调函数）

第二参数一般放置 shallowEqual

```js
import { shallowEqual, useSelector } from 'react-redux'

// later
const selectedData = useSelector(selectorReturningObject, shallowEqual);// shallow 浅比较、常用lodash 深比较
```

### [TODO:]memoize 的作用是？其从内存角度看会有什么问题？有其他更好的替代？

空间换时间，减少runtime 代码执行开销，

缓存泄露
设置缓存长度（全局长度），建议和组件生命周期绑定，所以用替代`reselect`;
正常`useSelector`会常用；

### reselect 的作用？

reselect 库提供了一个 `createSelector` api 可以用它生成 memoized selector 函数

[【参考】](https://cn.redux.js.org/tutorials/fundamentals/part-7-standard-patterns/#%E4%BD%BF%E7%94%A8-createselector-%E6%9D%A5%E8%AE%B0%E5%BF%86memoize-selectors)

用于创建记忆的“选择器”函数的库。通常与 Redux 一起使用，但也可用于任何普通的 JS 不可变数据。
https://www.npmjs.com/package/reselect

### normalizr 的作用？normalizr 扁平化数据后带来的收益是？

扁平化收益是减少查询开销

```js
// Before
[
  {
    "id": "ee05070a-eda5-4fcc-a685-a5cf4be6dc60",
    "text": "hey",
    "completed": true
  },
  {
    "id": "0bce8ddb-4f8a-44cf-9050-203ecdbb0d93",
    "text": "ho",
    "completed": true
  },
  {
    "id": "91451381-2fd6-4f81-b316-cc93f927c34a",
    "text": "let’s go",
    "completed": false
  }
]

// after
{
  "entities": {
    "todos": {
      "ee05070a-eda5-4fcc-a685-a5cf4be6dc60": {
        "id": "ee05070a-eda5-4fcc-a685-a5cf4be6dc60",
        "text": "hey",
        "completed": true
      },
      "0bce8ddb-4f8a-44cf-9050-203ecdbb0d93": {
        "id": "0bce8ddb-4f8a-44cf-9050-203ecdbb0d93",
        "text": "ho",
        "completed": true
      },
      "91451381-2fd6-4f81-b316-cc93f927c34a": {
        "id": "91451381-2fd6-4f81-b316-cc93f927c34a",
        "text": "let’s go",
        "completed": false
      }
    }
  },
  "result": [
    "ee05070a-eda5-4fcc-a685-a5cf4be6dc60",
    "0bce8ddb-4f8a-44cf-9050-203ecdbb0d93",
    "91451381-2fd6-4f81-b316-cc93f927c34a"
  ]
}
```

`normalizr`处理过后的格式可以很好地对应到我们想要的normalized state
（貌似已经不再维护了）
[【参考】](https://shubo.io/normalize-redux-state/#using-normalizr)

### 怎么方便查看 redux store 中的数据结构？

React-redux 官方提供了一个插件 Redux-DevTool 配置监听 url
