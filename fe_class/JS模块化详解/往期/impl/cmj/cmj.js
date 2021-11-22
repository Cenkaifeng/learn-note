// webpack -> cmj -> broswer -> iife

const cache = {}

(function(modules) {
  const require = (mn) => {
    if (cache[mn]) return cache[mn].exports;
    let module = cache[mn] = {
      name: mn,
      exports: {}
    }

    modules[mn](module, exports, require)

    return module.exports
  }

  return require('index.js')

})({
  'a.js': function(module, exports, require) {
     // ...
  }
})