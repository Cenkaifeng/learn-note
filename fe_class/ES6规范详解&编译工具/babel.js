const myPlugin = require("./babelPlugin");

const babel = require("@babel/core");

const content = "const name = jervis";

const { code } = babel.transform(content, {
  plugins: [myPlugin],
});

console.log(code); // 用插件转换之后
