import { effect } from "./bookDemo.js";
import queueJob from "./jobQueue.js";
function mountComponent(vnode, container, anchor) {
  const componentOptions = vnode.type; // type 是个对象....
  const {
    render,
    data,
    beforeCreate,
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
  } = componentOptions;

  beforeCreate && beforeCreate();
  const state = reactive(data()); // data 数据响应化

  // 定义组件实例，一个组件实例本质上就是一个对象，它包含与组件有关的状态信息
  const instance = {
    // 组件自身的状态数据，即 data
    state,
    // 一个布尔值，用来表示组件是否被挂载，初始值 false
    isMounted: false,
    // 组件所渲染的内容，即子树（subTree)
    subTree: null,
  };

  // 将组件实例设置到 vnode 上，用于后续更细
  vnode.component = instance;
  created && created.call(state); // 在这里调用 created 将 state 的 this 调整
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

export default mountComponent;
