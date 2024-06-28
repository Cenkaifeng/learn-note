## react fiber

为实现什么才设计的 fiber 架构？

* 为了使react 渲染的过程可以被中断，可以将控制权交还给浏览器，可以让位给高优先级的任务（这里定义了任务优先级）

对于计算量比较大的js计算或者dom计算，就不会显得特别卡段。而是一帧一帧有规律的执行任务。


```js
const tasks = [];

function run() {
  let task;
  while(task = task.shift()) {
    execute(task); // 如果执行消耗 10s , 这个循环要 10 * n s 的主进程阻塞
  }
}
```

Generator.

```js
const tasks = [];// 10 task

function * run() {
  let task;
  while(task = task.shift()) {
    if(hasHighPriorityTask() ) {
      yield;
    }
    execute(task);
  }
}

const iterator = run();

iterator.next(); //继续执行
```

1. generator 有类似功能， 为什么最后没有使用？

* 要使用 generat, 需要将涉及到的所有代码都包装成 generator * 的形式，非常麻烦，工作量大.
* generator 内部是有状态的
```js
function doWork(a, b, c) {
  const x = doExpendsiveWordA(a);
  yield;
  const y = doExpendsiveWorkB(b);
  yield;
  const z = doExpendsiveWorkC(c);
  return z;
}
```
比如： 我们已经执行完了 `doExpendsiveWordA` 和 `doExpendsiveWorkB`, 还未执行 `doExpendsiveWorkC`. 

如果此时 b 被更新了，那么在新的时间分片里，我们只能沿用之前获取到 x, y 结果。

2. 如何判断当前是否有高优任务呢？

当前 js 的环境其实并没有办法去判断是否有高优任务.

只能约定一个合理的执行时间（16.667ms左右），当超过了这个执行时间，如果任务仍然没有执行完成，中断当前任务，将控制权交还给浏览器.


3. requesIdleCallback.

使浏览器在**有空的时候**执行我们的回调，这个回调会传入一个参数，表示浏览器有多少时间供我们执行任务.

**浏览器在一帧内要做的事**
* 处理用户输入事件
* JS 的执行
* requestAnimationFrame 调用
* 布局 layout 
* 绘制 paint (渲染流水线)
...

做完上述的事情后，16.667 ms 剩余时间就是 requestIdleCallback 的执行时间

**如果剩余 0ms , 浏览器很忙，怎么办？**

requestIdleCallback timeout 参数, 100ms , 如果超过 timeout 后，回调还没有被执行，那么会在下一帧强制执行回调. 相当于给浏览器的 deadline ,要求我这个回调多久内必须执行

**兼容性如何？**

requestIdleCallback 兼容性很长，react 通过 messageChannel 模拟实现了 requestIdleCallback 的功能

**timeout 超时后就一定会执行吗？** 

Nope, react 里预先设定了5个优先级等级.

* Immediate 最高优先级，这个优先级的任务应该被马上执行不能中断
* UserBlocking 这些任务一般是用户交互的结果，需要即时得到反馈
* Normal 不需要用户立即就感受到的变化，比如网络请求
* Low 这些任务可以延后，但是最终也需要执行
* Idle 可以被无限期延后
 
## 平时用过高阶组件么（HOC) ? 什么是高阶组件？高阶组件能用来做什么？

简称HOC: High Order Components.

1. 是一个函数
2. 入参：原来的 React 组件
3. 返回值：新的 react 组件
4. 是一个纯函数，不应该有任何的副作用（酌情处理）

```js
function helloWorld() {
  const myName = sessionStorage.getItem('Jervis'); // 公共逻辑
  console.log(`yo i'm ${myName}`);
}

function byebye() {
  const myName = sessionStorage.getItem('Jervis');
  console.log(`byebye ${myName}`)
}
```

demo 用高阶函数提炼公共逻辑
```js
function helloWorld() {
  const myName = sessionStorage.getItem('Jervis'); // 公共逻辑
  console.log(`yo i'm ${myName}`);
}

function byebye() {
  const myName = sessionStorage.getItem('Jervis');
  console.log(`byebye ${myName}`)
}

function wrapWithUserName(wrappedFunc) {
  const tempFunction = () => {
    const myName = sessionStorage.getItem('Jervis');
    wrappedFunc(myName);
  }
  return tempFunction;
}

const wrappedHello = wrapWithUserName(helloWorld);
const wrappedBye = wrapWithUserName(byebye);

wrappedHello();
wrappedBye();
```

### 怎么写一个高阶组件？

1. 普通方式

2. 装饰器
  *一般用于对参数函数的劫持，然后执行特定逻辑*

3. 多个高阶组件的组合



```tsx
import React, { Component } from 'react';
// import ReactDom from 'react-dom';

interface State {
  name: string;
}

export const decoratorWithNameHeight = (height?: number) => {
  return (WrappendComponent) => {
    return class extends Component<any, State> {
      public state: State = {
        name: ''
      }

      componentWillMount() {
        let username = localStorage.getItem('myName');
        this.setState({
          name: username || ''
        })
      }

      render() {
        return (
          <div>
            <WrappendComponent name={this.state.name} {...this.props}/>
            <p> 身高为 { height || 0} </p>
          </div>
        )
      }
    }
  }  

}
// 被传入参数
import { decoratorWithNameHeight } from '.../../HOC/..'

interface Props {
  name?: string;
}

@decoratorWithNameHeight(111)
class UglyWorld extends Component<Props, any> {
  render() {
    return <div>bye bye {this.props.name}</div>
  }
}

export UglyWorld;
// 引入 App.tsx

import {ByeWorld} from './components/decorator/ByeWorld'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ByeWorld name="Jervis"/>
      </header>
    </div>
  )
}
```

### 高阶组件能用来做什么？技术层面上

1. 属性代理
  1.1 操作 Props
  1.2 操作组件实例（对组件实例的劫持）
  ```jsx
    import React, {Component } from 'react';

    export const refHoc =() => {
      return (WrappedComponent) => {
        return class extends Component {
          ref = null;

          componentDidMount() {
            console.log(this.ref.state);
          }

          render() {
            return (
              <WrappedComponent 
                {...this.props}
                ref={(instance) => {
                  this.ref = instance; // 这样就拿到组件实例
                }}
              />
            )
          }
        }
      }
    }
  ```
2. 继承/劫持

```js

export function hijackHoc<T extends { new (...args: any[]): any }>(component: T) {
  return class extends component {
    handleClick() {
      console.log(this.handleClick);
      super.handleClick();
      alert('handleClick has hijacked')
    }

    render() {
      const parent = super.render();

      return React.cloneElement(parent, {
        onClick: () => this.handleClick();
      })
    }
  }
}

```

## 什么是 react hooks ？ React hooks 有什么优势？

什么是？ 钩子？

可以在不写 class 组件的情况下， 使用 state 和其他 react 特性(主要是为了 推Function components)

useState
useEffect
useMemo

那为什么不写 class 而转向了 hooks 的写法？

### react hooks 有什么优势？

**class 的缺点**
1. 组件间的状态逻辑很难复用

组件间如果有state 的逻辑是相似的， class 模式下基本上是用高阶组件来解决的.

虽然能够解决问题，但是我们需要在组件外部再包一层元素，会导致层级非常冗余.

2. 复杂业务的有状态组件会越来越复杂（内部有数据流）

3. 监听和定时器的操作，被分散在多个区域

在 didMount
`document.addEventListener('xxx')`
const timer = setInterval();
this.setState({timer});

在 willUnmount 
`document.removeEventListener('xxx')`
if( this.state.timer) {
  clearInterval(this.state.timer)
}

这样不好维护，逻辑不集中。其实这个和 Vue Options Api 的缺点类似

4. this指向问题

```js
class App extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      num: 1,
      title: 'this_demo'
    }

    this.handleClick2 = this.handleClick1.bind(this);
  }
  handleClick1() { // 情况1
    this.setState({
      num: this.state.num + 1
    })
  }

  handleClick3 = () => {
    this.setState({
      num: this.state.num + 1
    })
  }

  render() {
    return (
      <div>
        {/* {render 中 bind() 每次都会返回新的函数，会造成ChildComponent 无意义的多次渲染 */}
        <ChildComponent onClick = {this.handleClick1.bind(this)}></ChildComponent>
        <ChildComponent onClick = {this.handleClick2}></ChildComponent>

        {/* 同第一种，还是会多次渲染 */}
        <ChildComponent onClick = {() => this.handleClick1()}></ChildComponent>
        {/* 因为箭头函数在定义的时候指向定义上下文，所以不会引发重新渲染 */}
        <ChildComponent onClick = {this.handleClick3}></ChildComponent>
      </div>
    )
  }
}
```

**hooks 的优点**

1. 利于业务逻辑的封装和拆分，可以非常自由的组合各种自定义hooks.(自己封装的用到了 react hooks 的公共逻辑)

2. 可以在无需修改组件结构的情况下，复用状态逻辑 (class 的情况下需要一些 HOC 写法增加冗余层级)

3. 定时器，监听等等都被聚合到同一块代码下
```js

useEffect(() => {
  const timer = setInterval(() => {
    
  }, 1000);

  return () => clearInterval(timer);// 直接return 销毁就好
},[])
```

### react hooks 的使用事项
1. 只能在函数内部的最外层调用hook, 不要在循环、条件判断、或者子函数中调用。（为什么？）
2. 只能在React 的函数组件中调用 Hook,不要在其他的js 函数里调用

Q
1. 为什么，hook不能在 循环、条件判断中调用？
  游标存储状态会乱串，取值会出现偏移
2. 为什么useEffect的第二个参数是空数组，就相当于componentDidMount 只执行一次？
3. 自定义的 hook 怎样操作组件的？

A1
### 手写代码：实现 useState
```js
// 使用方式
const [count, setCount] = useState(0);
setCount(1);

// useState 
import React from 'react';
import ReactDom from 'react-dom';

function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Jervis");

  const onClick = () => {
    setCount(count + 1);
  }

  const onClickName = () => {
    setName(`${name} ${Math.random()}`)
  }

  return (
    <div>
      <div>{ count }</div>
      <div>{ name }</div>
      <button onClick={onClick}>click</button>
      <button onClick={onClickName}>click name</button>
    </div>
  )
}
// 模拟一个 useState
// let state:any; // 全局存储
let stateArray: any[] = []; // 真正的源码用的不是数组，而是单向链表
let cursor = 0; // 游标、索引
function useState<T>(initialState: T): [T, (newState:T) => void] {
  const currentCursor = curcor; // 每次调用都更新游标

  stateArray[currentCursor] = stateArray[currentCursor] || initialState;
  // state = state || initialState;
  function setState(newState: T) {
    stateArray[currentCursor] = newState;
    // state = newState;
    reender();
  }

  ++curcor;// 游标自增
  return [stateArray[currentCursor], setState];
}

export function render() {
  ReactDom.render(
    <React.StrictMode>
      <Counter/>
    </React.StrictMode>
    document.getElementById("root")
  );
  cursor = 0;// 为啥要赋值 0 ？当渲染完成后需要归零，每次渲染游标应该重新开始，否则下次就会指向一个不存在数据的空间
}


```

### 手写代码：实现 useEffect

```js
// 使用方式

// useEffect 
import React, { useState } from 'react';
import ReactDom from 'react-dom';

function CounterEffect() {
  const [count, setCount] = useState(0);
  const [count1, setCount] = useState(0);

  useEffect(() => {
    console.log(`count has change  to${count}`)
  }, [count])

  useEffect(() => {
    console.log(`count1 has change to ${count}`)
  }, [count1])

  const onClick = () => {
    setCount(count + 1);
  }
  const onClick1 = () => {
    setCount1(count1 + 1);
  }

  return (
    <div>
      <div>{ count }</div>
      <div>{ count1 }</div>
      <button onClick={onClick}>click to change count</button>
      <button onClick={onClick1}>click to change count1</button>
    </div>
  )
}
// 模拟一个 useEffect
const allDeps:Array<any[] | undefined> = [];// 二维数组
let effectCursor: number = 0
function useEffect(callback: () => void, depArray?: any[]) {
  if(!depArray) {
    callback();
    allDeps[effectCursor] = depArray;
    effectCursor++;
    return;
  }

  const deps = allDeps[effectCursor];
  const hasChanged = deps 
    ? depArray.some((el, i) => el !== deps[i]) // 只要有一个元素不相等就说明发生改变
    : true;

  if(hasChanged) {
    callback();
    allDeps[effectCursor] = depArray;
  }

  effectCursor++;
}

export function render() {
  ReactDom.render(
    <React.StrictMode>
      <Counter/>
    </React.StrictMode>
    document.getElementById("root")
  );
  cursor = 0;// 为啥要赋值 0 ？当渲染完成后需要归零，每次渲染游标应该重新开始，否则下次就会指向一个不存在数据的空间
}
```

### react 中组件销毁时会自动回收 ref 么？

在 React 中，组件销毁时并不会自动回收 ref。ref 是一个特殊的属性，用于引用组件实例或 DOM 元素，在组件销毁时，ref 引用的对象并不会自动被销毁，而是需要手动进行清理操作。