let currentToken = null;

function emit(token) {
  //if(token.type!="text")
  console.log(token);
}

const EOF = Symbol("EOF"); // EOF: End Of File

function data(c) {
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
    return endTagOpen; // </ 这个开始基本可以确定是一个结束标签了
  } else if (c.match(/^[a-zA-Z]$/)) {
    return tagName(c); // 如果不是 / 那么可能是一个开始标签或者自封闭标签
  } else {
    return;
  }
}

function endTagOpen(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    return tagName(c);
  } else if (c == ">") {
    // 报错异常
  } else if (c == EOF) {
    // 报错异常
  } else {
    // 报错异常
  }
}

function tagName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    // tagName 结束的四种符号 tab/ 换行/ 禁止/ 空白
    return beforeAttributeName;
  } else if (c == "/") {
    return selfClosingStartTag;
  } else if (c.match(/^[a-zA-Z]$/)) {
    return tagName;
  } else if (c == ">") {
    return data;
  } else {
    return tagName;
  }
}

function beforeAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    // 这是下一段属性
    beforeAttributeName;
  } else if (c == ">") {
    // 作为终止标志
    return data;
  } else if (c == "=") {
    return beforeAttributeName;
  } else {
    return beforeAttributeName;
  }
}

function selfClosingStartTag(c) {
  if (c == ">") {
    // 自封闭标签的 > 一般是最后一个字符
    currentToken.isSelfClosing = true;
    return data;
  } else if (c == "EOF") {
  } else {
    // 除了 > 之外的一切都可以报错
  }
}

modole.export.parseHTML = function parseHTML(html) {
  let state = data;
  for (let c of html) {
    state = state(c);
  }

  state = state(EOF);
};
