// 设置我们要执行的任务

function loadImg(url) {
  return new Promise((resolve, reject) => {
    console.log("----" + url.info + "start!");
    setTimeout(() => {
      console.log(url.info + "OK!!!!");
      resolve();
    }, url.time);
  });
}

module.exports = {
  loadImg,
};
