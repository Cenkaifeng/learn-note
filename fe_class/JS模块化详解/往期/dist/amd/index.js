define(['require'], function (require) { 'use strict';

  // import { safeGet } from './a'

  // safeGet({}, 'a.b.c');

  new Promise(function (resolve, reject) { require(['./a-a1dbb12f'], resolve, reject) }).then(({ default: d }) => {
    console.log(d);
  });

});
