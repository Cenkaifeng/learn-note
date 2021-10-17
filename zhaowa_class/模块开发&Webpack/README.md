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
   5. configIgnoreWebapck: {watchOptioins: {ignored: /node_modules/}} 写在config里
   
3. 减小打包体积

4. 项目过大如何实现按需打包，按需更新？

***

## part 2 plugin & loader

### 模块化 umd 

### Hmr



### loader & plugin