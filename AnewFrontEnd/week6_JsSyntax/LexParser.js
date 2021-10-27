class XRegExp {
  constructor(source, flag, root = "root") {
    this.table = new Map();
    this.regexp = new RegExp(this.compileRegExp(source, root, 0).source, flag);
  }
  compileRegExp(source, name, start) {
    if (source[name] instanceof RegExp)
      return {
        source: source[name].source,
        length: 0,
      };

    let length = 0;

    let regexp = source[name].replace(/\<([^>]+)\>/g, (str, $1) => {
      this.table.set(start + length, $1);
      // this.table.set($1, start + length);

      ++length;
      let r = this.compileRegExp(source, $1, start + length);

      length += r.length;
      return "(" + r.source + ")";
    });
    return {
      source: regexp,
      length: length,
    };
  }

  exec(string) {
    let r = this.regexp.exec(string);
    for (let i = 1; i < r.length; i++) {
      if (r[i] !== undefined) {
        r[this.table.get(i - 1)] = r[i];
      }
    }
    // console.log(r);
    return r;
  }

  get lastIndex() {
    return this.regexp.lastIndex;
  }

  set lastIndex(value) {
    return (this.regexp.lastIndex = value);
  }
}

export function* scan(str) {
  let regexp = new XRegExp(
    {
      InputElement: "<Whitespace>|<LineTerminator>|<Comments>|<Token>",
      Whitespace: / /,
      LineTerminator: /\n/,
      Comments: /\/\*(?:[^*]|\*[^\/])*\*\/|\/\/[^\n]*/,
      Token: "<Literal>|<Keywords>|<Identifier>|<Punctuator>",
      Literal:
        "<NumericLiteral>|<BooleanLiteral>|<StringLiteral>|<NullLiteral>",
      NumericLiteral:
        /0x[0-9a-zA-Z]+|0o[0-7]+|0b[01]+|(?:[1-9][0-9]*|0)(?:\.[0-9]*)?|\.[0-9]+/,
      BooleanLiteral: /true|false/,
      // 下面忽略了反斜杠转译、unicode转译等多现象
      StringLiteral: /\"(?:[^"\n]|\\[\s\S])*\"|\'(?:[^'\n]|\\[\s\S])*\'/,
      NullLiteral: /null/,
      Identifier: /[a-zA-Z_$][a-zA-Z0-9_$]*/,
      Keywords: /if|else|for|function|let|var/,
      Punctuator: /\+|\,|\?|\:|\{|\}|\.|\(|\=|\<|\+\+|\=\=|\=\>|\*|\)|\[|\]|;/,
    },
    "g",
    "InputElement"
  );

  // let r = regexp.exec("(a)");
  // console.log(r)

  while (regexp.lastIndex < str.length) {
    let r = regexp.exec(str);

    if (r.Whitespace) {
      // 忽略空白
    } else if (r.LineTerminator) {
      // 正常来说不会忽略，否则会影响自动添加分号
    } else if (r.Comments) {
    } else if (r.NumericLiteral) {
      yield {
        type: "NumericLiteral",
        value: r[0],
      };
    } else if (r.BooleanLiteral) {
      yield {
        type: "BooleanLiteral",
        value: r[0],
      };
    } else if (r.StringLiteral) {
      yield {
        type: "StringLiteral",
        value: r[0],
      };
    } else if (r.NullLiteral) {
      yield {
        type: "NullLiteral",
        value: null,
      };
    } else if (r.Identifier) {
      yield {
        type: "Identifier",
        value: r[0],
      };
    } else if (r.Keywords) {
      yield {
        type: r[0],
      };
    } else if (r.Punctuator) {
      yield {
        type: r[0],
      };
    } else {
      throw new Error("unexpected token" + r[0]);
    }

    if (!r[0].length) break;
  }
  yield {
    type: "EOF",
  };
}
