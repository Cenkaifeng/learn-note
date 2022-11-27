
# vue 使用者转 react 应知应会

### react 事件的命名规则是？

 camelCase .eg: `className`而不是DOM元素中的小写字母命名方式。例如onclick要写成onClick，onchange要写成onChange等。

### 事件中怎么阻止默认行为？

在 React 中另一个不同点是你不能通过返回 false 的方式阻止默认行为。你必须显式的使用 preventDefault 。例如，传统的 HTML 中阻止链接默认打开一个新页面，你可以这样写：

```HTML
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
```

React 中则是下面这样

```jsx
function ActionLink() {
  function handleClick(e) {
    e.preventDefault(); // 调用 preventDefault()
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

### 【了解】react 实际把事件绑定到哪里？有什么好处?

会把时间绑定到一个唯一实例，相当于React 在框架内自己做了一套类似 DOM 事件的机制，这要的好处

- 兼容性好
- 方便后面React Native 多端同构
- 开发一致性
- 基于性能优化，全局共享一个实例（以前dom绑定事件后续还要单独销毁），现在保持对同一个实例的引用

缺点是不能异步操作事件，

> SyntheticEvent:实例将被传递给你的事件处理函数，它是浏览器的原生事件的跨浏览器包装器。除兼容所有浏览器外，它还拥有和浏览器原生事件相同的接口，包括 `stopPropagation()` 和 `preventDefault()`。

[【参考 SyntheticEvent】](https://react.docschina.org/docs/events.html)

### 列表中的 key 一般怎么写？ 写 key 有什么收益？

```jsx
// 好的写法
function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 一个好的经验法则是：在 map() 方法中的元素需要设置 key 属性。
    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];

const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(<NumberList numbers={numbers} />);
```

key 帮助 React 识别哪些元素改变了，比如被添加或删除。因此你应当给数组中的每一个元素赋予一个确定的标识。建议每个列表有独特唯一性，万不得己不要用 index

key 能帮助列表在 diff 阶段更高效的对比新旧节点的变化

### PureComponent 的作用是？和 React.memo 有什么区别？

#### React.PureComponent

首先拿React官网的例子来说 PureComponent 通常是用来 和 Component 进行比较的，PureComponent 以浅比较的方法实现 shouldComponentUpdate() ；
在不太复杂的渲染内容中使用 PureComponent 会提高性能；

#### React.memo

##### HOC

> 如果你的组件在相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 React.memo 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。

相同点

默认情况下其只对复杂对象做浅层对比，**要自定义对比需要在第二参数传入比较函数**

```js
function MyComponent(props) {
  /* 使用 props 渲染 */
}
function areEqual(prevProps, nextProps) {
  /*
  如果把 nextProps 传入 render 方法的返回结果与
  将 prevProps 传入 render 方法的返回结果一致则返回 true，
  否则返回 false
  */
}
export default React.memo(MyComponent, areEqual);
```

不同点
> **注意**
> 与 class 组件中 shouldComponentUpdate() 方法不同的是，如果 props 相等，areEqual 会返回 true；如果 props 不相等，则返回 false。这与 shouldComponentUpdate 方法的返回值相反。(很符合函数命名语意)

### 【了解】React.lazy 的作用？需要和什么配合使用？

配合 React-router 配置基于路由的代码分割

```jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  </Router>
);
```

### react 有哪些 hook? 作用？

- useState

    ```js
    import React, { useState } from 'react'
    const [state, setState] = useState(0)
    ```

- useEffect
    跟 class 组件中的 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 具有相同的用途
- useRef
- useCallback
    > 把内联回调函数及依赖项数组作为参数传入 useCallback，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 shouldComponentUpdate）的子组件时，它将非常有用。
    > useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。
- useMemo
  把“创建”函数和依赖项数组作为参数传入 useMemo ，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。
跟 useCallback 非常类似的功能， useMemo 相当于 Class 组件的 pureComponent 。
我们再接着上述案例使用 useMemo 修改下：

  ```jsx
    const fetchData = useMemo(()=>{
      return ()=>fetch(`https://v1/api/people/${personId}/`);
    },[personId]);
  ```

- useContext
    让你不使用组件嵌套就可以订阅 React 的 Context。（类似 Vue inject provide 的概念但是由不像，context 囊括的范围会更大）；

---

- useImperativeHandle
- useReducer

---

- useLayoutEffect
- useDebugValue
- useTransition

### 【TODO】react hook deps 要怎么写才合理？

hook deps 通常是 hooks 的第二参数，相当于封装回调函数的入参

```jsx
const cb = useCallback((props) => {

}, []) // TODO： 依赖不能按照IDE无脑按照提示填写，需要根据需求情况；
```

### 【了解】hook 有哪些使用规则？官方提供了什么来保证规则的执行？

Hook 本质就是 JavaScript 函数，但是在使用它时需要遵循两条规则。我们提供了一个 linter 插件来强制执行这些规则：

只在最顶层使用 Hook
不要在**循环**，**条件**或**嵌套函数**中调用 Hook， 确保总是在你的 React 函数的最顶层以及任何 return 之前调用他们。遵守这条规则，你就能确保 Hook 在每一次渲染中都按照同样的顺序被调用。这让 React 能够在多次的 useState 和 useEffect 调用之间保持 hook 状态的正确。(如果你对此感到好奇，我们在下面会有更深入的解释。)

只在 React 函数中调用 Hook
不要在普通的 JavaScript 函数中调用 Hook。你可以：

✅ 在 React 的函数组件中调用 Hook
✅ 在自定义 Hook 中调用其他 Hook (我们将会在下一页 中学习这个。)
遵循此规则，确保组件的状态逻辑在代码中清晰可见。
*[以上来自官方文档](https://zh-hans.reactjs.org/docs/hooks-rules.html)*

官方提供了`eslint-plugin-react-hooks`插件保证这条规则执行

### 【了解】怎么借助 react dev tool 查看组件的 render ?

在你的 React 项目页面切换到 Components Tab，点开右上角的 setting icon，勾选上“Highlight updates when components render.”。这个功能可以让你在操作页面时，展示哪些组件发生了更新（高亮)
[【React 性能优化】](https://juejin.cn/post/6995949283371548708#heading-0)

### 【了解】如果组件反复刷新，怎么排查到具体的问题？有什么工具可以借助？

Chrome Devtool Performance 可以记录
或者，用 Devtool 的监听组件刷新显示的组件

查看无效渲染的方式
<https://our.ones.pro/wiki/#/team/RDjYMhKq/space/7f6AVQwH/page/4qVbT5nU>

## [react-router](http://react-router.docschina.org/web/guides)

### 我们采用的是 hash 还是 browser 路由？

hash 表现形式是 url 带#号
HashRouter: <http://localhost:3000/#/admin/buttons>
BrowserRouter: <http://localhost:3000/admin/buttons>

### 什么是静态路由？什么是动态路由？

静态：中心化，统一 Router 实例进行路由管理
动态：去中心化，路由的配置不再是全部位于顶层组件中了，而是分散在不同的组件中，通过组件的嵌套关系来实现路由的层次
好处:充分实现页面的复用，减少重复渲染
[【参考1】](https://juejin.cn/post/6844903840404226061)
[【参考2】](http://react-router.docschina.org/web/guides/philosophy)

### Route 的 render 和 component 有什么区别？

component使用React.createElement() 来创建该组件，而render是直接运行赋值给render这个prop的函数并带上props参数来创建该组件。并且官网提到如果使用inline function（官网说inline function，其实就是匿名函数）来创建这个组件时，就不要用component，因为会让这个被渲染子组件造成不必要的unmount和mount操作
[React router 的 Route 组件种 component 与 render 的不同](https://zhuanlan.zhihu.com/p/402257552)
（你还可以发现这三个的优先级是children -> component -> render)

### Switch 的作用？Redirect 的作用？

如果我们希望设置一系列的路由匹配规则，只渲染第一个匹配上的组件，该如何实现呢？这时候你就需要用到 `<Switch>` 组件。`<Switch>` 中包含一组`<Route>`或者`<Redirect>`，只渲染第一个匹配的路由。

Redirect 用于重定向

### withRouter 的作用？提供了什么数据？

`withRouter` 是 `react-router` 的一个高阶组件，可获取 `history`

`render` 时会把 `match`, `location` 和 `history` 传入 `props`
[【参考】](https://juejin.cn/post/6844903895840325640)

### react-router 和 react-router-dom 的关系，为什么要拆开？

react-router 其实是 react-router-dom 的超集，涵盖 RN 等 hybrid 的场景,react-router-dom 本身也属于对 react-router 的引用封装，增加了很多对应 hook

### react-router-dom 有哪些 hook 方法？作用是什么?

Hooks
​ React Router 提供了以下4个有用的Hook，可以在任何组件内部使用它。前提是你的react 版本号 >=16.8

#### useHistory

​ useHistory  hook 提供了history对象，获取其可以进行导航设置。history实例中包含了
​ action,block,createHref,go,goBack,goForward,length,listen,location,push,replace等属性

#### **useLocation**

​ useLocation hook产生的 location 实例，是一个对象  {pathname: "/home/m1", search: "", hash: "", state: undefined, key: "6odisu"},可以获取当前页面的url

#### **`useParams`**

​ useParams hook 使用在动态路由里面，便于获取当前动态参数.

#### **useRouteMatch**

获取当前url 相关参数。对用实例返回的属性包括 isExact，params，path， url

<https://juejin.cn/post/6860862817520582663>

### 【TODO:】什么是 url parameters？什么是 query parameters?

url
是指 get / post 请求里的传参

query
host?params=xxx&params2=xxxx
window.location.search 获取

### 【了解】react-router-dom 中的 params 来源于哪里？是在当前 url 中么 ?

有三种
`/router/:id`
useParams
useSearchParams
刷新页面不消失
query传参
特点：刷新页面参数消失，参数不会在地址栏显示

state
[【参考】](https://www.cnblogs.com/sgs123/p/14077680.html)

### 【了解】history 库提供的 history 和 window.history 是一样的么？

history 封装了三种状态

```js
import { createBrowserHistory } from 'history';
```

（确定一下 是 history = createBrowserHistory()）
浏览器没有直接提供监听URL改变（push、pop、replace）的接口，因此 react-router 对原生的 history 进行了包装，提供了监听URL改变的API。
使用 react-router 时不需操作 History 对象（Routes 组件会进行操作）

[【React Router 参考】](http://react-router.docschina.org/web/api/history)

## react 相关

### 【了解】虚拟列表的原理？

![alt](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/55b9b7a9ce7f42518daf45d8c508ab44~tplv-k3u1fbpfcp-zoom-crop-mark:3024:3024:3024:1702.awebp?)

容器高度（即可视区域高度） containerHeight
列表长度（即列表项总数） itemCount
列表项尺寸 itemHeight
滚动位置 scrollTop

[参考](https://juejin.cn/post/7132277540806213645)

### 【TODO】怎么通过 react dev tool 查看页面中使用的是哪个组件？对应代码位置？

Components tab 选择页面元素；
Open in Editor URL:`vscode://file/{path}#L{line}`(代码对应页面) -> Open in Editor
View source of this element（页面元素对应代码）

### 怎么通过 react dev tool 查看组件接收了那些 props?

选择对应组件右栏有 props 列表

### 【TODO】当使用很多 HOC 的时候，使用什么可以使写法更简洁？

装饰器？
但是装饰器不在当前工程常用

```tsx
import { decoratorWithNameHeight } from '.../../HOC/..'

interface Props {
  name?: string;
}

@decoratorWithNameHeight(111)
class UglyWorld extends Component<Props, any> {
  render() {
    return <div>YO {this.props.name}</div>
  }
}
```

实际上项目用了 compose 等方法对高阶组件打平
`recompose lib`
`import { withHookHOC } from '@ones-ai/ted';`
`import { compose, withState, withProps } from 'recompose';`
