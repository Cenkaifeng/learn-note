const path = require('path');

const resolvePath = path.resolve('a', 'b', 'c');
const joinPath = path.join('a', 'b', 'c');

console.log(resolvePath);
console.log(joinPath);

console.log(__dirname);
console.log(__filename)