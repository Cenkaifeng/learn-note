## pwa

1. 什么是pwa

渐进式网络应.基本上可以算是网络程序，但是在外观上和体验上更像是app.

2. 优点

* 更小更快
* 响应式页面
* 高性价比
* seo
* 离线：底层基于service worker支持弱往访问和做一些缓存
* 推送
* 绕过应用商店

根据两篇知乎文章的内容，以下是PWA（渐进式网络应用）的核心特性总结：

---

**1. 渐进式增强（Progressive）**
• 核心原则：PWA不要求一次性满足所有特性，而是逐步增强Web应用的功能，适配不同设备和浏览器。

• 兼容性：即使在不支持PWA的浏览器中，仍可作为普通Web应用运行。


---

**2. 可靠（Reliable）**
• 离线可用：通过Service Worker技术缓存关键资源，即使网络不稳定或断网时也能加载内容。

• 缓存策略：开发者可自定义缓存逻辑（如预缓存、动态缓存），优化离线体验。

• 快速加载：首次访问后资源本地化，后续加载速度接近原生应用。


---

**3. 沉浸式体验（Engaging）**
• 类原生体验：

  • 全屏运行：通过`manifest.json`配置隐藏浏览器地址栏（“无上下巴”），实现全屏显示。

  • 添加到主屏幕：用户可将应用图标安装到设备桌面，启动方式与原生应用一致。

  • 启动画面：自定义启动页和主题色，提升视觉一致性。

• 流畅交互：支持平滑动画和快速响应，减少用户等待感知（如通过App Shell骨架屏预渲染界面）。


---

**4. 技术特性**
• Service Worker：

  • 独立于主线程的后台脚本，可拦截网络请求并管理缓存。

  • 支持离线内容加载和消息推送。

  • 强制HTTPS：出于安全考虑，Service Worker仅能在HTTPS环境下运行。

• Web App Manifest：

  • 配置文件（`manifest.json`）定义应用名称、图标、启动URL、显示模式（全屏/独立）、主题色等。

• App Shell模型：

  • 将应用的UI框架（如导航栏、布局结构）预先缓存，减少白屏时间，提升切换流畅度。


---

**5. 粘性（Sticky）**
• 推送通知：支持系统级消息推送，增强用户召回率。

• 跨平台：一次开发即可适配PC、移动等多端，无需为不同平台单独开发。

• 中立性：不依赖特定平台（如微信），避免受限于生态限制（如支付、服务调用）。


---

**6. 对比原生应用与小程序的独特优势**
• 与原生应用对比：

  • 无需应用商店审核，更新即时生效。

  • 占用存储空间小，安装成本低（“0安装”）。

• 与小程序对比：

  • 更开放：无平台限制，可直接调用设备功能（如摄像头、定位）。

  • 更接近原生：支持全屏运行和系统通知，体验更沉浸。

  • 跨平台一致性：在iOS和Android上均可添加到桌面，无需依赖微信等中间载体。


---

**7. 开发与维护**
• 开发工具：框架（如Lavas）提供模板和自动化配置，简化Service Worker、Manifest和缓存策略的集成。
    ps：Lavas 已经2019年就停止维护了，官网都访问不了

• 成本降低：通过现成方案减少手动配置，专注于业务逻辑。


---

**总结**
PWA通过结合Web的灵活性与原生应用的体验优势，实现了可靠、快速、沉浸式的网络应用体验。其核心在于渐进式增强和技术标准化（Service Worker、Manifest），成为提升Web应用竞争力的重要方向。尽管国内普及度较低，但其在跨平台、中立性和用户体验方面的潜力值得关注。