define(['exports', 'lodash'], function (exports, lodash) { 'use strict';

  const safeGet = (target, path, defaultValue) => {
    return lodash.get(target, path, defaultValue) || defaultValue;
  };

  exports.safeGet = safeGet;

});
