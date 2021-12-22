// 实现一个控制并发的函数，接受并发量参数. 3, url = [8]

const { loadImg, urls } = require("./mock");

class PromiseQueue {
  constructor(options = {}) {
    this.concurrency = options.concurrency || 1;
    this.currentCount = 0;
    this.pendingList = [];
  }

  add(task) {
    this.pendingList.push(task);
    this.run();
  }

  run() {
    if (
      this.pendingList.length === 0 ||
      this.concurrency === this.currentCount
    ) {
      return;
    }

    this.currentCount++;
    // const fn = this.pendingList.shift();
    const { fn } = this.pendingList
      .sort((a, b) => b.priority - a.priority)
      .shift();
    const promise = fn();
    promise
      .then(this.completeOne.bind(this))
      .catch(this.completeOne.bind(this));
  }

  completeOne() {
    this.currentCount--;
    this.run();
  }
}

const queue = new PromiseQueue({ concurrency: 3 });

// 优先级
const formatTask = url => {
  return {
    fn: () => loadImg(url),
    priority: url.priority,
  };
};

urls.forEach(url => {
  // queue.add(() => loadImg(url));
  queue.add(formatTask);
});

// 发现高优任务并推入
const highPriorityTask = {
  priority: 10,
  info: "high!!!!!",
  time: 2000,
};

queue.add(formatTask(highPriorityTask));
