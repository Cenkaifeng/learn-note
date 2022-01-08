/**
 * 实现一个 EatMan
 * 说明：实现一个 EatMan, EatMan 可以有以下一些行为
 * 示例：
 *    1. EatMan('Hank')输出:
          Hi! This is Hank!
      2. EatMan('Hank').eat('dinner').eat('supper')输出
          Hi! This is Hank!
          Eat dinner~
          Eat supper~
      3. EatMan('Hank').eat('dinner').eatFirst('lunch')输出
          Eat lunch~
          Hi! This is Hank!
          Eat dinner~
      4. EatMan('Hank').eat('dinner').eatFirst('lunch').eatFirst('breakfast')输出
          Eat breakfast~
          Eat lunch~
          Hi! This is Hank!
          Eat dinner~
 */

// 解法：1
class MyEatMan {
  constructor(name) {
    this.name = name;
    // 任务队列，将需要执行的函数入队
    this.tasks = [];
    // 第一个任务
    const task = this.printName(this.name);
    // 放入任务队列
    this.tasks.push(task);
    // 为了保证任务都能在进队完毕之后再执行，创建一个宏任务，让执行任务的时机放到 下一个事件循环里
    let self = this;
    setTimeout(function () {
      // console.log('tasks', self.tasks)
      self.run();
    }, 0);
  }

  // 打印名字
  printName(name) {
    let self = this;
    return function () {
      console.log(`Hi! This is ${name}!`);
      self.run();
    };
  }

  // eat函数，每次调用都入队一个任务，而且还能实现链式调用
  eat(thing) {
    let self = this;
    const task = function () {
      console.log(`Eat ${thing}~`);
      self.run();
    };

    this.tasks.push(task);
    return this;
  }

  // eatFirst函数，谁最后初始化，谁先执行，而且还能实现链式调用
  eatFirst(thing) {
    let self = this;
    const task = function () {
      console.log(`Eat ${thing}~`);
      self.run();
    };

    // 插入到队列的头部
    this.tasks.unshift(task);
    return this;
  }

  // run执行任务
  run() {
    // 出队
    const currTask = this.tasks.shift();
    // 执行
    currTask && currTask();
  }
}

function EatMan(name) {
  return new MyEatMan(name);
}

// 解：2

class EatMan {
  constructor(name) {
    this.name = name || "EatMan";
    this.tasks = [`hi ${name}`];
    setTimeout(() => {
      // this.task.forEach( e => {
      //   console.log(e)
      // })
      while (this.task.length) {
        this.run();
      }
    }, 0);
  }
  run() {
    // 出队
    const currTask = this.tasks.shift();
    // 执行
    currTask && currTask();
  }
  eat(text) {
    this.tasks.push(`eat ${text}`);
    return this;
  }
  eatFirst(text) {
    this.tasks.unshift(`eat ${text}`);
    return this;
  }
}
