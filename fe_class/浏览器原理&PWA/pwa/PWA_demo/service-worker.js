/**
 * Service Worker 是PWA的核心组件
 * 它在浏览器后台运行，可以拦截网络请求、缓存资源、实现离线访问
 * 以及接收推送通知等功能
 */
// Sw环境下用来存储的一个操作对象，在此环境下无法使用web storage等
// const cache = new Cache("pwa-demo-cache");
// 缓存名称和需要缓存的资源列表
const CACHE_NAME = "pwa-demo-v1.01";
const CACHE_URLS = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/app.js",
  "./manifest.json",
  "./images/icons/icon-192x192.png",
  "./images/icons/icon-512x512.png",
  "./images/icons/favicon.ico",
];

/**
 * install 事件
 * 当 Service Worker 首次安装时触发
 * 通常用于缓存静态资源
 */
self.addEventListener("install", (event) => {
  console.log("[Service Worker] 安装中...");

  // 使用 waitUntil() 方法确保 Service Worker 不会在缓存操作完成前安装完成
  event.waitUntil(
    // 打开指定的缓存
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[Service Worker] 缓存资源中...");
        // 添加所有资源到缓存
        return cache.addAll(CACHE_URLS);
      })
      .then(() => {
        // 强制新 Service Worker 立即激活，不等待旧 Service Worker 终止 skipWaiting() 直接进入 activate
        console.log("[Service Worker] 跳过等待阶段");
        return self.skipWaiting();
      })
  );
});

/**
 * activate 事件
 * 当 Service Worker 激活时触发
 * 通常用于清理旧缓存
 */
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] 激活中...");

  // 清理旧版本的缓存
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("[Service Worker] 删除旧缓存:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // 确保 Service Worker 立即控制所有客户端
        console.log("[Service Worker] 声明控制权");
        return self.clients.claim();
      })
  );
});

/**
 * fetch 事件
 * 当浏览器发起网络请求时触发
 * 用于拦截请求并返回缓存的响应
 */
self.addEventListener("fetch", (event) => {
  // 拦截导航请求（HTML页面）
  if (event.request.mode === "navigate") {
    event.respondWith(
      // 尝试从网络获取资源
      fetch(event.request).catch(() => {
        // 如果网络请求失败，返回缓存中的 index.html
        console.log("[Service Worker] 网络请求失败，使用缓存的 index.html");
        return caches.match("./index.html");
      })
    );
    return;
  }

  // 对于非导航请求，使用 Cache-First 策略
  event.respondWith(
    caches.match(event.request).then((response) => {
      // 如果在缓存中找到响应，则返回缓存的响应
      if (response) {
        console.log("[Service Worker] 从缓存返回:", event.request.url);
        return response;
      }

      // 如果缓存中没有找到，则从网络获取
      console.log("[Service Worker] 从网络获取:", event.request.url);
      return fetch(event.request).then((networkResponse) => {
        // 检查响应是否有效
        if (
          !networkResponse ||
          networkResponse.status !== 200 ||
          networkResponse.type !== "basic"
        ) {
          return networkResponse;
        }

        // 克隆响应，因为响应是流，只能使用一次
        const responseToCache = networkResponse.clone();

        // 将从网络获取的资源添加到缓存中
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      });
    })
  );
});

/**
 * push 事件
 * 当服务器发送推送通知时触发
 */
self.addEventListener("push", (event) => {
  console.log("[Service Worker] 收到推送消息");

  const title = "来自PWA示例的通知";
  const options = {
    body: event.data ? event.data.text() : "有新消息，请查看！",
    icon: "./images/icons/icon-192x192.png",
    badge: "./images/icons/icon-192x192.png",
    vibrate: [100, 50, 100],
    data: {
      url: self.location.origin,
    },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

/**
 * notificationclick 事件
 * 当用户点击通知时触发
 */
self.addEventListener("notificationclick", (event) => {
  console.log("[Service Worker] 通知被点击");

  // 关闭通知
  event.notification.close();

  // 点击通知后打开应用
  event.waitUntil(clients.openWindow(event.notification.data.url));
});

/**
 * sync 事件
 * 当浏览器重新获得网络连接时触发
 * 用于实现后台同步
 */
self.addEventListener("sync", (event) => {
  console.log("[Service Worker] 后台同步事件:", event.tag);

  if (event.tag === "sync-data") {
    event.waitUntil(
      // 这里可以实现数据同步逻辑
      console.log("[Service Worker] 执行数据同步...")
    );
  }
});
