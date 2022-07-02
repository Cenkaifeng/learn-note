
TODO: 关于性能优化, 逐步把 processOn 对应性能优化的内容总结进来，逐步丰满这个笔记

### vue 为什么比 react 性能好？

### 图片格式优化

- png jpg jpeg gif webp base64 icon: svg
这些格式特点是什么？
为什么用 base64 什么时候用？
为什么 大1/3

### 优化指标？
FP
FCP
FMP
TTI
onLoad
DCL


### 维度1：从 url 开始
- unload 阶段， redirect 阶段
- app cache 阶段
  - 协商缓存，强缓存。(那种协商缓存好？好在哪？)
    - hash/ time 
    - 启发式缓存？
  - 持久化
- dns 阶段
  -
- tcp 阶段，request, response 阶段
  - connectStart -- responseEnd;
  - http 1.1
  - http 2
  - http 3
  - 包体积 main.min.js 如何缩小加载js到极致
    - code splitting
    - uglyfily
    - preset-env
    - common module (怎么异步加载，按需加载模块)
  - 如何和 tcp 请求数量之间做 trade off
- dom 阶段
  - async defer 标签并行下载延迟解析
  - js位置 
  - code splitting(不该加载的东西 参考 coverage指标)
### CLS FID LCP （2020年中提出的新指标 包括cls）
累计偏移量
首次输入延迟


- fragment
- img 
减少回流

哪些会导致回流
- 首次喧嚷
- 窗口变化，元素尺寸变化
- 元素内容变化，字体变化
- 添加、删除dom

clientWhide / clientHeight
offSetWidth / offSetHeight
getBoundingClientRect()

如何避免？？
尽可能不在前面改变dom(页面上段结构)
避免使用table布局
动画效果，absolute fixed

GPU 如何触发渲染？
