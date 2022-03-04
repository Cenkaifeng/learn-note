console.log("start");
window.requestAnimationFrame(function () {
  console.log("rAF");
});
setTimeout(() => {
  console.log("st");
}, 0);
window.requestIdleCallback(() => {
  console.log("rIC");
});

new Promise((resolve, reject) => {
  resolve();
}).then(() => {
  console.log("a microTask");
  window.requestAnimationFrame(function () {
    console.log("rAF2");
  });
  window.requestIdleCallback(() => {
    console.log("rIC2");
  });
});
console.log("end");

button.addEventListener("click", () => {
  Promise.resolve().then(() => console.log("Microtask 1"));
  console.log("Listenner 1");
});

button.addEventListener("click", () => {
  Promise.resolve().then(() => console.log("Microtask 2"));
  console.log("Listenner 2");
});

// 上述代码 click 触发后执行顺序

// 进阶：
button.click();

// 要是加这行呢？
