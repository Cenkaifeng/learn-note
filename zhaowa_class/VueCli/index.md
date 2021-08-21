## vue cli

cli 是一种通过命令行来交互的工具应用，全程是Command Line Interface.比较常见的就是create-react-app, vue-cli 等， 他们都能够将一段js脚本，通过封装为可执行代码的形式，进行一些操作。

使用cli 之后，能快速的创建一些我们业务中的样板文件，比如快速创建一个项目内容，配置公共的eslint、webpack等等配置工具。

在封装这些内容之前，我们需要使用如下几个库

* commander: 命令行中的参数获取
* inquirer: 命令行的表单
* chalk: 命令行的可变颜色效果
* clui: 命令行中的loading效果
* child_process: node 原生模块，提供一些方法让我们能够执行新的命令

child_process 中有一些方法，比如 exec 等，`exec`方法用于新建一个子进程，然后缓存它的运行结果，运行借宿后调用回调函数。

我们这里可以使用 execSync, 它能够执行一些我们 Linux 中的命令。
commander 对命令进行了解析，可以让我们比较方便的进行命令行参数的获取，读取和解析 chalk 对应的是命令行文字的颜色更改

clui是一个命令行中展示loading效果的库

## @vue/cli 相关使用
********************************

Vue CLI 是一个基于Vue.js 进行快速开发的完整系统，提供：
    * 通过@vue/cli 搭建交互式的项目脚手架。
    * 通过@vue/cli + @vue/cli-service-global 快速开始零配置原型开发。
    * 一个运行时依赖（@vue/cli-service)一个丰富的官方插件集合，集成了前段生态中最好的工具。
    * 一套完全图形化的创建和管理Vue.js 项目的用户界面。

我们能通过 `npm i @vue/cli -g` 来进行安装，安装成功之后，我们就能使用vue这个命令行。

```shell
npm install -g @vue/cli-service-global

# 启动一个服务器
vue serve xxx.vue
# 将目标文件构建成几个生产环境的包
vue build xxx.vue

# 创建一个由 vue-cli-service 提供的新项目
vue create mytest
```
你会被提示选取一个 preset。你可以选默认的包含基本的Babel + ESLint 设置的 preset, 也可以选“手动选择特性”来选取需要的特性。这个默认的设置非常适合快速创建一个新项目的原型，而手动设置则提供了更多的选项，它们是面向生产的项目更加需要的。

```shell
# 创建一个由 vue-cli-service 提供支持的新项目
vue create mytest

# 使用UI 界面
vue ui
```
### 插件和预设配置插件

Vue CLI 使⽤了⼀套基于插件的架构，package.json中依赖都是以 @vue/cli-plugin- 开头的。插件可以
修改内部的 webpack 配置，也可以向 vue-cli-service 注⼊命令。在项⽬创建的过程中列出的特性，绝
⼤部分都是通过插件来实现的。

### 预设配置

Vue CLI 预设配置是⼀个包含创建新项⽬所需的预定义选项和插件的 JSON 对象，让⽤户⽆需在命令 提
示中选择它们。在 vue create 过程中保存的预设配置会被放在你的 home ⽬录下的⼀个配置⽂件中
(~/.vuerc)。你可以通过直接编辑这个⽂件来调整、添加、删除保存好的配置。

```shell
# 在现有的项目中安装插件
vue add eslint
```

```json
{
    "useConfigFiles": true,
    "router": true,
    "vuex": true,
    "cssPreprocessor": "sass",
    "plugins": {
        "@vue/cli-plugin-babel": {},
        "@vue/cli-plugin-eslint": {
            "config": "airbnb",
            "lintOn": ["save", "commit"] 
        }
    }
}
```
CLI 服务
在⼀个 Vue CLI 项⽬中，@vue/cli-service 安装了⼀个名为 `vue-cli-service` 的命令。你可以在
npm
scripts 中以 `vue-cli-service` 、或者从终端中以 `./node_modules/.bin/vue-cli-service` 访问这个命令。

```json
{
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build"
   }
}
npm run serve
```

**************************************
在package.json 用bin 配置将命令与脚本映射起来
## package.json 
```json
  "bin": {
      "cli": "./index.js"
  },
```
## 开发浏览器兼容性

⼀个默认的 Vue CLI 项⽬会使⽤ `@vue/babel-preset-app`，它通过 @babel/preset-env 和 browserslist

配置来决定项⽬需要的 polyfill。
默认情况下，它会把 `useBuiltIns: 'usage'` 传递给 `@babel/preset-env` ，这样它会根据源代码中
出现的 语⾔特性⾃动检测需要的 polyfill。这确保了最终包⾥ polyfill 数量的最⼩化。然⽽，这也意味着
如果其 中⼀个依赖需要特殊的 polyfill，默认情况下 Babel ⽆法将其检测出来。
如果有依赖需要 polyfill，你有⼏种选择: 如果该依赖基于⼀个⽬标环境不⽀持的 ES 版本撰写: 将其添加
到 vue.config.js 中的

`transpileDependencies` 选项。这会为该依赖同时开启语法语法转换和根据使⽤情况检测 polyfill。
如果该依赖交付了 ES5 代码并显式地列出了需要的 polyfill: 你可以使⽤ @vue/babel-preset-app 的
polyfills 选项预包含所需要的 polyfill。注意 es6.promise 将被默认包含，因为现在的库依赖 Promise
是⾮常普遍的。
```js
// babel.config.js
module.exports = {
    presets: [
        [
            '@vue/app',
            {
                polyfills: [
                    'es6.promise',
                    'es6.symbol'
                ]
            }
        ]
    ]
}
```
如果该依赖交付 ES5 代码，但使⽤了 ES6+ 特性且没有显式地列出需要的 polyfill (例如 Vuetify): 请使⽤`useBuiltIns: 'entry'` 然后在⼊⼝⽂件添加 `import '@babel/polyfill'`。这会根据 browserslist ⽬标导⼊所有 polyfill，这样你就不⽤再担⼼依赖的 polyfill 问题了，但是因为包含了⼀些没有⽤到的 polyfill 所以最终的包⼤⼩可能会增加。

## 现代模式

有了 Babel 我们可以兼顾所有最新的 ES2015+ 语⾔特性，但也意味着我们需要交付转译和 polyfill 后
的包以⽀持旧浏览器。这些转译后的包通常都⽐原⽣的 ES2015+ 代码会更冗⻓，运⾏更慢。现如今绝
⼤多数现代浏览器都已经⽀持了原⽣的 ES2015，所以因为要⽀持更⽼的浏览器⽽为它们交付笨重的 代
码是⼀种浪费。
Vue CLI 提供了⼀个“现代模式”帮你解决这个问题。以如下命令为⽣产环境构建:
`vue-cli-service build --modern`
Vue CLI 会产⽣两个应⽤的版本：
* ⼀个现代版的包，⾯向⽀持 ES modules 的现代浏览器
* 另⼀个旧版的包，⾯向不⽀持的旧浏览器

## HTML Preload

### `preload` 
是⼀个 HTML5 的新特性，是⼀个新的标签，对于浏览器加载来说，对于主资源HTML和CSS的
优先级最⾼，其他资源优先级不统⼀。我们使⽤ `preload` 属性，可以让⽀持的浏览器提前加载资源，但
加载时并不执⾏，等待需要时才进⾏执⾏。
这样做的好处就是我们可以将加载和执⾏分离开，同时也可以控制提前加载⼀些⼤型⽂件，防⽌使⽤时
获取的⻚⾯闪烁。
我们就可以⽤来指定⻚⾯加载后很快会被⽤到的资源，所以在⻚⾯加载的过程中，我们希望在浏览器开
始主体渲染之前尽早 `preload。`
默认情况下，⼀个 Vue CLI 应⽤会为所有初始化渲染需要的⽂件⾃动⽣成 preload 提示。 这些提示会被
`@vue/preload-webpack-plugin` 注⼊，并且可以通过 `chainWebpack` 的
`config.plugin('preload')` 进⾏修改和删除。

### Prefetch
是⼀种 resource hint，⽤来告诉浏览器在⻚⾯加载完成后，利⽤空闲时间提前获取⽤户未来可能会访
问的内容。

默认情况下，⼀个 Vue CLI 应⽤会为所有作为 async chunk ⽣成的 JavaScript ⽂件 (通过动态
import() 按需 code splitting 的产物) ⾃动⽣成 prefetch 提示。
这些提示会被` @vue/preload-webpack-plugin` 注⼊，并且可以通过 `chainWebpack` 的
`config.plugin('prefetch')` 进⾏修改和删除。
举个例⼦：
```js
// vue.config.js
module.exports = {
    chainWebpack: config => {
    // 移除 prefetch 插件 config.plugins.delete('prefetch')
    // 或者
    // 修改它的选项:
        config.plugin('prefetch').tap(options => {
            options[0].fileBlacklist = options[0].fileBlacklist || [] 
            options[0].fileBlacklist.push(/myasyncRoute(.)+?.js$/)
            return options
        })
    }
}
```

当 prefetch 插件被禁⽤时，你可以通过 webpack 的内联注释⼿动选定要提前获取的代码区块:
webpack 的运⾏时会在⽗级区块被加载之后注⼊ prefetch 链接。
`import(/* webpackPrefetch: true */ './someAsyncComponent.vue')`

## 处理静态资源

静态资源可以通过两种⽅式进⾏处理: 在 JavaScript 被导⼊或在 template/CSS 中通过相对路径被引⽤。这类引⽤会被 webpack 处理。
当你在 JavaScript、CSS 或 .vue ⽂件中使⽤相对路径 (必须以 . 开头) 引⽤⼀个静态资源时，该资源将会
被包含进⼊ webpack 的依赖图中。在其内部，我们通过 file-loader ⽤版本哈希值和正确 的公共基础
路径来决定最终的⽂件路径，再⽤ url-loader 将⼩于 4kb 的资源内联，以减少 HTTP 请求的数量。
放置在 public ⽬录下或通过绝对路径被引⽤。这类资源将会直接被拷⻉，⽽不会经过 webpack 的
处理。
## CSS 相关

Vue CLI 项⽬天⽣⽀持 PostCSS、CSS Modules 和包含 Sass、Less、Stylus 在内的预处理器。
所有编译后的 CSS 都会通过 css-loader 来解析其中的 `url()` 引⽤，并将这些引⽤作为模块请求来 处
理。这意味着你可以根据本地的⽂件结构⽤相对路径来引⽤静态资源。
你可以在创建项⽬的时候选择预处理器 (Sass/Less/Stylus)。
如果当时没有选好，内置的 webpack 仍然会被预配置为可以完成所有的处理。

## webpack 相关
调整 webpack 配置最简单的⽅式就是在 vue.config.js 中的 configureWebpack 选项提供⼀个对象，该
对象将会被 webpack-merge 合并⼊最终的 webpack 配置。

```js
// vue.config.js
module.exports = {
    configureWebpack: {
        plugins: [
            new MyAwesomeWebpackPlugin()
        ]
    } 
}
```
## 构建⽬标
当你运⾏ `vue-cli-service build` 时，你可以通过 `--target` 选项指定不同的构建⽬标。应⽤模式
是默认的 模式。在这个模式中:
index.html 会带有注⼊的资源和 resource hint 第三⽅库会被分到⼀个独⽴包以便更好的缓存 ⼩于 4kb
的静态资源会被内联在 JavaScript 中 public 中的静态资源会被复制到输出⽬录中

## 部署

如果你独⽴于后端部署前端应⽤——也就是说后端暴露⼀个前端可访问的 API，然后前端实际上是纯 静
态应⽤。那么你可以将 dist ⽬录⾥构建的内容部署到任何静态⽂件服务器中，但要确保正确的
publicPath。

### 软链接 `npm link` 

  临时软链指向

  linux 中分为硬链接和软连接 `ln -s link1 link2`
  硬链接指拷贝文件实际位置，文件会成为完全独立的两个文件，内容一样
  而软连接如下，更类似于一种指针指向(类似js中的对象引用)

```bash

C:\Program Files\nodejs\cli -> C:\Program Files\nodejs\node_modules\cli\index.js
C:\Program Files\nodejs\node_modules\cli -> d:\workTest\learn-note\zhaowa_class\VueCli\cli

```

