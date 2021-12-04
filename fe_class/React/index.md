# React 基础

## JSX 

```jsx
const jsx = <p> hello, React</p>

render() {
  return jsx;
}

```
## react 初始化 

用create-react-app -> cra

react-app-rewired


## State

如果视图内的数据需要修改，并且同事需要响应变化，我们就需要将数据放到state中，并且使用setState来修改

## 组件

- 纯函数组件（无副作用）

- Class 组件 `class ComponentSub extends React.Component{}`

## 生命周期 Lifecycle （常用）

1. 组件的初始化阶段 init, constructor
2. 挂载阶段 mount
  1. componentWillMount 组件挂载到 dom 前调用，这里写 setState 不会引起组件的重新渲染
  2. render 返回一个 react 元素，不能在这里去 setState (否则会死循环)
  3. componentDidMount 组件挂载到 dom 后调用，只执行一次
3. 巩新阶段 update
  1. componentWillReceiveProps(nextProps) 触发于 props 引起的组件更新过程中
  2. shouldComponentUpdate(nextProps, nextState)
  3. componentWIllUpdate
  4. render
  5. componentDidUpdate
4. 写在阶段 unmount
  1. componentWillUnmount 清理一些定时器


16.3 之后的生命周期 有所调整，

架构调整提出了 Fiber 
render 之前的一些生命周期

getDerivedStateFromProps(props, state) 不让你做有副作用的东西

只在创建和更新的 render 之前调用，应该返回一个对象来更新状态，如果不想更新任何状态，return null

getSnapshotBeforeUpdate

可以在更改之前获取一些dom 信息，比如 scrollTop
