
## Part1

#### 思考1. 那些是vue2.x的性能提升点？

* `diff` 如果你想到了 `diff`,那怎么更快？
* `proxy` 当然比 `Object.defineProperty` 好，为啥？按需？
* `SSR` 更多的利用静态字符串拼接
* ...

#### 思考2. 纯静态
```js
<div>
    <h1>hello </h1>
</div>
```
会成为diff的负担

#### 思考3. 动静结合
（把静态的提出，不走diff ,减少操作数）
```js
<div>
    <h1>hello </h1>
    <p>{{ text }}</p>
</div>
```

#### 思考4. 分治思想

> 分而治之，将大的、复杂的问题拆解成若干类似的小问题

patchFlag 对节点分治

#### 思考11. 节点提升的有效范围

> 可以理解为，思考哪些 creatBlock 中的参数 是不可以被提升的？

* 动态props
* ref
* 自定义指令
* ...

// blockTree 靶向更新 提升 预先字符串化(createStaticNode)


AST 使用 DFS 来遍历利用到Visitor 模式，引申到Babel 插件的写法(也有 Visitor) 


### 框架源码阅读思路

1. 功能实现主逻辑
2. 边界 case 选一些典型阅读


## Part2