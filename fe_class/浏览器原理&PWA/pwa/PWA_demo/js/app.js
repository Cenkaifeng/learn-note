/**
 * PWA 示例应用的主要JavaScript文件
 * 负责处理用户交互、网络状态检测和与Service Worker通信
 */

// DOM 元素
const networkStatusElement = document.getElementById("network-status");
const cacheButton = document.getElementById("cache-button");
const notificationButton = document.getElementById("notification-button");

/**
 * 更新网络状态显示
 */
function updateNetworkStatus() {
  if (navigator.onLine) {
    networkStatusElement.textContent = "已连接到网络";
    networkStatusElement.className = "online";
  } else {
    networkStatusElement.textContent = "离线模式";
    networkStatusElement.className = "offline";
  }
}

// 初始化时检查网络状态
updateNetworkStatus();

// 监听网络状态变化
window.addEventListener("online", updateNetworkStatus);
window.addEventListener("offline", updateNetworkStatus);

/**
 * 手动缓存当前页面
 * 演示如何通过postMessage与Service Worker通信
 */
cacheButton.addEventListener("click", () => {
  if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
    // 向Service Worker发送消息，请求缓存当前页面
    navigator.serviceWorker.controller.postMessage({
      action: "cache-page",
      url: window.location.href,
    });

    alert("页面已添加到缓存！现在您可以尝试离线访问。");
  } else {
    alert("Service Worker尚未激活，请稍后再试。");
  }
});

/**
 * 请求发送通知
 * 演示如何使用Notification API
 */
notificationButton.addEventListener("click", () => {
  // 检查浏览器是否支持通知
  if (!("Notification" in window)) {
    alert("此浏览器不支持通知功能");
    return;
  }

  // 如果已经有权限，直接发送通知
  if (Notification.permission === "granted") {
    sendNotification();
  }
  // 如果权限状态是默认的，请求权限
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        sendNotification();
      }
    });
  } else {
    alert("通知权限已被拒绝，请在浏览器设置中启用通知权限");
  }
});

/**
 * 发送一个测试通知
 */
function sendNotification() {
  // 使用Service Worker显示通知
  if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification("PWA 示例通知", {
        body: "这是一个本地测试通知，展示PWA的通知功能",
        icon: "./images/icons/icon-192x192.png",
        badge: "./images/icons/icon-192x192.png",
        vibrate: [100, 50, 100],
        data: {
          url: window.location.href,
        },
        actions: [
          {
            action: "explore",
            title: "查看详情",
          },
          {
            action: "close",
            title: "关闭",
          },
        ],
      });
    });
  } else {
    // 如果Service Worker不可用，使用普通的Notification API
    new Notification("PWA 示例通知", {
      body: "这是一个本地测试通知，展示PWA的通知功能",
      icon: "./images/icons/icon-192x192.png",
    });
  }
}

/**
 * 监听来自Service Worker的消息
 */
navigator.serviceWorker.addEventListener("message", (event) => {
  console.log("从Service Worker收到消息:", event.data);

  // 处理不同类型的消息
  if (event.data.type === "CACHE_UPDATED") {
    alert(`缓存已更新: ${event.data.message}`);
  }
});

/**
 * 注册后台同步
 * 演示如何使用Background Sync API
 */
function registerBackgroundSync() {
  if ("serviceWorker" in navigator && "SyncManager" in window) {
    navigator.serviceWorker.ready
      .then((registration) => {
        // 注册一个标记为'sync-data'的同步事件
        return registration.sync.register("sync-data");
      })
      .then(() => {
        console.log("后台同步已注册");
      })
      .catch((err) => {
        console.error("后台同步注册失败:", err);
      });
  }
}

// 页面加载完成后执行
window.addEventListener("load", () => {
  // 如果支持后台同步，则注册
  if ("serviceWorker" in navigator && "SyncManager" in window) {
    registerBackgroundSync();
  }

  // 检查是否可安装PWA
  let deferredPrompt;

  window.addEventListener("beforeinstallprompt", (e) => {
    // 阻止Chrome 67及更早版本自动显示安装提示
    e.preventDefault();
    // 保存事件以便稍后触发
    deferredPrompt = e;
    // 可以在这里添加UI元素，提示用户安装PWA
    console.log("可以安装PWA应用");
  });
});
