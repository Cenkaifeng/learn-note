// 生成 AST

function generateAST(tokens) {

}


function parser(input) { 
    // 这个函数拆分了 Babel 要做的三件事，将js 字符串令牌华：词法分析
    const tokens = generateToken(input);
    // 将词法令牌转行为有层级关系的 AST 结构
    const ast = generateAST(tokens);
    // 将 AST 转换为目标语法结构
    const newAst = transformer(ast)

    return generate(newAst);
}

module.exports = parser;

//visitor(path,state) {state.opts}  获取配置参数


// 课后作业
//If you would like to let your users customize the behavior of your Babel plugin you can accept plugin specific options which users can specify like this:

{
  plugins: [
    ["my-plugin", {
      "option1": true,
      "option2": false
    }]
  ]
}
//These options then get passed into plugin visitors through the state object:

export default function({ types: t }) {
  return {
    visitor: {
      FunctionDeclaration(path, state) {
        console.log(state.opts);
        // { option1: true, option2: false }
      }
    }
  }
}

// 插件编写参考： https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md