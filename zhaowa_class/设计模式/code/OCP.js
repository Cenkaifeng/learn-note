// 开闭原则 (OCP: open closed principle) - 对拓展开放、对修改关闭
// 目标：已有的场景下，对于需要拓展的功能进行开放。拒绝直接的功能修改

// sprint 1 - 青年节活动，吃鸡要高亮 + LOL 要弹出折扣
// render
if (game === "PUBG") {
  // 高亮
} else {
  //...
}

// event
if (game === "LOL") {
  // 弹出折扣框
} else {
  // 付款
}

// sprint 2 - 要的兑付部分游戏只会 + 其付款页面要显示停止发售（MHW)
// render
if (game === "PUBG") {
  // 高亮
} else if (game === "MHW") {
  // 灰色
} else {
  //
}

// event
if (game === "LOL") {
  // 弹出折扣框
} else if (game === "MHW") {
  // break + 提示停止发售
} else {
  // 付款
}

// 每个模块都是一个服务提供者的概念

// 重构

// render
gameManager(game).setColor();
// event
gameManager(game).openDialog();

// game 库
function gameManager(game) {
  return `${game}Manager`;
}

// 导引

const LOLManager = {
  setColor() {
    // 正常
  },
  openDialog() {
    // 折扣
  },
};
const PUBGManager = {
  setColor() {
    // 高亮
  },
  openDialog() {
    // 付款
  },
};

// 重构

class game {
  constructor(name) {
    this.name = name;
  }
  setColor() {
    console.log("....");
  }
  openDialog() {}
}
class common {} // 公共类 抽出 openDialog
class LOL extends game {
  openDialog() {
    console.log("折扣");
  }
}

class PUBG extends game {
  setColor() {
    console.log("高亮");
  }
  openDialog() {
    console.log("付款");
  }
}
