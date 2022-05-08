// 题目描述：让你获取一个当前页面出现次数最多的三个标签，你要怎么获取？
// 初始版
function getTopDom() {
  const elements = Array.from(document.querySelectorAll("*"));

  const count = {};

  for (const el of elements) {
    const tag = el.tagName;
    count[tag] = (count[tag] || 0) + 1;
  }
  // entries 把对象转化成[key, value] 的数组
  const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]);
  const top3 = sorted.slice(0, 3);
  return top3.map(i => i[0]);
}

function getTopDomBFS() {
  // 只给根节点情况 bfs
  let html = document.querySelector("html");

  let stackList = [html];
  const count = {};
  while (stackList.length > 0) {
    let currentArr = [];
    for (let i = 0; i < stackList.length; i++) {
      const tag = stackList[i].tagName;
      count[tag] = (count[tag] || 0) + 1;
      currentArr.push(...stackList[i].children);
    }
    stackList = [...currentArr];
  }

  const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]);
  const top3 = sorted.slice(0, 3);
  return top3.map(i => i[0]);
}

function getTopDomDFS() {
  // 只给根节点情况 dfs
  let html = document.querySelector("html");

  const count = {};
  function travers(parent) {
    const tag = parent.tagName;
    count[tag] = (count[tag] || 0) + 1;
    for (const el of parent.children) {
      travers(el);
    }
  }
  travers(html);
  const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]);
  const top3 = sorted.slice(0, 3);
  return top3.map(i => i[0]);
}

// TODO: 不让用 sort怎么办？
