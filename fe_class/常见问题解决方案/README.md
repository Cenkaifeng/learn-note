# 数据埋点方案、监控方案

数据采集 -> 上报 -> 分析 -> 监控

Btn click 

isLogin: true/false
reole:


产品/数据分析同学定义埋点 埋点名称/埋点携带的字段、什么时候触发埋点
前端 需求方会和前端同学确认，当前埋点是否可行，是否可写。


1. 埋点的标识信息 eventId eventType: click

pv:曝光 page view (每次页面的浏览就是一次pv) A用户访问页面2 次 2pv
uv: user page view (根据用户去重)， A用户访问页面2次， 1uv

2. 业务自定义的信息，电商网站 sku 一双鞋，颜色：红，率，size;大小


3. 通用的设备信息、用户信息

userId, deviceId, useragent, timestamp, location

4. 一般怎么上报呢？

    1. 实时上报，调用report之后立即发送请求
    2. 延时上报，sdk内部统一收集业务方要上报的信息，依托于防抖或者在浏览器空闲时间（requestIdleCallback）或者在浏览器卸载前去统一上报，上报失败做一些（catch）补偿措施。

1. 代码埋点
2. 无埋点（监听dom结构）（复杂的地方在分析阶段）
     （性能问题）
     无法太过个性化

3. 可视化埋点

（埋点丢失行为的补偿）
后台 iframe 嵌入线上的业务页面，

## 代码埋点

错误信息大概包含哪些类型

1. js error window.addEventListener('error')
2. resource error window.addEventListener('error')
3. unhandlePromise 
   1. new Promise().then()// catch 不到 Promise的错误
4. 主动上报的

script
link
image

### 实现

代码

## 无埋点

// 一般是有封装好的SDK 由业务方去引用

监听所有时间，上报所有点击事件以及对应的事件所在的元素，最后通过后台去分析数据。

GrowingIO, 神策， 逐个IO, Heep 易观

声网

### 概念

1. 监听window元素

```js
window.addEventListener('click', (event) => {
    const targe = event.srcElement || event.target;
    const xPath =getCPath(target);

    report({xPath})
}, true);// true 监听捕获

```

2. 获取元素唯一标识xPath

```js
function getXPath(element) {
    if (element.id) {
        return '//*[@id=\"' + element.id + '\"]'
    }

    if (element == document.body) {
        return '/html/' + element.tagName.toLowerCase();
    }

    let currentIndwx = 1;
    let siblings = element.parentNode.childNodes;

    for (let sibling of siblings) {
        if (sibling == element ) {
            return getXPath(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + curentIndex + ']';
        } else if(sibling.nodeType == 1 && sibling.tagName == element.tagName) {
            currentIndex++;
        }
    }
}

```

### 实现

# 列表无限滚动方案

1. 下拉到底，继续加载数据并且拼接
2. 数据太多，要做虚拟列表的展示

## 虚拟列表

虚拟列表的实现，实际上就是在首屏加载的时候，只加载可视区域内需要的列表项.
当滚动发生的时候，动态计算，获得可视区域内的列表项，并且将非可是区域内存在的列表项删除.

1. 计算出当前可视区域起始数据的索引， startIndex
2. 计算出当前可视区域结束数据的索引， endIndex
3. 计算当前可视区域内的数据，并且渲染到页面中
4. 计算startIndex对应的数据，在整个列表中的便宜位置 startOffset，并且设置到列表上

### 滚动

由于只是对可视区域内的列表进行渲染，为了保持列表容器的高度并可正常的触发滚动，

需要一个元素展示真正渲染的数据
需要一个元素来撑开高度保证滚动
容器

1. infinite-list-container
2. infinite-list-phantom 站位元素，撑开高度
3. infinite-list

### 监听滚动

监听 infinite-list-container滚动时间，获取scrollTop

可视区域的高度：screenHeight
列表项的高度：itemSIze
列表数据：listData
当前的滚动位置：scrollTop

### 得出最想要的数据

列表总高度： listHeight = listData.length * itemSize
可显示的列表项：visibleCount = Math.ceil(screenHeight / itemSize)
数据的起始索引：startIndex = Math.floor(scrollTop、itemSize)
数据的结束索引： endIndex = startIndex + visibleCount
列表真正显示数据：visibleData = listData.slice(startIndex, endIndex)

startOffset, 通过css来控制（偏移）

startOffset = scrollTop - (scrollTop % itemSize);

### 无限滚动