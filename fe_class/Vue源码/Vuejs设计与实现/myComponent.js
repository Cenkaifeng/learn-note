import { effect } from "./bookDemo.js";
import queueJob from "./jobQueue.js";

const vnode = {
  type: MyComponent,
  props: {
    title: "A big title",
    other: this.val,
  },
};

function mountComponent(vnode, container, anchor) {
  const componentOptions = vnode.type; // type 是个对象....
  const {
    render,
    data,
    props: propsOptions,
    beforeCreate,
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
  } = componentOptions;

  beforeCreate && beforeCreate();
  const state = reactive(data()); // data 数据响应化
  const [props, attrs] = resolveProps(propsOptions, vnode.props);
  // 定义组件实例，一个组件实例本质上就是一个对象，它包含与组件有关的状态信息
  const instance = {
    // 组件自身的状态数据，即 data
    state,
    props: shallowReactive(props),
    // 一个布尔值，用来表示组件是否被挂载，初始值 false
    isMounted: false,
    // 组件所渲染的内容，即子树（subTree)
    subTree: null,
  };

  // 将组件实例设置到 vnode 上，用于后续更细
  vnode.component = instance;

  // 创建渲染上下文对象，本质上是组件实例的代理
  const renderContext = new Proxy(instance, {
    get(t, k, r) {
      // 取得组件自身状态与 props 数据
      const { state, props } = t;
      if (state && k in state) {
        return state[k]; // 尝试先读取自身属性
      } else if (k in props) {
        return props[k];
      } else {
        console.log("不存在");
      }
    },
    set(t, k, v, r) {
      const { state, props } = t;
      if (state && k in state) {
        state[k] = v;
      } else if (k in props) {
        props[k] = v;
      } else {
        console.log("不存在");
      }
    },
  });

  created && created.call(renderContext); // 在这里调用 created 将 renderContex 的 this 调整
  effect(
    () => {
      // 调用组件渲染函数，获得子树
      const subTree = render.call(state, state);
      // 检查组件是否已经被挂载
      if (!instance.isMounted) {
        beforeMount && beforeMount.call(state);
        // 初次挂载，调用 patch 函数第一个参数传递 null
        patch(null, subTree, container, anchor);
        // 重点：将组件实例的 isMounted 设置为 true, 这样当更新发生时就不会再次进行挂载操作，而是会执行更新
        instance.isMounted = true;
        mounted && mounted.call(state);
      } else {
        beforeUpdate && beforeUpdate.call(state);
        // 当 isMounted 为 true ,说明组件已经挂载，只需要完成自更新即可，所以在调用 patch 函数时，第一个参数为组件上一次渲染的子树，
        patch(instance.subTree, subTree, container, anchor);
        updated && updated.call(state);
      }
      // 更新组件实例的子树
      instance.subTree = subTree;
    },
    { scheduler: queueJob } //这里的 queueJob 调度封装
  );
}

function resolveProps(options, propsData) {
  const props = {};
  const attrs = {};
  // 遍历为组件传递的 props 数据
  for (const key in propsData) {
    if (key in options) {
      // 如果 props 数据在组件自身的 props 选项中有定义，则将其视为合法 props
      props[key] = propsData[key];
    } else {
      attrs[key] = propsData[key];
    }
  }

  return [props, attrs];
}
export default mountComponent;

// 下面是 patch 如何引用 mountComponent
function patch(n1, n2, container, anchor) {
  if (n1 && n1.type !== n2.type) {
    unmount(n1);
    n1 = null;
  }

  const { type } = n2;

  if (typeof type === "string") {
    // ...
  } else if (type === "Text") {
    // ...
  } else if (type === Fragment) {
    // ...
  } else if (typeof type === "object") {
    if (!n1) {
      mountComponent(n2, container, anchor);
    } else {
      // 更新组件
      patchComponent(n1, n2, anchor);
    }
  }
}

function patchComponent(n1, n2, anchor) {
  // 获取组件实例，即 n1.component, 同时让新的组件虚拟节点 n2.component 也指向组件实例
  const instance = (n2.component = n1.component);
  const { props } = instance;

  // 调用 hasPropsChanged 监测为子组件传递的 props 是否发生变化，如果没有变化，则不需要更新

  if (hasPropsChanged(n1.props, n2.props)) {
    // 调用 resolveProps 函数重新获取 props 数据
    const [nextProps] = resolveProps(n2.type.props, n2.props);
    // 更新 props
    for (const k in nextProps) {
      props[k] = nextProps[k];
    }
    // 删除不存在的 props
    for (const k in props) {
      if (!(k in nextProps)) delete props[k];
    }
  }
}

function hasPropsChanged(prevProps, nextProps) {
  const nextKeys = Object.keys(nextProps);
  // 如果新旧 props 的数量变了，则说明有变化
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    // 有不相等 props, 则说明有变化
    if (nextProps[key] !== prevProps[key]) {
      return true;
    }
  }
  return false;
}
