import { mount } from "./mount.js";
import { patch } from "./patch.js";

/**
 * Step3. 渲染 f(vnode, parent) -> view
 */

export const render = (vnode, parent) => {
  let prev = parent._vnode;

  if (!prev) {
    // 先前没有就不需要diff
    mount(vnode, parent);
    parent._vnode = vnode;
  } else {
    if (vnode) {
      patch(prev, vnode, parent);
      parent._vnode = vnode;
    } else {
      parent.removeChild(prev.$$.el);
    }
  }
};
