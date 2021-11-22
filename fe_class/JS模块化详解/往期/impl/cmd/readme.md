# CMD

代表人物玉伯，代表技术实现 Seajs

## Usage

```js
// sea.js
define('a', function (require, exports, module) {
  console.log('a load')
  exports.run = function () { console.log('a run') }
})

define('b', function (require, exports, module) {
  console.log('b load')
  exports.run = function () { console.log('b run') }
})

define('main', function (require, exports, module) {
  console.log('main run')
  var a = require('a')
  a.run()
  var b = require('b')
  b.run()
})

seajs.use('main')

// main run
// a load
// a run
// b load
// b run
```
