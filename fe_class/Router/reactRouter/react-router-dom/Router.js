import React, { Component } from "react";
import Context from "./context";
// path-to-regexp 判断正则的api (处理模糊匹配)
import { pathToRegexp, match } from "path-to-regexp";
import context from "./context";

export default class Router extends Component {
  static contextType = context;
  render() {
    // 从上下文 context 中获取到当前路由
    const currentRoutePath = this.context.location.pathname;
    // 获取 Route 组件 props 的路由
    const { path, component: Component, exact = false } = this.props;
    // 生产获取 params 的表达式
    const paramsRegexp = match(path, { end: exact });

    const matchResult = paramsRegexp(currentRoutePath);
    this.context.match.params = matchResult.params;
    const props = {
      ...this.context,
    };
    const pathRegexp = pathToRegexp(path, [], { end: exact });
    if (pathRegexp.test(currentRoutePath)) {
      return <Component {...props}></Component>; // 将当前概念上下文路由信息当做 props 传递给组件
    }
    return null;
  }
}
