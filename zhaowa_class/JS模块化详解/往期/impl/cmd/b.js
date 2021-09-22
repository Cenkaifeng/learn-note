define('b', function (require, exports, module) {
  console.log('b load')
  exports.run = function () { console.log('b run') }
})