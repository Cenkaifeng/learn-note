# PWA 示例项目

这是一个展示渐进式Web应用（Progressive Web App，PWA）核心功能的示例项目。通过这个示例，你可以了解PWA的基本原理和实现方法，特别是Service Worker的工作机制。

## 项目结构

```
PWA/
├── css/
│   └── style.css          # 样式文件
├── images/
│   └── icons/             # 应用图标
│       ├── favicon.ico
│       ├── icon-192x192.png
│       └── icon-512x512.png
├── js/
│   └── app.js             # 主要JavaScript逻辑
├── index.html             # 主页面
├── manifest.json          # Web应用清单
├── service-worker.js      # Service Worker实现
└── README.md              # 项目说明
```

## PWA核心特性

本示例实现了以下PWA核心特性：

1. **可安装性**：通过`manifest.json`配置，使应用可以安装到设备主屏幕
2. **离线工作**：使用Service Worker缓存资源，实现离线访问
3. **推送通知**：演示如何发送和接收通知
4. **后台同步**：展示如何在网络恢复时同步数据

## Service Worker详解

`service-worker.js`是PWA的核心组件，它实现了以下功能：

### 生命周期事件

- **install**：首次安装时触发，用于缓存静态资源
- **activate**：激活时触发，用于清理旧缓存
- **fetch**：拦截网络请求，实现缓存优先策略

### 缓存策略

本示例使用了两种缓存策略：

- 对于导航请求（HTML页面）：网络优先，网络失败时回退到缓存
- 对于其他资源：缓存优先，缓存未命中时从网络获取并更新缓存

### 推送通知

- **push**：接收服务器推送的消息
- **notificationclick**：处理用户点击通知的事件

### 后台同步

- **sync**：当网络恢复时触发，用于同步离线数据

## 如何运行

1. 使用HTTP服务器提供这些文件（不能直接从文件系统打开）
2. 在浏览器中访问index.html
3. 尝试以下功能：
   - 点击"缓存当前页面