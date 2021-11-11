import { Component, createElement } from "./framework";
// import {} from "./"

export class Carousel extends Component {
  constructor() {
    super();
    this.attributes = Object.create(null);
  }
  setAttribute(name, value) {
    this.attributes[name] = value;
  }
  render() {
    console.log(this.attributes.src);
    this.root = document.createElement("div");
    this.root.classList.add("carousel");
    for (let record of this.attributes.src) {
      let child = document.createElement("div");
      child.style.backgroundImage = `url('${record}')`;
      child.src = record;
      this.root.appendChild(child);
    }

    let position = 0;

    this.root.addEventListener("mousedown", event => {
      // 坐标逻辑
      let children = this.root.children;
      let startX = event.clientX;

      let move = event => {
        // 鼠标移动距离
        let x = event.clientX - startX;

        let current = position - (x - (x % 500)) / 500;

        for (let offset of [-1, 0, 1]) {
          // 处理屏幕当前，前一个，后一个元素
          let pos = current + offset;
          pos = (pos + children.length) % children.length; // 处理pos 可能是负数的情况
          console.log("children.length:", children.length);
          console.log("move pos:", pos); // 这个地方取余还是有概率出现负数
          if (offset === 0) {
            position = pos;
          }
          children[pos].style.transition = "none";
          children[pos].style.transform = `translateX(${
            -pos * 500 + offset * 500 + (x % 500)
          }px)`; // 位置 * 图片长度 从第 position + 1 张开始
        }
      };

      let up = event => {
        let x = event.clientX - startX;

        position = position - Math.round(x / 500);

        for (let offset of [
          0,
          -Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x)),
        ]) {
          // 处理屏幕当前，前一个，后一个元素
          let pos = position + offset;
          pos = (pos + children.length) % children.length; // 处理pos 可能是负数的情况

          children[pos].style.transition = "none";
          children[pos].style.transform = `translateX(${
            -pos * 500 + offset * 500
          }px)`; // 位置 * 图片长度 从第 position + 1 张开始
        }
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };

      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    });

    // 下方是自动播放逻辑
    /*
    let currentIndex = 0;
    setInterval(() => {
      // 下面这个逻辑其实就是把轮播标识抽象成为，当前、下一个，两个标识
      let children = this.root.children;
      let nextIndex = (currentIndex + 1) % children.length;

      let current = children[currentIndex];
      let next = children[nextIndex];

      next.style.transition = "none";
      next.style.transform = `translateX(-${100 - nextIndex * 100}%)`;

      setTimeout(() => {
        next.style.transition = "";
        current.style.transform = `translateX(${-100 - currentIndex * 100}%)`;
        next.style.transform = `translateX(${-nextIndex * 100}%)`;
        currentIndex = nextIndex;
      }, 16);
      // 此处使用 requestAnimationFrame 会有问题，需要使用两次
    }, 3000);
    */
    return this.root;
  }
  mountTo(parent) {
    parent.appendChild(this.render());
  }
}
