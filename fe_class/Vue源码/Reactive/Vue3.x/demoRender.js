const vnode = {
  type: "div",
  // props 描述元素属性
  props: {
    id: "foo",
  },
  children: [
    {
      type: "p",
      children: "hello",
      //...
    },
  ],
  //...
};

// e.g.
// function renderer(domString, container) {
//   container.innerHTML = domString;
// }

function createRenderer(options) {
  // 通过 options 获得操作DOM 的API

  const { createElement, insert, setElementText, patchProps } = options;

  function shouldSetAsProps(el, key, value) {
    // 特殊处理
    if (key === "form" && el.tagName === "INPUT") return false;

    return key in el;
  }
  function mountElement(vnode, container) {
    // 创建 DOM
    const el = createElement(vnode.type);
    // 处理子节点，如果子节点是字符串，代表元素具有文本节点
    if (typeof vnode.children === "string") {
      // 因此只需要设置元素的 textContent 属性即可
      // el.textContent = vnode.children;
      setElementText(el, vnode.children);
    } else if (Array.isArray(vnode, children)) {
      // 如果 children. 是数组，遍历每个节点并调用挂载
      vnode.children.forEach(child => {
        patch(null, child, el);
      });
    }

    if (vnode.props) {
      for (const key in vnode.props) {
        // const value = vnode.props[key];
        patchProps(el, key, null, vnode.props[key]);
      }
    }

    // container.appendChild(el); // 将元素添加入容器
    insert(el, container);
  }

  function patch(n1, n2, container) {
    if (!n1) {
      mountElement(n2, container);
    } else {
      // n1 存在意味着需要 patch diff
    }
  }
  function render(vnode, container) {
    //..
    if (vnode) {
      patch(container._vnode, vnode, container);
    } else {
      if (container._vnode) {
        // unmount 操作
        container.innerHTML = "";
      }
    }
    container._vnode = vnode;
  }
  return {
    render,
    //hydrate (ssr 同构水合)
  };
}

// 调用
const render = createRenderer({
  createElement(tag) {
    return document.createElement(tag);
  },
  setElementText(el, text) {
    el.textContent = text;
  },
  insert(el, parent, anchor = null) {
    parent.insertBefore(el, anchor);
  },
  patchProps(el, key, preValue, nextValue) {
    // 用 in 判断 key 是否存在对应 DOM Properties
    // if (key in el)
    if (shouldSetAsProps(el, key, nextValue)) {
      const type = typeof el[key];

      // 如果是布尔类型，并且 value 是空字符串，则将值矫正为 true
      if (type === "boolean" && nextValue === "") {
        el[key] = true;
      } else {
        el[key] = nextValue;
      }
    } else {
      // 如果要设置的属性没有对应 DOM Properties,则使用 setAttribute 函数设置属性
      el.setElementText(key, nextValue);
      // el[key] = vnode.props[key]; // 理解 HTML Attributes 和 DOM Properties 之间的差异和关联是合理设计虚拟节点结构和设置元素属性的关键
    }
  },
});
