// babel plugin demo
const template = require("babel-template");
const temp = template("var b = 1"); // template 能把一段字符串转代码，这里不做 parse 和 Transform了

module.exports = function ({
  types: t,
  // Types拥有没一个单一类型节点的定义。节点包含哪些属性，什么是合法值
}) {
  return {
    visitor: {
      // 访问者
      VariableDeclaration(path, state) {
        // 找到 AST 节点
        const node = path.node;

        if (
          t.isVariableDeclaration(node, {
            kind: "const",
          })
        ) {
          node.kind = "let";
          const inertNode = temp();
          path.insertBefore(inertNode);
        }
      },
    },
  };
};
