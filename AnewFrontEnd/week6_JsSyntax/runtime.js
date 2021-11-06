// 需要存储变量的手段，处理 Identifier
export class ExecutionContext {
  // 执行上下文
  constructor(realm, lexicalEnvironment, variableEnvironment) {
    variableEnvironment = variableEnvironment || lexicalEnvironment;
    this.lexicalEnvironment = lexicalEnvironment; // 词法环境
    this.variableEnvironment = variableEnvironment;
    this.realm = realm;
  }
}

export class Reference {
  constructor(object, property) {
    this.object = object;
    this.property = property;
  }

  set(value) {
    this.object[this.property] = value;
  }

  get() {
    return this.object[this.property];
  }
}

export class Realm {
  constructor() {
    this.global = new Map();
    this.Object = new Map();
    this.Object.call = function () {};
    this.Object_prototype = new Map();
  }
}

export class EnvironmentRecord {
  constructor() {
    this.thisValue;
    this.variables = new Map();
    this.outer = null;
  }
}
