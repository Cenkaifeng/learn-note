// ISP 接口隔离
//  模板：多个专业的接口比单个胖接口好用
//
// 需求
// 已经可以开发游戏了，但是实现游戏中台 - 快速生产游戏
// PUBG、LOL run shot mega
class Game {
  constructor(name) {
    this.name = name;
  }
  run() {
    // 跑
  }
  shot() {
    // 开枪
  }
  mega() {
    // 开大
  }
}

class PUBG extends Game {
  constructor() {
    // pubg constructor
  }
}

class LOL extends Game {
  constructor() {}
}

pubg = new PUBG("pubg");
pubg.run();
pubg.shot();
pubg.mega();

// 重构 - 用多个借口替代他，每个接口赋予于一个子模块
// 瘦身
//
class Game {
  constructor(name) {
    this.name = name;
  }
  run() {
    // 跑
  }
}

class FPS {}

class MOBA {}

class PUBG extends Game {
  constructor() {
    // pubg constructor
  }
  shot() {
    // 功能下放
    // 开枪
  }
}

class LOL extends Game {
  constructor() {}
  mega() {
    // 开大
  }
}
