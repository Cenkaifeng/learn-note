'use strict';

var lodash = require('lodash');

const safeGet = (target, path, defaultValue) => {
  return lodash.get(target, path, defaultValue) || defaultValue;
};

exports.safeGet = safeGet;
