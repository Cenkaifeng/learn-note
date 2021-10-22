// 用数组做出生产式关系
let syntax = {
  Program: ["Statement", "EOF"],
  StatementList: [["Statement"], ["StatementList", "Statement"]],
  Statement: [
    ["ExpressionStatement"],
    ["IfStatement"],
    ["VariableDeclaration"],
    ["FunctionDeclaration"],
    // ["Block"]
  ],
  IfStatement: [["if", "(", "Expression", ")", "Statement"]],
  VariableDeclaration: [["var", "Identifier"]],
  FunctionDeclaration: [
    ["function", "Identifier", "(", ")", "{", "StatementList", "}"],
  ],
  ExpressionStatement: [["Expression"]],
  Expression: [["AdditiveExpression"]],
  AdditiveExpression: [
    ["MultiplicativeExpression"],
    ["AdditiveExpression", "+", "MultiplicativeExpression"],
    ["AdditiveExpression", "-", "MultiplicativeExpression"],
  ],
  MultiplicativeExpression: [
    ["PrimaryExpression"],
    ["MultiplicativeExpression", "*", "PrimaryExpression"],
    ["MultiplicativeExpression", "/", "PrimaryExpression"],
  ],
  PrimaryExpression: [["(", "Expression", ")"], ["Literal"], ["Identifier"]],
  Literal: [],
};

let hash = {};

// BFS
function closure(state) {
  hash[JSON.stringify(state)] = state;
  let queue = [];
  for (let symbol in state) {
    queue.push(symbol);
  }
  while (queue.length) {
    let symbol = queue.shift();
    console.log(symbol);
    // if (syntax[symbol] && !state[symbol]) {
    if (syntax[symbol]) {
      // 终结符判断
      for (let rule of syntax[symbol]) {
        if (!state[rule[0]]) queue.push(rule[0]);

        let current = state;
        for (let part of rule) {
          // Rule 是第二层序列
          if (!current[part]) current[part] = {};
          current = current[part];
        }
        current.isRuleEnd = true;
      }
    }
  }

  for (let symbol in state) {
    if (hash[JSON.stringify(state[symbol])])
      state[symbol] = hash[JSON.stringify(state[symbol])];
    else closure(state[symbol]);
  }
}

let end = {
  isEnd: true,
};
let start = {
  // Program: end,
  IfStatement: end,
};

closure(start);
