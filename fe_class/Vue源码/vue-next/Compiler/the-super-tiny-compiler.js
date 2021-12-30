// 原版：https://github.com/jamiebuilds/the-super-tiny-compiler
// 中文翻译版 https://github.com/YongzeYao/the-super-tiny-compiler-CN/blob/master/the-super-tiny-compiler.js

// Tokenlize -> Parser -> Transform -> Generator
function tokenizer(input) {
  let current = 0; // 初始化一个指针
  let tokens = []; // 初始化一个栈

  while (current < input.length) {
    let char = input[current];
    // （ 匹配
    if (char === "(") {
      tokens.push({
        type: "paren",
        value: "(",
      });

      current++;

      continue;
    }

    // 空格匹配
    let WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
    }
    // 数字匹配
    let NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {
      let value = "";

      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({ type: "number", value });

      continue;
    }

    // 占位符匹配
    let LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = "";

      while (LETTERS.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({ type: "name", value });

      continue;
    }
  }

  return tokens;
}

function traverser() {
  /**
   * 允许我们遍历一个数组，并调用接下来的 tarverseNode
   * @param {*} array
   * @param {*} parent
   */
  function tarverseArray(array, parent) {
    array.forEach(child => {
      traverseNode(child, parent);
    });
  }
  function traverseNode(node, parent) {
    let methods = visitor[node.type];
    // DFS 访问器 进
    if (methods && methods.enter) {
      methods.enter(node, parent);
    }

    switch (node.type) {
      // TODO: 分治递归 可以理解为词法状态机
      case "Program":
        tarverseArray(node.body, node);
        break;

      case "CallExxpression":
        tarverseArray(node.params, node);
        break;

      case "NumberLiteral":
      case "StringLiteral":
        break;

      default:
        throw new TypeError(node.type);
    }

    if (methods && methods.exit) {
      methods.exit(node.parent);
    }
  }
}

function parser(tokens) {
  let current = 0;

  function walk() {
    let token = tokens[current];

    if (token.type === "number") {
    }

    if (token.type === "paren" && token.value === "(") {
      token = tokens[++current];

      let node = {
        type: "CallExpression",
        name: token.value,
        params: [],
      };

      token = tokens[++current];
    }

    return node;
  }

  // ast 结构顶层的初始化
  let ast = {
    type: "Program",
    body: [],
  };

  while (current < tokens.length) {
    ast.body.push(walk());
  }

  return ast;
}

// tansformer 接受 lisp 抽象语法树对象，
function transformer(ast) {
  let newAst = {
    type: "Program",
    body: [],
  };

  ast._context = newAst.body;

  traverser(ast, {
    // 这里是transformer 的真正逻辑，讲 Lisp 转换成目标语法规则
  });
}

function codeGenerator() {}

function compiler(input) {
  let tokens = tokenizer(input);
  let ast = parser(tokens);
  let newAst = transformer(ast);
  let output = codeGenerator(newAst);

  return output;
}

module.exports = {
  tokenizer,
  parser,
  transformer,
  codeGenerator,
  compiler,
};
