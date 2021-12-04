import { NODE_FLAG } from "./h";

export const mount = (vnode, parent, refNode) => {
  if (!parent) throw new Error("没传父节点哦");
  const $$ = vnode.$$;

  // if ($$.flag === NODE_FLAG.TEXT)
  if ($$.flag & NODE_FLAG.TEXT) {
    const el = document.createTextNode(vnode.props.nodeValue);
    vnode.el = el;
    parent.appendChild(el);
  } else if ($$.flag & NODE_FLAG.EL) {
    // 元素节点处理
    const { type, props } = vnode; // 先不考虑 type 是一个组件的情况
    const el = document.createElement(type);
    vnode.el = el;

    const { children, ...rest } = props;
    if (Object.keys(rest).length) {
      for (let key of Object.keys(rest)) {
        patchProps(key, null, rest[key], el);
      }
    }

    if (children) {
      const __children = Array.isArray(children) ? children : [children];
      for (let child of __children) {
        mount(child, el); // 递归挂载
      }
    }

    refNode ? parent.insertBefore(el, refNode) : parent.appendChild(el);
  }
};
