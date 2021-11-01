import { Component, createElement } from "./framework";

class Carousel extends Component {
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

    this.root.addEventListener("mousedown", event => {
      console.log("mousedown");

      let move = event => {
        console.log("mousemove");
      };

      let up = event => {
        console.log("mouseup");
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", move);
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

// document.body.appendChild(a);
let d = [
  "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
  "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
  "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
  "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg]",
];
let a = <Carousel src={d} />;
a.mountTo(document.body);
