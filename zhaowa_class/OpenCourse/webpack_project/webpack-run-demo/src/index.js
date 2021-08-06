import Add from './add.js';
import Multiply from './multiply.js';
import { once } from 'lodash';

const onceAdd = once(Add);
const addResult = onceAdd(1, 2);
const mulResult = Multiply(2, 3);

console.log(addResult);
console.log(mulResult);