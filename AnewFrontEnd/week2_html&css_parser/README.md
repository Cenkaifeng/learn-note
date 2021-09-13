##  第二周课程 

回顾一下浏览器架构（流水线）

URL ->(HTTP)-> HTML ->(parse)-> DOM ->(css computing)-> DOM with CSS ->(layout)-> DOM with position ->(render)-> Bitmap

本周要学习的就是第二部分 HTML 和 CSS 的解析

## 1. HTML Parse 解析模块

```js
const parser = require('./parser.js');
let dom = parser.parseHTML(response.body);
```

* 为了方便文件管理，我们把parser 单独拆到文件中
* parser 接受 HTML 文本作为参数，返回一颗 DOM 树 🌲

## 2. 用 FSM 实现 HTML 分析

[HTML Standard 阅读链接](html.spec.whatwg.org/multipage)
Tokenization 这章

```js
const EOF = Symbol("EOF"); // EOF: End Of File 用EOF 做为文件终结的标志

function data(c) {}

module.exports.parseHTML = function parseHTML(html) {
  let state = data;
  for (let c of html) {
    state = state(c);
  }
  state = state(EOF);
};

```

* 我们用 FSM(有限状态机) 来实现 HTML 的分析
* 在 HTML 标准中，已经规定了HTML 的状态
* Toy-Browser 只挑选其中一部分状态，完成一个最简版本

Tips:后续的代码都会在 parser.js 中逐步完成，一些状态机之类的实现不会在文档中贴出


## 3. 解析标签

* 主要标签有个： 开始标签`<start>`、结束`</start>`、 自封闭`<close/>`
* 在这一步我们暂时忽略所有属性

## 4. 创建元素

* 在状态机汇总，除了状态迁移，我们还会要加入业务逻辑
* 我们在标签借宿状态提交标签token
```js

// emit
let currentToken = null;

function emit(token) {
  //if(token.type!="text")
  console.log(token);
}
function tagOpen(c) {
  if (c == "/") {
    return endTagOpen;
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: "startTag",
      tagName: "",
    };
    return tagName(c);
  } else {
    return;
  }
}
```

## 5. 处理属性
* 属性值分为单引号、双引号、无引号三种写法，因此需要较多状态处理
* 处理属性的方式跟标签类似
* 属性结束时，我们把属性加到标签Token上

## 6. 语法分析：用Token构建Dom 树

* 从标签构建DOM树的基本技巧是使用栈
* 遇到开始标签时创建元素并入栈，遇到借宿标签时出栈
* 自封闭节点可是为入栈后立刻出栈
* 任何元素的父元素是它入栈前的栈顶

## 7. 将文本加到 Dom 树中

* 文本节点与自封标签处理类似
* 多个文本节点需要合并
  ```js
  currentTextNode.content += token.content;
  ```

## 8 css 解析

* 遇到style标签时，吧css规则保存起来
* 这里我们调用CSS Parser 来分析 CSS 规则
* 这列我们必须要仔细研究此库分析CSS 规则的格式

## 9 CSS 第二步：添加调用

* 当我们创建一个元素后，立即计算CSS
* 理论上，当我们分析一个元素时，所有CSS 规则已经搜集完毕
* 在真是浏览器中，可能遇到写在body的style标签，需要重新计算CSS 的情况，这里我们忽略

## 