import { mount } from "./mount.js";
import { patch } from "./patch.js";

/**
 * Step3. 渲染
 */

export const render = (vnode, parent) => {
  let prev = parent._vnode;

  if (!prev) {
    mount(vnode, parent);
    parent._vnode = vnode;
  }
};
