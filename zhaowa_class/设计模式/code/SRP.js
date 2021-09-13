// SRP - 通过解耦让每一个职责更加的独立
// 模板： 一功能模块只做一件事
//
// sprint
// game store
class PUBGManager {
  openDilog() {
    // 弹框
    // 计算金额
    setPrice();
  }
}

const game = new PUBGManager();
game.openDilog(); // 弹框 < = > 计算金额 两个模块耦合

// 重构
// gameManager.js - 业务

class PUBGManager {
  constructor(command) {
    this.command = command;
  }
  openDilog(prince) {
    // 计算金额
    this.command.setPrice(price); // 命令模式： 操作的不是元素本身或者模块本身，而是操作命令。
  }
}

// optManager.js - 底层库
class PrinceManager {
  setPrince(price) {
    // 配置金额
  }
}

// main.js
const exe = new PrinceManager();
const game = new PUBGManager(exe);
game.openDialog(15);
// game.setPrince(10); // 若需求需要直接调用，可直接增加该模块
