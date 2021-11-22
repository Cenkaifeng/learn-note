export default class CountChange {
  count = 1;

  increment = () => {
    this.count++;
  };

  decrease = () => {
    this.count--;
  };
}
// index.js 中引入

import CountChange from "./es6";

const instance = new CountChange();

function test(content) {
  document.querySelector("#app").innerHTML = content;
}

test(instance.count);
