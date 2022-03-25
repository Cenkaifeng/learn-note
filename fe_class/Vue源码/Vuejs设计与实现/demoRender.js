const vnode = {
  type: "div",
  // props 描述元素属性
  props: {
    id: "foo",
    class: "foo bar",
    // 使用 onXxx 来描述事件
    onClick: [
      () => {
        alert("click1");
      },
      () => {
        alert("click2");
      },
    ],
    onMouse: () => {
      alert("mouse");
    },
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
    // 创建 DOM 让 vnode.el 引用真实 DOM
    const el = (vnode.el = createElement(vnode.type));
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
    // 如果 n1 存在那就对比 n1 n2 类型
    if (n1 && n1.type !== n2.type) {
      // 如果心就类型不同，则直接将旧的 vnode 卸载
      unmount(n1);
      n1 = null;
    }
    const { type } = n2;
    // 如果 n2.type 的值是字符串，说明描述的是普通标签元素
    if (typeof type === "string") {
      if (!n1) {
        mountElement(n2, container);
      } else {
        // n1 存在意味着需要 patch diff
        // patchElement(n1, n2)
      }
    } else if (typeof type === "object") {
      // 如果描述的值是对象，那说明是组件，要走 mountComponent这个方法了
    } else if (type === "xxx") {
      // 其他特定元素
    }
  }

  function unmount(vnode) {
    //根据 vnode 获取要卸载的真实 DOM 元素
    const parent = vnode.el.parentNode;
    if (parent) {
      parent.removeChild(vnode.el);
    }
    // 函数内还能绑定 DOM 元素上指令钩子函数，例如 beforeUnmount、unmounted
  }
  function render(vnode, container) {
    //..
    if (vnode) {
      patch(container._vnode, vnode, container);
    } else {
      if (container._vnode) {
        // unmount 操作
        // container.innerHTML = ""; 直接用 innerHTML 卸载有三个缺点 P193
        unmount(container._vnode);
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
    if (/^on/.test(key)) {
      // 根据属性名称得到对应的事件名称，例如 onClick ---》 click

      // 获取为元素伪造的事件处理函数
      const invokers = el._vei || (el._vei = {});
      let invoker = invokers[key];
      const name = key.slice(2).toLowerCase();

      if (nextValue) {
        if (!invoker) {
          // vei = vue event invoker 将事件缓存 _vei[key] 之下，避免被覆盖
          invoker = el._vei[key] = e => {
            // 如果事件发生时间早于绑定时间则不执行
            if (e.timeStamp < invoker.attached) return;
            // 如果 invoker.value 是数组，则遍历它并逐个调用事件处理函数
            if (invoker.value instanceof Array) {
              invoker.value.forEach(fn => fn(e)); // 当伪造事件执行时，会执行真正的事件处理函数
            } else {
              invoker.value(e);
            }
          };

          // 将真正事件赋值给 invoker.value
          invoker.value = nextValue;
          // 绑定 invoker 作为事件处理函数
          el.addEventListener(name, invoker);
        } else {
          // 如果存在直接更新 invoker.value 值即可
          invoker.value = nextValue;
          // 储存事件处理函数被绑定的时间 perfomance api 存在兼容问题
          invoker.attached = performance.now();
        }
      } else if (invoker) {
        // 新事件绑定函数不存在，且之前绑定的 invoker 存在，则卸载绑定
        el.removeEventListener(name, invoker);
      }
    } else if (key === "class") {
      // 对class 特殊处理
      el.className = nextValue || "";
    } else if (shouldSetAsProps(el, key, nextValue)) {
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
