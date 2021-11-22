define('a', ['lodash'], function(_) {
  console.log('module a load');

  return {
    str: function() {
      console.log('a module run');
      return _.repeat('>>>>>>>>>>', 20)
    }
  }
})