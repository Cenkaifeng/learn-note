// createElement
// jsx 一个语言，把你的js和传统的Dom混合起来用，这也是 React 不能像 Vue 那样做预编译的主要原因

// <div class='div'>hello world!</div>
// {
//   type: "div",
//   props: {
//     class: "div",
//     children: [{ type: "", props: { nodeValue: "hello world!" } }],
//   },
// };

// jsx 是 babel 维护的 babel-plugin-jsx-transfor\
// const Empty = <div className ='empty'></div>
// -> createElement('div', {}, [])
