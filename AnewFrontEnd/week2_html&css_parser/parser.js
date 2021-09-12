let currentToken = null;
let currentAttribute = null;

let stack = [{ type: "document", children: [] }]; // 树栈初始document根节点
let currentTextNode = null;

function emit(token) {
  //if(token.type!="text")
  // console.log(token);
  // if (token.type === "text") return; // 第七步加入文本节点后去掉
  let top = stack[stack.length - 1]; // 每次开始先把栈顶取出来（当前节点的爹）

  if (token.type == "startTag") {
    let element = {
      type: "element",
      children: [],
      attributes: [],
    };

    element.tagName = token.tagName;

    for (let p in token) {
      if (p != "type" && p != "tagName") {
        element.attributes.push({
          name: p,
          value: token[p],
        });
      }
    }

    top.children.push(element); // 入栈前给top加上element
    element.parent = top;

    if (!token.isSelfClosing) stack.push(element);

    currentTextNode = null; //在开始和结束标签的时候把文本节点清空
  } else if (token.type == "endTag") {
    if (top.tagName != token.tagName) {
      throw new Error("Tag start end doesn't match!");
      // Tips: 浏览器真实实现会做一些容错操作，例如内部是 span 外部是 p,如果匹配不到 span的闭合标签会先把span封闭掉
      //在相关文档中 Tree construction 这部分对相应标签的闭合情况做了详细描述
    } else {
      stach.pop(); //配对成功出栈
    }
    currentTextNode = null;
  } else if (token.type == "text") {
    if (currentTextNode == null) {
      currentTextNode = {
        type: "text",
        content: "",
      };
      top.children.push(currentTextNode);
    }
    currentTextNode.content += token.content;
  }
}

const EOF = Symbol("EOF"); // EOF: End Of File 用EOF 做为文件终结的标志

function data(c) {
  // 对三种 tag 开、闭合、自闭 的判断
  if (c == "<") {
    return tagOpen;
  } else if (c == EOF) {
    emit({
      type: "EOF",
    });
    return;
  } else {
    emit({
      type: "text",
      content: c,
    });
    return data;
  }
}

function tagOpen(c) {
  if (c == "/") {
    return endTagOpen;
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: "startTag",
      tagName: "",
    };
    return tagName(c);
  } else {
    return;
  }
}

function endTagOpen(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: "endTag",
      tagName: "",
    };
    return tagName(c);
  } else if (c == ">") {
  } else if (c == EOF) {
  } else {
  }
}

// <html
function tagName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    // 匹配开头标签文字结束
    return beforeAttributeName;
  } else if (c == "/") {
    return selfClosingStartTag;
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c; //.toLowerCase();
    return tagName;
  } else if (c == ">") {
    return data;
  } else {
    return tagName;
  }
}

function beforeAttributeName(c) {
  // 处理属性状态开始位置
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c == "/" || c == ">" || c == EOF) {
    return afterAttributeName(c);
  } else if (c == "=") {
    // return beforeAttributeName;
  } else {
    // 排除上述状态后会遇到字符
    currentAttribute = {
      name: "",
      value: "",
    };
    // console.log("currentAttribute", currentAttribute)
    return attributeName(c); // 把当前 c reconsume
  }
}

function attributeName(c) {
  if (c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" || c == EOF) {
    return afterAttributeName(c);
  } else if (c == "=") {
    return beforeAttributeValue;
  } else if (c == "\u0000") {
    // \u0000 代表空格
  } else if (c == '"' || c == "'" || c == "<") {
  } else {
    currentAttribute += c;
    return attributeName;
  }
}

function beforeAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" || c == EOF) {
    return beforeAttributeValue;
  } else if (c == '"') {
    return doubleQuotedAttributeValue;
  } else if (c == "'") {
    return singleQuotedAttributeValue;
  } else if (c == ">") {
  } else {
    return UnquotedAttributeValue(c);
  }
}

function doubleQuotedAttributeValue(c) {
  if (c == '"') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if (c == "\u0000") {
  } else if (c == EOF) {
  } else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }
}
function singleQuotedAttributeValue(c) {
  if (c == "'") {
    // 只找单引号结束
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if (c == "\u0000") {
  } else if (c == EOF) {
  } else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }
}

function afterQuotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c == ">") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c == EOF) {
  } else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }
}

function UnquotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return beforeAttributeName;
  } else if (c == "/") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return selfClosingStartTag;
  } else if (c == ">") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c == "\u0000") {
  } else if (c == '"' || c == "'" || c == "<" || c == "=" || c == "`") {
  } else if (c == EOF) {
  } else {
    currentAttribute.value += c;
    return UnquotedAttributeValue;
  }
}
function afterAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return afterAttributeName;
  } else if (c == "/") {
    return selfClosingStartTag;
  } else if (c == "=") {
    return beforeAttributeValue;
  } else if (c == ">") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c == EOF) {
  } else {
    currentToken[currentAttribute.name] = currentAttribute.value;
    currentAttribute = {
      name: "",
      value: "",
    };
    return attributeName(c);
  }
}

function selfClosingStartTag(c) {
  if (c == ">") {
    currentToken.isSelfClosing = true;
    // TODO: emit(currentToken);
    return data;
  } else if (c == "EOF") {
  } else {
  }
}

module.exports.parseHTML = function parseHTML(html) {
  console.log("parser is runing");
  let state = data;
  for (let c of html) {
    state = state(c);
  }
  state = state(EOF);
};
