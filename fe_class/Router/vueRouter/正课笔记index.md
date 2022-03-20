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


## 现阶段的路由

单页应用 spa

不仅在页面的交互中是不断刷新页面的，就连页面跳转`router.push`也是不刷新页面。

www.demo.com/index => cdn => index.html app.js
www.lubai.com/list => cdn => list.js

路由访问
webpack => 静态文件.js img html .css 上传到 oss => cdn

cdn 根据Nginx 配置返回指定资源
如果你的瞬发流量特别大，你要考虑瞬间极大并发量会不会击穿你的原服务器（504/503），会不会造成原服务器阻塞，由此产生大成本扩容机器，购买集群。如果你只是静态应用不走服务器，你只需要买cdn带宽（流量付费）

## 前端路由的特性

1. 根据不同的url渲染不用的内容
2. 不刷新页面

优化指标：首屏1m以下，跳转100ms内

### Hash 路由原理及其实现

1. 面试

* hash 路由的改变，会在url上有什么表现吗？
    * 会添加#path
* hash 具体是怎么改变路由的 HTML 元素 ？ js?
    * window.addEventlistener('hashchange', function(){})
* 如何通过js监听hash路由改变呢？
  * a标签
  * js location.hash=''

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
pushState 新增 => A B => A B C
replaceState 覆盖/代替 A B => A C

1. 可以使用Popstate事件来监听url变化（onpopstate)
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
类似于动态的组件.

找到当前路径对应的component, 并展示出来.

所有路由的产出（路由出口）


1. 异步加载about.vue

首屏 app.js chunk-vendors 2.4MB 159kB
About about.js 21kB

2. 同步加载about.vue

首屏 app.js chunk-vendors 2.4MB 180KB
About  
```js
import(/* webpackChunkName: "about" */ "../views/About.vue");
```

## 导航守卫的执行顺序

1. [组件] 前一个组件的beforeRouteLeave
2. [全局] router.beforeEach
3. [路由参数变化] beforeRouteUpdate (如果有路由参数的变化)
4. [配置文件里] (下一个组件的) beforeEnter
5. [组件] beforeRouteEnter
6. [全局] afterEach


## scollBehavior生效的条件

1. 异步加载组件

2. 同步加载


## 导航收尾的执行顺序

1. [组件] 前一个组件的beforeRouteLeave
2. [全局] router.beforeEach
3. [路由参数变化] beforeRouteUpdate
4. [配置文件里] beforeEnter
5. [组件] beforeRouteEnter
6. [全局] afterEach
// watch 最后

## scollBehavior生效的条件

1. 浏览器支持的History api
2. 点击浏览器的返回/前进按钮
3. router-link是不可以触发的


# Q: 用户在刷星浏览器时，会重新加载不存在的路径吗？ - 会
a. 一定会重新请求 -> 必然会碰到请求到前端子路径问题
b. 服务器对于未配置的子路由都指向根路径


# Q: 如何让vue router 在刷新页面的时候保持上一次的传参?
这种方式传递的参数会在地址栏的 url 后面显示 ?xx=xxx
1. 通过 params 传参
```js
{ 
    path: '/detail/:id',  //若id后面加?代表这个参数是可选的
    name: 'detail', 
    component: Detail 
}
```
2. query
```js
// 路由配置
{ 
    path: '/detail', 
    name: 'detail', 
    component: Detail 
}

// 列表页
goDetail(row) {
    this.$router.push({
        path: '/detail',
        query: {
            id: row.id
        }
    })
}

// 详情页
this.$route.query.id
```
3. props 配合组件路由解耦
```js
// 路由配置
{ 
    path: '/detail/:id',
    name: 'detail', 
    component: Detail,
    props: true // 如果props设置为true，$route.params将被设置为组件属性
}

// 列表页
goDetail(row) {
    this.$router.push({
        path: '/detail',
        query: {
            id: row.id
        }
    })
}

// 详情页
export default {
    props: {
        // 将路由中传递的参数id解耦到组件的props属性上
        id: String
    },
    mounted: {
        console.log(this.id)
    }
}
```