# AMD

> AMD 的代表肯定就是大名鼎鼎的 RequireJS

James Burke 觉得 CMJ 很好，但是在浏览器里玩不转，所以自己提出了一个 AMD 规范

## AMD Usage

```js
define(id?, depencies?, factory);

define('foo', ['utils', 'bar'], function(utils, bar) {
  utils.add(1, 2);
  return {
    name: 'foo'
  }
})
```

## 实现一个符合 AMD 的 rj.js

> 只是核心能力作为实现，具体：https://requirejs.org/docs/api.html

1. 可以直接配置依赖路径

```js
rj.config({ paths: {
  'jquery': 'https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js'
} });

rj(['jquery'], function(jquery) {
  // ....
})
```

2. 加载模块

```js
// RequestJs('')
rj(['moduleA'], function(moduleA) {});
```

3. 定义模块

```js
rj('moduleA', [], function() {
  return 'hello zhuawa!';
})
```

## 行为

```js
// RequireJS
define('a', function () {
  console.log('a load')
  return {
    run: function () { console.log('a run') }
  }
})

define('b', function () {
  console.log('b load')
  return {
    run: function () { console.log('b run') }
  }
})

require(['a', 'b'], function (a, b) {
  console.log('main run') // 🔥
  a.run()
  b.run()
})

// a load
// b load
// main run
// a run
// b run
```

记录一下：
1. require 的时候加载了依赖的模块

> 一些可以用来测试的 CDN 地址
> systemjs -> https://cdn.bootcdn.net/ajax/libs/systemjs/6.8.3/system.min.js
> lodash -> https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.min.js
