import { ModuleBDefault, newBar, newFoo, fooC } from "./model-test/index.js";
// import { newBar, newFoo, fooC } from "./model-test/index.js";

// import { fooB } from "./model-test/modelB/index.js";
// 模块重载
ModuleBDefault.fooB()

newBar()

newFoo()

fooC()

// fooB()

console.log('reload_demo demo.js running')