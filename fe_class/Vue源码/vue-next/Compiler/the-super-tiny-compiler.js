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
  function traverseNode(node, parent) {
    let methods = visitor[node.type];
    // DFS 访问器 进
    if (methods && methods.enter) {
      methods.enter(node, parent);
    }

    switch (
      node.type
      // TODO: 分治递归
    ) {
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

function transformer() {}

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
