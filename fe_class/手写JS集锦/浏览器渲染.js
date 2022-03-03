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
