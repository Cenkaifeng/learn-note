# 模块化开发与Webpack

## part 1 概念与基本使用
### 核心概念

Webpack 把一切静态资源视为模块，所以又叫做静态模块打包器。通过入口文件递归构建依赖图，家住不同的loader处理响应的文件源码，最终输出目标环境可执行的代码。

通常我们使用其构建项目时，维护的是一份配置文件，如果把整个Webpack 功能视为一个复杂的函数，那么这份配置就是函数的参数，我们通过修改参数来控制输出的结果。

在开发环境中，为了提升开发效率和体验，我们希望源码的修改能实时且无刷新地反馈在浏览器中，这种技术就是HMR(Hot Module Replacement)。

借助与 loader/plugin, 我们可以差异化处理不同的文件类型。如果有个性化需求，还可以实现自定义的loader/plugin

### 安装 Webpack

创建文件夹。。。。



### 面试题

1. plugin loader 区别
2. 优化编译速度 
   1. DLLPlugin 用了windows的动态编译库，实际上也是通过dll缓存
   2. happypack (电脑支持多核可以用这个)
   3. HardSourceWebpackPlugin（官推）构建速度变快，但是页面代码更改后对应的编译会变慢
   4. worker = thread-loader  https://webpack.docschina.org/loaders/thread-loader/#examples 通过将loader 新增为新进程来提速
   5. configureWebpack: {watchOptioins: {ignored: /node_modules/}} 写在config里 (vue-cli vue.config.js 配置)
   
3. 减小打包体积

4. 项目过大如何实现按需打包，按需更新？

***

## part 2 plugin & loader

### 模块化 umd 

### Hmr

两个时间关键点

首次启动（冷启动）：

源码 => 编译（compiler) => bundle.js 产物（这里是默认不分割代码的结果）=> 浏览器访问端口 => 服务器返回静态资源（html, css, js等）
浏览器与 dev-server 建立 Socket 连接,首次收到 hash

更新：

源码修改 => 层梁编译（compiler) => HMR（基于新内容生成`[hash].update.js(on)`) => 想浏览器推送消息（包括新的hash) => 浏览器创建 script 标签下载`[hash].update.js` => 调用页面更新的方法（module.hot.accept)

### loader & plugin

#### Plugin 

特点：需要导入并实例化，通过狗子可以涉及整个构建流程，因此贯穿整个构建范围。

本质：原型上具有apply 方法的居民构造函数或类。

再详细点，原型上的 apply 方法就是 “通过 webpack 在 **不同阶段** 提供的 **事件钩子** 来操纵其 **内部实例** **特定的数据**，最后调用 webpack 提供的 **回调** ” 的函数

#### Loader

特点：无需导入，针对特定文件进行处理，输入文件内容并输出处理后的内容，交给下一个loader处理。
本质：具有返回值的纯函数。

