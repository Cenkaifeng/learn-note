1. Loader
模块转换器，将非js 木块转化为webpack能识别的js模块。

本质上, webpack loader 将所有类型文件，转换为应用程序**依赖图**可以直接引用的模块

2. Plugin 

拓展插件，webpack运行的各个阶段，都会广播出对应的事件，插件去监听对应的事件。

3. Compiler 

对象，包含了webpack环境的所有配置信息，包含options loader plugins.
webpack 启动的时候实例化，它在全局是唯一的。可以把他理解为webpack的实例。

4. Compliation

包含了当前的模块资源，编译生成资源
webpack 在开发模式下运行的时候，每当监测到一个文件变化，就会创建一次新的Compliation.

### 能简单描述一下webpack的打包过程吗？

1. 初始化参数：shell webpack.config.js
2. 开始编译：初始化一个Compiler对象，加载所有配置，开始执行编译
3. 确认入口：根据entry中的配置，找出所有的入口文件
4. 编译模块： 从入口文件开始，调用所有的loader,再去递归的查找依赖
5. 完成模块编译： 得到每个模块被编译后的最终内容以及他们之间的依赖关系
6. 输出资源：根据得到依赖关系，组装成一个个包含多个module的chunk
7. 输出完成：根据配置，确定要输出的文件名以及文件路径