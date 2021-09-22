define('a', function (require, exports, module) {
  console.log('a load')
  exports.run = function () { console.log('a run') }
})