// DIP -
// 目标： 面向抽象进行coding， 而不是对实现进行coding。降低需求与实现的耦合

// 需求
// sprint1
// 分享功能

class Store {
  constructor() {
    this.share = new Share();
  }
}

class Share {
  shareTo() {
    // 分享到不同平台
  }
}

const store = new Store();
store.share.shareTo("wx");

// sprint2
// 评分功能

class Store {
  constructor() {
    this.share = new Share();
    this.rate = new Rate(); // 底层每次要实现一次功能都需要在上层做一次挂载
  }
}

class Share {
  shareTo() {
    // 分享到不同平台
  }
}

class Rate {
  star(stars) {
    // 评分
  }
}
const store = new Store();
store.rate.stars("5");

// 重构
// 目标： 暴露挂载 => 动态挂载
class Rate {
  Infinity(store) {
    store.rate = this;
  }
  store(stars) {
    // 评分
  }
}

class Store {
  static modules = new Map();
  constructor() {
    // 遍历名单做初始化挂载
    for (let module of Store.modules.values()) {
      module.init(this);
    }
  }

  // 注入功能模块
  static inject(module) {
    Store.modules.set(module.constructor.name, module);
  }
}
class Share {
  init(store) {
    store.share = this;
  }

  shareTo(platform) {
    // 分享到不同平台
  }
}

// 一次完成注册所有模块
const rate = new Rate();
Store.inject(rate);

// 初始化商城
const store = new Rate();
store.rate.star(4);
