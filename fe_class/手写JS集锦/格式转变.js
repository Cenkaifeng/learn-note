// 尽可能用一行代码输出目标格式
// 把 [{ name: "Alice", age: 10 }, { name: "Bob", age: 20 }]
// 转换成 { Alice: 10, Bob: 20 }。
[
  { name: "Alice", age: 10 },
  { name: "Bob", age: 20 },
].reduce((pre, curr, index) => {
  pre[curr.name] = curr.age;
  return pre;
}, {});
