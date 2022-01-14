## Webpack 

## 我们常说的 chunk 和 bundle 的区别是什么？（划重点）

1. Chunk [demo:](./webpack-run-demo)

Chunk 是 webpack 打包过程中 Modules 的集合，是**打包过程中**的概念。

Webpack 的打包是从一个入口模块开始，入口模块引用其他模块，其他模块引用其他模块....
Webpack 通过引用关系逐个打包模块，这些 module 就形成了一个 chunk.

如果有多个入口模块，可能会产出多条打包路径，那么每条路径就会形成一个chunk.

2. bundle

是我们最终输出的一个或者多个打包好的文件.

3. Chunk 和 Bundle 的关系是什么？（chunk 是过程 bundle 是结果）

大多数情况下，一个chunk会生产一个bundle,但是也有意外
但是如果加了sourcemap,一个 entry, 一个 chunk 对应两个 bundle.

Chunk 是过程中代码块，Bundle 是打包结果输出的代码块. Chunk 在构建完成就呈现 Bundle.
```js
// 这种情况下是一一对应关系
module.exports = {
    mode: 'production',
    entry: {
        index: './src/index.js',
    },
    output: {
        filename: "[name].js"
    },
    // devtool: "source-map" // 这个时候还是一个chunk, 但是产生两个bundle
}
```
多个 entry 怎么办？
多个如果用数组还是一个 chunk 。 一个 key: index 对应一个, value: arr
除非使用两个key
```js
// 这种情况下是一一对应关系
module.exports = {
    mode: 'production',
    entry: {
        index: ['./src/index.js', './src/add.js'], 
        // -------------
        common: './src/common.js',
    },
    output: {
        filename: "[name].js"
    },
    // devtool: "source-map" // 这个时候还是一个chunk, 但是产生两个bundle
}
```

4. Split Chunk
用于分割不同文件

[runtime](https://www.webpackjs.com/concepts/manifest/#runtime)
```js
// 下面这段配置会产生几个 chunk?
module.exports = {
    mode: 'production',
    entry: {
        index: './src/index.js', 
        other: './src/multiply.js',
    },
    output: {
        filename: "[name].js"
    },
    optimization: {
      runtimeChunk: "single",
      splitChunks: { 
        cacheGroups: {
          commons: {
            chunks: "initial",
            minChunks: 2, // 至少被2个chunck引用
            minSize:0 // 这里人为调0
          },
          vendor: {// 分离第三方包
            test: /node_modules/,
            chunks: "initial",
            name: "vendor",
            enforce: true
          }
        }
      }
    }
}
// 1. entry index 
// 2. entry other
// 3. runtimechunk: "single" runtimeChunk 包含了浏览器在运行时最最基础用于引用模块导出模块所包含的代码
// 4. splitChunks common
// 5. splitChunks vendor
```

### Plugin 和 Loader 分别是做什么的？ 怎么工作的？

1. Loader
模块转换器，将非js 模块转化为webpack能识别的js模块。
简单来说它就是为webpack做前置工作的，比如一些 jpg/png /css 这种 webpack 不识别的东西需要一些loader转换成webpack识别的

本质上, webpack loader 将所有类型文件，转换为应用程序**依赖图**可以直接引用的模块

2. Plugin 

拓展插件，webpack运行的各个阶段，都会广播出对应的事件，插件去监听对应的事件。

3. Compiler 

对象，包含了webpack环境的所有配置信息，包含options loader plugins.
webpack 启动的时候实例化，它在全局是唯一的。可以把他理解为webpack的实例。

4. Compliation

包含了当前的模块资源，编译生成资源..等等
webpack 在开发模式下运行的时候，每当监测到一个文件变化，就会创建一次新的Compliation.

拓展：在tapable `addModuleChain() -> addModuleDependencies()`这个过程中，解析js入口文件，通过对应的工厂方法创建模块，保存到Compliation对象上（通过单例模式保证同样的模块只有一个实例）

### 能简单描述一下webpack的打包过程吗？

1. 初始化参数：shell webpack.config.js
2. 开始编译：初始化一个Compiler对象，加载所有配置，开始执行编译
3. 确认入口：根据entry中的配置，找出所有的入口文件
4. 编译模块： 从入口文件开始，调用所有的loader,再去递归的查找依赖
5. 完成模块编译： 得到每个模块被编译后的最终内容以及他们之间的依赖关系（依赖关系就是依赖图）
6. 输出资源：根据得到依赖关系，组装成一个个包含多个module的chunk
7. 输出完成：根据配置，确定要输出的文件名以及文件路径