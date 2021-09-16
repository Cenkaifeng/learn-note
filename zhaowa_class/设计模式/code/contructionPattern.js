// 结构型
// 功能： 优化结构的实现方式

// 适配器模式 - adapter
// 适配独立模块，保证模块间的独立解耦且连接兼容
// 需求：买了个港行PS, 插座是国标

class HKDevice {
  getPlug() {
    return "港行双圆柱插头";
  }
}

class Target {
  constructor() {
    this.plug = new HKDevice();
  }
  getPlug() {
    return this.getPlug.getPlug() + "+港行双圆柱转换器";
  }
}

const targe = new Target();
targe.getPlug();

// 2 装饰器模式
// 动态将责任附加到对象上
// 设备升级

class Device {
  create() {
    console.log("PlayStation4");
  }
}

class Phone {
  create() {
    console.log("iphone8");
  }
}

class Decorator {
  constructor(device) {
    this.device = device;
  }

  create() {
    this.device.create();
    this.update(device);
  }
  update(device) {
    console.log(device + "pro");
  }
}

const device = new Device();
device.create();

const newDevice = new Decorator(device);
newDevice.create();

// 代理模式
// 使用代理人来替代原始对象
// 游戏防沉迷
class Game {
  play() {
    return "playing";
  }
}

class Player {
  constructor(age) {
    this.age = age;
  }
}

class GameProxy {
  constructor(player) {
    this.palyer = player;
  }
  play() {
    return this.palyer.age < 16 ? "too young to paly" : new Game().play();
  }
}

const player = new Player(18);
const game = new GameProxy(player);
game.play();

// 模式场景
// 中间转换参数、保持模块独立的时候 - 适配器模式
// 附着于多个组件上，批量动态赋予功能的职责 - 装饰器模式
// 将代理对象与调用对象分离，不直接调用目标对象 - 代理模式

// 实际应用
// 1. 两个模块：筛选器和表哥，需要做一个联动。但是筛选器的数据不能直接传入表哥，需要做数据结构的转换
// => 模块之间独立，需要做数据结构转换 => 适配器（没有调用所有不是代理）
// 2. 目前有按钮、title/icon 三个组件。希望开发一个模块，让三个组件同时具备相同功能 => 套一层装甲
// 有统一的能力提升、且可以动态添加功能进行拓展 => 装饰器模式
// 3. ul 中多个 li 每个li 上的点击事件 => 利用冒泡做委托，时间绑定在ul 上 => 代理（代理除了做拦截还可以集约）
