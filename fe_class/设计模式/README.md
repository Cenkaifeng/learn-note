## JavaScript 设计模式

代码解耦、抽象、设计架构的要求

需要对架构、业务有一定的反思和思考

* 了解什么是设计模式，在今后开发工作中有使用设计模式的概念
* 了解基本设计模式的分类、常用设计模式的类型
* 能够在不同场景下联系到对应的模式，并且合理使用

假设有一个空房间，我们要日复一日地往里面放一些东西。最简单的办法当然是把这些东西直接扔进去，但是时间久了，就会发现很难从这个房子里找到自己想要的东西，要调整某几样东西的位置也不容易。

所以在房间里做一些柜子也许是个更好的选择，虽然柜子会增加我们的成本，但它可以在维护阶段为我们带来好处。使用 这些柜子存放东西的规则，或许就是一种模式

************************************

#### 什么是设计模式？

* 针对设计问题的通用解决方案

#### 学习设计模式对的原因

* 有利于代码复用性
* 有利于代码稳定可拓展
* 有利于代码可读性的提升

#### 什么时候需要设计模式

- 任何合适对的时候

### 五大原则

1. 开闭原则: 开 - 拓展; 闭 - 修改
2. 单一职责原则: 岗位职责单一、互不重叠
   1. （快速定位问题、每一个职责都是变化的中心）
   2. 缺点：调用的时候关联关系路径复杂
3. 依赖倒置原则：上层不应依赖下层实现
   1. 系统应该依赖接口的抽象而不是具体的实现
   2. 开放注入，隔离依赖
4. 接口隔离原则（接口）
   1. 多个专门接口强于一个胖接口（dirty interface）
5. 里氏替换原则：子类可以拓展，但不能改变（暗含一定的开闭）

Tips: 实际开发中需要尽可能满足而不是必须满足，上述情况在开发中还是会有类似需求限于实际场景

### 设计面试题

#### 原题

某停车场，分3层，每层100车位。每个车位都能监控到车辆的驶入和离开，车辆进入前，显示每层的空余车位数量。车辆进入时，摄像头可识别车牌号和时间，车辆出来时，出口显示器显示车牌号和停车时长。设计一套系统。

#### 进一步

结合现有业务需求代码，结合设计模式，进行合理性改造
同一场景下不同的设计模式如何结合使用，相同的设计模式在不同场景下的运用

### part 2

模式分类

   1. 创建型：创建元素，规范创建步骤
      1. 工厂模式：生产同类型商品（通过实现共同的抽象来指向新创建类型）
      2. 建造者模式：独立生产商品（构造与表示分离，同样构建过程分成不同表示）
      3. 单例模式：（整个系统中只需要一个实例对象的时候 ex: new Vue/ vue-router）
   2. 结构型：协调复杂逻辑的层级
      1. 适配器模式（桥梁）： 适配已有方案
      2. *装饰器： 增强已有方案
      3. 代理模式：集约流程（使用代理人来替代原始对象）代理除了做拦截还可以集约
   3. 行为型：模块行为总结
      1. 命令：包裹传递命令
      2. 模板： 重编排，易拓展
      3. 观察者： 模块间实时互通
      4. 职责链

关于设计模式的优缺点：

   首先设计模式更适用于“职责”范围，超出当前的范围肯定是不适合的。
