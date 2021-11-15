// const Buffer = require('fs').;

interface WebviewParams {
  callback?: Function;
  [key: string]: any;
}

const UID_PREFIX = Date.now().toString();
let uid = 1;
const isNotInnerApp = !/Jervis/.test(window.navigator.userAgent);
class Webview {
  public exec(name: string, params: WebviewParams) {
    return this.addApi(name)[name](params);
  }

  public addApi(name: string) {
    //动态给外部业务兜底
    if (!this[name]) {
      this[name] = params => {
        // if(isNotInnerApp) {
        //   return this;
        // }

        return this.run(name, params);
      };
    }
  }
  private run(apiName: string, params: WebviewParams) {
    // TODO: 注册callback
    // TODO: 调用native注册的对象api

    const callback = params && params.callback;

    if (typeof callback === "function") {
      const callbackName = this.getUid(callback.name);
      window[callbackName] = callback; // TODO: base64的转换

      params.trigger = callbackName;
    }

    let messgeHandler = window["JervisWebview"] as any;

    if (!messgeHandler[apiName]) {
      return false;
    }

    // const encodeParams = (new Buffer(JSON.stringify(params))).toString('base64');
  }

  private getUid(name) {
    return (name || "fn") + UID_PREFIX + ++uid;
  }
}
