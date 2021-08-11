借鉴了vue语法功能，支持vue书写特性

### 一、生每年广州启（同与暗生小程序）


#### 应用周期

* onLaunch 首次打开
* onShow 初始化完成
* onHide 切换

#### 页面周期

* onLoad 加载页面
* onShow 前后台（页面）切换
* onHide 前后台（页面）切换
* onUnLoad 重定向 / 路由切换
* onPullDownRefresh 下拉
* onReachBottom 上拉
* onShareAppMessage 分享

#### 问题
#### 1. 简单说说小程序生命周期
#### 2. double thread 运行机制
* view thread + appService thread
* notify、 sendData 对应周期

##########################################


###  二、 数据层 - 数据绑定


#### 原生小程序
```js
this.setData({label:'label'});
```

#### wepy
```js
this.label = 'label';
```

#### 1. 如何做到监听数据改变，多次setData的时候，通信的次数是一次还是多次？
* 在一次渲染周期内，收到多次setData的话，只会渲染一次
* jscore -> native -> webview 的流程



#### 2. 渲染周期 -> 如何优化小程序数据通信，以此提升页面性能。
* 减少setData的调用，合并多个setData
* 与界面渲染无关的数据最好不要放在data里
* 有些数据不再页面中展示，包含复杂数据结构或者超长字符串，则不应使用setData来设置这些数据（run jscore 会读取）


#### 3. 还有其他那些地方是可以放置无关数据的
常量、临时变量、全局变量


#### 4. 为什么data设置长字符串，不显示也会影响页面性能？
* evaluateJavascript? 会解析传入的长数据，对js引擎资源会有占用


#### 5. wepy 如何做数据绑定优化的？

* wepy内部实现了一个脏数据检查机制，函数执行完成之后 -> data-check
* newValue 和 oldValue 做比较，如果有变化， 就会加入到readyToSet队列中，在队列里做数据改变的动作，最后统一做一个setData
* 同一时间只允许一个脏值检查流程进行

#### 6. wepy中异步数据如何更新
* $apply()

```js
setTimeout(() => {
    this.label = 'label';
    this.$apply();
})
```

#################################################################


### 三、文件分布
#### wepy 主文件 .wpy => style + template + script

#################################################################

### 四、 网络层 - 网络请求（原生wx.request）

#### wepy 有一套自建api拦截器

```js
// config + success + fail + complete
this.intercept ('request', {
    config() {},
    success() {}
})
```


#### 1. 项目中如何拦截请求做预处理（额外增加请求参数、增加时间戳）

#### 2. 请求返回后如何对数据进行加工（判断超时，返回数据增加）


### 五、结构层 - mixin混合

#### wepy实现了同vue一样，可以复用抽离的方法
* 默认式混合 - data/components 
    1. page和mixin都定义了参数a,看page
    2. mixin中定义了，page中未定义的变量b, 看mixin
* 兼容式混合 - methods
    1. 先响应组件本身的事件，再响应mixin中的事件

#### 1. （事件）相应顺序是如何的？
* mixin事件的响应顺序和vue是相反的， vue:先指向mixin函数，再指向组件本身函数
* 兼容性混合中，先响应混合事件

################################################################


### 六、结构层 - 组件
#### wepy的组件化 < = > js原生模块化
* bindtap = "handleClick" 模板a 和模板 b 同样都绑定了click方法，耦合了需要传入一个变量来判断，不利于后期维护

```js

a.wpy
    - data: {d:d}
    -methods: m()

b.wpy
    - data: {d:d}
    -methods: m()

// compile 
a.wxml + a.wxss +a.js
    -data: $a.$d
    -methods: $a.$m();
b.wxml + b.wxss +b.js
    -data: $b.$d
    -methods: $b.$m();
```



* import 引入， components 
* s实现了循环module <repeat for="{{list}}">
* computed, watcher, props, $broadcast, $emit, slot


#### 1. wepy 如何实现组件化（如上）
#### 2. wepy组件有何特殊性 or wepy组件化有过程中框架的不足
* wepy中组件都是 静态组件 => 组件ID唯一标识一个组件实例 => 在同一个页面中无法独立引用多个相同id的组件

```js
// error
<template>
    <view>
        <comp></comp>
    </view>
    <view>
        <comp></comp>
    </view>
</template>
<script>
    import comp from './comp';
    // ... 
</script>

// ok
<template>
    <view>
        <comp></comp>
    </view>
    <view>
        <newComp></newComp>
    </view>
</template>
<script>
    import comp from './comp';
    // ... 
    {
        comp: comp,
        newComp: comp
    }
</script>


```

#### 3. list循环渲染 or repeat 循环有何不足？
* 不支持在repeat中使用props/computed/watch等
```html
// error
// list.wepy

<view>{{ item.name }}</view>

// index.wpy
<repeat for="{{list}}">
    <list :item.sync="item">
</repeat>

// ok
// list.wpy
<repeat for="{{list}}">
    <view>{{ item.name }}</view>
</repeat>

// index.wpy
<list :item.sync="item">
// 组件静态 

data() {
    return {

    }
} //为什么别的框架data是组件或者对象，而vue里data是个函数？ 单独的作用域防止污染。
```

##########################################################

七、源码分析

##### 源码结构
编译流程
