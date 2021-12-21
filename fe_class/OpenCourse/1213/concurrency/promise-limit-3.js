const { loadImg } = require("./mock");

// 如何限制并发请求？

const urls = [
  {
    info: "link1",
    time: 3000,
    priority: 1,
  },
  {
    info: "link2",
    time: 2000,
    priority: 1,
  },
  {
    info: "link3",
    time: 5000,
    priority: 2,
  },
  {
    info: "link4",
    time: 1000,
    priority: 1,
  },
  {
    info: "link5",
    time: 1200,
    priority: 1,
  },
  {
    info: "link6",
    time: 2000,
    priority: 5,
  },
  {
    info: "link7",
    time: 800,
    priority: 1,
  },
  {
    info: "link8",
    time: 3000,
    priority: 1,
  },
];

// class PromiseQueue {} 如何设计这个高并发栈？
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
    if (this.pendingList.length === 0) {
      return;
    }

    if (this.currentCount === this.concurrency) {
      return;
    }

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

const q = new PromiseQueue({
  concurrency: 3, // 最大并发度
});

const formatTask = url => {
  return {
    fn: () => loadImg(url),
    priority: url.priority,
  };
};

urls.forEach(url => {
  q.add(formatTask(url));
});

const highPriorityTask = {
  priority: 10,
  info: "high priority",
  time: 2000,
};

q.add(formatTask(highPriorityTask));
