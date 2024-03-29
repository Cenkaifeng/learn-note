
## Part1 @vue/compiler-core

#### 思考1. 那些是vue2.x的性能提升点？

* `diff` 如果你想到了 `diff`,那怎么更快？
* `proxy` 当然比 `Object.defineProperty` 好，为啥？按需？
    项目变大后，在一个原型挂太多东西会造成大开销。
* `SSR` 更多的利用静态字符串拼接
* ...可以多思考，怎么让 vue2.x 变得更快

#### 思考2. 纯静态
```js
<div>
    <h1>hello </h1>
</div>
```
如果一个纯静态的东西展示在页面上，会出现什么问题？


它还是会转成 vdom , 会成为diff的负担，因为 diff 还是会跑这个静态 dom 只是没有 patch

#### 思考3. 动静结合
业务中绝大部分情况都是动静结合的，所以在处理这种类型的也没按上做优化，可以获取到最大的收集
（把静态的提出，不走diff ,减少操作数）
```js
<div>
    <h1>hello </h1>
    <p>{{ text }}</p>
</div>
```

#### 思考4. 分治思想

> 分而治之，将大的、复杂的问题拆解成若干类似的小问题
 
patchFlag 对节点分治，（动态、静态）

#### 思考5. 分！

```js
// 1. 首先怎么分？是不是吧静态的和动态的要先分开？怎么体现？

// 2. 存哪里？

// 3. 还可以继续分吗？怎么甄别？
```

![patchFlag](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/393bc559dee14de4ab1a4aa5cee4ef59~tplv-k3u1fbpfcp-zoom-1.image)

[patchFlag 定义](../shared/src/patchFlags.ts)

```js
export const enum PatchFlags {
  TEXT = 1,// 动态的文本节点
  CLASS = 1 << 1,  // 2 动态的 class
  STYLE = 1 << 2,  // 4 动态的 style
  PROPS = 1 << 3,  // 8 动态属性，不包括类名和样式
  FULL_PROPS = 1 << 4,  // 16 动态 key，当 key 变化时需要完整的 diff 算法做比较
  HYDRATE_EVENTS = 1 << 5,  // 32 表示带有事件监听器的节点
  STABLE_FRAGMENT = 1 << 6,   // 64 一个不会改变子节点顺序的 Fragment
  KEYED_FRAGMENT = 1 << 7, // 128 带有 key 属性的 Fragment
  UNKEYED_FRAGMENT = 1 << 8, // 256 子节点没有 key 的 Fragment
  NEED_PATCH = 1 << 9,   // 512
  DYNAMIC_SLOTS = 1 << 10,  // 动态 solt
  HOISTED = -1,  // 特殊标志是负整数表示永远不会用作 diff
  BAIL = -2 // 一个特殊的标志，指代差异算法
}
```

```js
// like fiber!
// Block - Block Tree
{
  tag: 'div',
  children: [
    { tag: 'h1', children: 'hello world!' },
    { tag: 'p', children: ctx.text, patchFlag: 1 /* TEXT */ },
  ],
  dynamicChildren: [
    // 所有子元素中动态的部分哦
    { tag: 'p', children: ctx.text, patchFlag: 1 /* TEXT */ },
  ]
}
```
#### 思考6. 反模式一下，怎么给上面的思路造成难题？
```html
// demo1
<div>
  <h1>hello world!</h1>
  <div v-if="someCondition">
    <p>{{ text }}</p>
  </div>
  <section v-else>
    <p>{{ text }}</p>
  </section>
</div>

// demo2
<div>
  <p v-for="i in list">{{ i }}</p>
</div>
```

导致问题的原因：因为它提取动态标记的部分只会把 p 提进去，然而 div 和 section 是不同的。这时候就会出现会和原来的dom结构对应不上了

#### 思考7. 导致问题的原因找到了吗？如何解决？

```js
// 尽量保持一样的结构
{
  tag: 'div',
  children: [
    { tag: 'h1', children: 'hello world!' },
    // ...
  ],
  dynamicChildren: [
    // v-if 也作为一个 Block
    // 现在，我们有了 Block Tree!
    { tag: 'div', dynamicChildren: []},
    { tag: 'section', dynamicChildren: []},
  ]
}
```

#### 思考8. 并不能彻底解决可能的边界情况，怎么兜底？

> 分治的好处，随时可以退一步海阔天空

```js
<p v-for='i in 100'>{{ i }}</p>
<p v-for='i in list'>{{ i }}</p>
```
上一种可以看做是静态的了，下面那个回归到传统 diff


#### 思考9. 新的数据结构一定对应着新的渲染函数

[playground](https://sfc.vuejs.org/#eyJBcHAudnVlIjoiPHRlbXBsYXRlPlxuICA8aDE+e3sgbXNnIH19PC9oMT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5jb25zdCBtc2cgPSAnSGVsbG8gV29ybGQhJ1xuPC9zY3JpcHQ+In0=)

```js
// 感受一下 Vue3.x 代码

// openBlock
// disableTracking ？？？？ 在 i in list 这个情况会传 true, 要走传统 diff
function openBlock(disableTracking = false) {
  blockStack.push((currentBlock = disableTracking ? null : []));
}

function createBlock(type, props, children, patchFlag, dynamicProps) {
  const vnode = createVNode(type, props, children, patchFlag, dynamicProps, true);
  // 构造 `Block Tree`
  vnode.dynamicChildren = currentBlock || EMPTY_ARR;
  closeBlock();
  // 注意是需要条件的
  if (someCondition === true) {
      currentBlock.push(vnode);
  }
  return vnode;
}

// 不是所有的都可以是 Block 的
if (
  isBlockTreeEnabled > 0 &&
  // avoid a block node from tracking itself
  !isBlockNode &&
  // has current parent block
  currentBlock &&
  // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (patchFlag > 0 || shapeFlag & ShapeFlags.COMPONENT) &&
  // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  patchFlag !== PatchFlags.HYDRATE_EVENTS
) {
  currentBlock.push(vnode)
}
```

现在可以这么写渲染函数了

```js
<div>
  <h1>hello world!</h1>
</div>

const render = ()
  => (openBlock(), createBlock('div', null, [createVNode('h1', null, 'hello world!')]))
```
createVNode 会在 createBlock 中被执行多次，可以做提升

#### 思考10. 上面的渲染函数可以优化吗？

```js
// hoists
let __h1__ = createVNode('h1', null, 'hello world!')

const render = ()
  => (openBlock(), createBlock('div', null, [__h1__]))
```

#### 思考11. 节点提升的有效范围

> 可以理解为，思考哪些 creatBlock 中的参数 是不可以被提升的？

* 动态props
* ref
* 自定义指令
* ...
#### 思考12. 节点不能提升了，我们就眼巴巴望着？

```js
<div>
  <h1 class='foo'>{{ text }}</h1>
</div>

// props hoists
let __cls__ = { class: 'foo' }
const render = () => (openBlock(), createBlock('div', null, [
  createVNode('p', __cls__, ctx.text, PatchFlags.TEXT)
]))
```

#### 思考13. 还可以继续？
 
// blockTree 靶向更新 提升 预先字符串化(createStaticNode)
```js
// 预先字符串化！！！
export function createStaticVNode(
  content: string,
  numberOfNodes: number
): VNode {
  // A static vnode can contain multiple stringified elements, and the number
  // of elements is necessary for hydration.
  const vnode = createVNode(Static, null, content)
  vnode.staticCount = numberOfNodes
  return vnode
}

// 当然是满足一定量的情况，比如超过 20 个满足条件的节点，才能被预先字符串化 用一个变量

const lis = `<li></li><li></li>....`  // 最后 patch 的时候 调用innerHTML

```

#### 思考14. 还有啥可以优化的？

> 还知道 React 的一个坑点吗？

```js
import React from 'react'
import A from './components/A'

function App() {

  return (
    <>
      <A onClick={() => handleSomeClick()} />
    </>
  )
}
```

```js
const handler = () => handleSomeClick()
(openBlock(), createBlock(A, { onClick: handler }))

// v-once
```

此外还有很多优化和值得思考的地方，比如代码层面

思考15. 为啥多了那么多个 compile-* 的文件夹？


---


理清楚思路，那剩下的就是康康代码了，这里我盲猜部分同学对编译原理不是很熟悉。

如果我猜中了，那就先把玩一下 [the super tiny compiler](https://github.com/jamiebuilds/the-super-tiny-compiler/blob/master/the-super-tiny-compiler.js)

好吧，我们还是一起来看看吧 [看这儿](./the-super-tiny-compiler.js)

此外，因为肯定是有很多正则的，推荐一个[可视化工具](https://jex.im/regulex/#!flags=&re=%5E(a%7Cb)*%3F%24)

还有 [vue3 template explorer](https://vue-next-template-explorer.netlify.app/#%7B%22src%22%3A%22%3Cdiv%3EHello%20World!%3C%2Fdiv%3E%22%2C%22options%22%3A%7B%22mode%22%3A%22module%22%2C%22filename%22%3A%22Foo.vue%22%2C%22prefixIdentifiers%22%3Afalse%2C%22hoistStatic%22%3Afalse%2C%22cacheHandlers%22%3Afalse%2C%22scopeId%22%3Anull%2C%22inline%22%3Afalse%2C%22ssrCssVars%22%3A%22%7B%20color%20%7D%22%2C%22compatConfig%22%3A%7B%22MODE%22%3A3%7D%2C%22whitespace%22%3A%22condense%22%2C%22bindingMetadata%22%3A%7B%22TestComponent%22%3A%22setup-const%22%2C%22setupRef%22%3A%22setup-ref%22%2C%22setupConst%22%3A%22setup-const%22%2C%22setupLet%22%3A%22setup-let%22%2C%22setupMaybeRef%22%3A%22setup-maybe-ref%22%2C%22setupProp%22%3A%22props%22%2C%22vMySetupDir%22%3A%22setup-const%22%7D%7D%7D)





AST 使用 DFS 来遍历利用到Visitor 模式，引申到Babel 插件的写法(也有 Visitor) 


### 框架源码阅读思路

1. 先阅读功能实现的主逻辑
2. 边界 case 选一些典型阅读
  

