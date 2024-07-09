// 通过export导出的
export { foo as newFoo, bar as newBar } from './modelA/index.js';
// 通过export default导出的
export { default as ModuleBDefault } from './modelB/index.js';

export * from './modelC/index.js';