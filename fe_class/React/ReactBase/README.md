## 基础（有开发经验的基础篇）

# React 基础

## JSX 
非常类似 DOM 的 xml 结构的语法，最大的区别是，我们可以在jsx 中使用 `{}` 来使用js表达式

```jsx
<div className="foo">{something ? "something is true" : "false"}</div>
```
```jsx
const jsx = <p> hello, React</p>

render() {
  return jsx;
}

```
在 `jsx` 中我们需要保证渲染的内容必须是合法的 `jsx` 元素，合法的 `jsx` 元素有：
* 普通 DOM 标签，如 div/p/span 等
* 声明 react 组件，例如通过 class 或函数创建的 jsx 组件
* null (最终会渲染一个空元素)
* 字符串 (最终会渲染一个 text 节点)
* 对于数字类型，最终就会渲染出来，所以有的时候通过布尔表达式判断的时候就会出问题
```jsx
{false && (<p>this is false</p>)} // 不会渲染内容
{0 && (<p>this is false</p>)} // 会渲染 0
{param ? (<p>this is true</p>) : null}// 推荐用三目来代替短路门
```
可以通过 `React.isValidElement` 来判断一个内容元素是不是一个合法的 react element.

tips: 
同事需要注意，因为 `class / for ` 这类 html 属性是关键字，所以在 jsx 中我们相拥使用，就必须使用 className/ htmlFor 的形式来定义。
```jsx
<label className="foo" htmlFor="name">label</label>
``` 

其实因为 jsx 属于一个特殊语法，相对应的需要特定的编译来让 jsx 能在浏览器执行，常见使用 `babel` 的 `babel-plugin-transform-react-jsx` 插件。

eg
```jsx
<div>
  <h3 className="h3">
    {something ? "something is true" : "something is false"}
  </h3>
</div>

```
最后编译成为
```js
React.createElement(// 三个参数 组件名， 当前接受的属性， 之后的参数都是子属性
  "div",
  null,
  React.createElement( 
    "h3",
    {className: 'h3'},
    something ? "something is true" : "something is false"
  )
)
```

## react 初始化 【create-react-app cli 的使用】
封装了 webpack / babel 这种基本的工程化工具

用create-react-app -> cra

react-app-rewired


## State

如果视图内的数据需要修改，并且同事需要响应变化，我们就需要将数据放到state中，并且使用setState来修改

## 组件
react 中可以使用 class 形式或 FP 形式类创建一个组件

- 纯函数组件（无副作用）

- Class 组件 

比如下面这种
```jsx
function Foo(props) {
  return (<div onClick={props?.handleClick}>{props.text || 'Foo'}</div>);
}

class ComponentSub extends React.Component{
  click() {},
  render() {
    return (
      <div>{this.props.text || 'ComponentSub'}</div>
    )
  };
}
```
#### 简单总结一下两者区别：

- 加载的 props 方式不同：
  函数式定义组件从组件函数的参数加载。class 形式的组件通过 this.props 获取传入的参数
- 函数式组件比较简单，内部无法维护状态：
  class 形式内部可以通过 `this.state` 和 `this.setState` 方法更新内部 state ,同时 render 里面的函数渲染结果
- class 组件内部可以定义更多的方法在实例上，但是函数式组件无法定义

*无状态组件都用函数式 hooks 这种*

#### 受控和非受控

比如一个 input 组件 value 有没有用一个 status 值存起来，然后渲染status 而从 e.value 获取渲染 这个是非受控。
 
## 生命周期 Lifecycle （常用）

1. 组件的初始化阶段 init, constructor
2. 挂载阶段 mount
  1. componentWillMount 组件挂载到 dom 前调用，这里写 setState 不会引起组件的重新渲染 
    componentWillMount 是一个能在服务端执行的方法（这点和 Vue 的原因很像 ） 

    > 唯一会在 SSR 过程中被调用的生命周期钩子是 beforeCreate 和 created。这意味着其它生命周期 钩子 (如 beforeMount 或 mounted) 中的任何代码将只会在客户端执行。
  2. render 返回一个 react 元素，不能在这里去 setState (否则会死循环)
  3. componentDidMount 组件挂载到 dom 后调用，只执行一次 **（在这里发送请求）**
3. 巩新阶段 update
  1. componentWillReceiveProps(nextProps) 触发于 props 引起的组件更新过程中
  2. shouldComponentUpdate(nextProps, nextState)
  3. componentWIllUpdate
  4. render
  5. componentDidUpdate
4. 写在阶段 unmount
  1. componentWillUnmount 清理一些定时器、事件

ps:
客户端的请求要放在服务端不会执行的周期里，这个是针对 React 至于 Vue 还是要看具体情况
React 最好在 componentDidMount 中发送请求，这样整个组件对服务端渲染会比较友好。
*16.3 之后的生命周期 有所调整，*

架构调整提出了 Fiber 
render 之前的一些生命周期

getDerivedStateFromProps(props, state) 不让你做有副作用的东西

只在创建和更新的 render 之前调用，应该返回一个对象来更新状态，如果不想更新任何状态，return null

getSnapshotBeforeUpdate

可以在更改之前获取一些dom 信息，比如 scrollTop

## 常见错误和性能问题

#### 异步过程使用单例的 event 对象

全局单例的 event 对象，所以在异步对象中使用 react 时间时需要额外注意。异步操作最好将对象内部需要的值先进行拷贝复制

因为 React 内部实现了一套自己的事件捕获机制。
.eg

```jsx
class App extends Component {
  clickHandle(e) {
    const text = e.currentTarget.innerText;
    setTimeout(function() {
      // button1
      console.log('button1 click', e.currentTarget.innerText)// 错误写法
      console.log('button1 click', text)
    })
  }
  render() {
    return {
      <div className="App">
        <button onClick={this.clickHandle}></button>
      </div>
    }
  }
} 
```
那为什么这么设计？
1. 为了跨端设计
2. 兼容性好
3. 基于性能优化，全局共享一个实例（以前dom绑定事件后续还要单独销毁），现在保持对同一个实例的引用

#### 不要在 render 中使用箭头函数、bind 

组件的生命周期描述了整个组件在 创建 -> 实例化 -> 销毁 过程中不同过程的执行方法。要特别注意，不要在 render 中定义单独引用的内容。也就是**不要在 render 中使用箭头函数**，否则很容易运行时造成子组件的重新渲染。

为了保证子组件和父组件有相同的引用。传入子组件的引用类型需要格外注意。
```jsx
// 减少子组件的 re-render
class RenderText extends Component {
  shouldComponentUpdate(next) {
    const prev = this.props;
    if(next.renderRandomText === prev.renderRandomText) {
      return false;
    }
    return true;
  }
  render() {
    return (
      <div onClick={this.props.renderRandomText}>{this.props.text}</div>
    )
  }
}
class App extends Component {
  constructor() {
    this.renderText = this.renderRandomText.bind(this)// 把this 绑定到子组件组件 可以用 AutoBind 的类库或者一些高级写法实现效果 
  }
  state = {
    text: 'text'
  }
  clickHandle(e) {
    const text = e.currentTarget.innerText;
    setTimeout(function() {
      console.log('button1 click', text)
    })
  }
  renderRandomText() {
    this.setState({text: 'text'});
  }
  render() {
    return (
      <div className="App">
        <button onClick={this.clickHandle}>button1</button>
        <button onClick={this.renderRandomText.bind(this)}>button3</button>
        <RenderText text={this.state.text} renderRandomText={this.renderText} />
      </div>
    )
  }
} 
```

使用深拷贝断绝引用的问题

#### immutable 库 immutable-js 和 immer
为了配合 shouldComponentUpdate 来进行性能优化，大部分时候我们需要复杂的层级判断，这里用到两个配合 react 最小的更新库
```jsx
const immutable = require('immutable'); // 
const data = {
  key1: {key1key1: 'valuekey1'},
  key2: {key2key2: 'valuekey2'}
};

const a = immutable.fromJS(data);
const b = a.set('key1', 'valueb');

const.log(a.get('key1'), b.get('key1'), a.key2 === b.key2); //虽然改变了key1 但是key2 的引用还是相同的
```

```js
const {produce} = require('immer');
const state = {
  key1: 'test'
}
const newState = produce(state, (draft) => {
  draft.key1 = 'newKey1';
})

console.log(newState.key1, state.key1);
```