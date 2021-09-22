// import { safeGet } from './a'

// safeGet({}, 'a.b.c');

import('./a').then(({ default: d }) => {
  console.log(d)
})