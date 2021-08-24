# Vue 路由及异步组件

## 背景

ssr

www.jervis.com/index => php服务器 => index.html
            /parent => php服务器 => parent.html

缺点：
1. 维护特别麻烦，没有点后端分离。
2. 服务器压力大
3. 没有前后端分离，写作流程不清晰

优点：

1. SEO 效果好，因为已经完全渲染好的页面。
2. 用户看到首屏的耗时会比较小。


现在前端状况：其实有点从服务端渲染的多页 -> 单页应用 -> ssr


单页应用 spa

不仅在页面的交互中
// TODO: 回放里把cdn 描述加上


## 前端路由的特性

1. 根据不同的url渲染不用的内容
2. 不刷新页面

优化指标：首屏1m以下，跳转100ms内

### Hash 路由原理及其实现

1. 面试

* hash 路由的改变，会在url上有什么表现吗？
* hash 具体是怎么改变路由的 HTML 元素 ？ js?
* 如何通过js监听hash路由改变呢？

2. 特性
* url中的hash值至少客户端/浏览器端的一种状态，向服务器发送请求的时候，hash部分是不会懈怠的
* hash值的更改，并不会导致页面的刷新
* hash值的更改，会在浏览器的访问历史中增加记录
* hash值的更改，通过hashchange事件

3. 例子

www.lubai.com/#/parent
www.lubai.com/#/child


<a href="#"></a>

location.hash = '#hash-change';

### history路由

hash虽然能解决问题，但是带有#不太美观。

window.history.back();
window.history.forward();
go(number)
pushState 新增
replaceState;   替代、覆盖

1. 可以使用Popstate事件来监听url变化
2. pushState 和 replaceState并不会触发Popstate变化
3. 哪些情况会触发popstate?
    1. 浏览器的前进、回退按钮
    2. history back forward go

参数

1. state: 是一个对象，是一个与指定网址相关的状态对象，如果不需要可填null
2. title: 新页面标题，null
3. url: 新网址，必须与当前页面处在同一个域，浏览器的地址栏会显示这个网址

部署history路由的时候,要记住，要使你的路由中所有Path都访问index.html文件


# VueRouter

1. vue router 从列表浏览了一段时间，点击进入一个详情页，然后返回的时候，我期望回到列表页还是停留在原来浏览位置，你可以怎么做？

* keep-alive
* localStorage/sessionStorage + scrollTop + scrollTo
* scrollBehavior

2. router-view是什么？
类似动态的组件。 所有路由的产出（路由出口）

找到当前路径对相应的component并展示出来

1. 异步加载组件

2. 同步加载


## 导航收尾的执行顺序

1. [组件] 前一个组件的beforeRouteLeave
2. [全局] router.beforeEach
3. [路由参数变化] beforeRouteUpdate
4. [配置文件里] beforeEnter
5. [组件] beforeRouteEnter
6. [全局] agterEach
// watch 最后

## scollBehavior生效的条件

1. 浏览器支持的History api
2. 