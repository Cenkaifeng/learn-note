// 手势库

let element = document.documentElement;

// 鼠标事件
element.addEventListener("mousedown", event => {
  start(event);
  let mousemove = event => {
    move(event);
  };

  let mouseup = event => {
    end(event);
    element.removeEventListener("mousemove", mousemove);
    element.removeEventListener("mouseup", mouseup);
  };

  element.addEventListener("mousemove", mousemove);
  element.addEventListener("mouseup", mouseup);
});

// 触屏事件

element.addEventListener("touchstart", event => {
  for (let touch of event.changedTouches) {
    start(touch);
  }
});
element.addEventListener("touchmove", event => {
  for (let touch of event.changedTouches) {
    move(touch);
  }
});
element.addEventListener("touchend", event => {
  for (let touch of event.changedTouches) {
    end(touch);
  }
});
element.addEventListener("touchcancel", event => {
  // 异常弹窗等浏览器事件会打断end的正常执行从而触发cancel
  for (let touch of event.changedTouches) {
    cancel(touch);
  }
});

let start = point => {
  console.log("start", point.clientX, point.clientY);
};
let move = point => {};
let end = point => {};
let cancel = point => {};
