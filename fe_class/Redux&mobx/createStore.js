function createStore(reducer) {
  let state;
  const listeners = []; // 订阅事件的数组
  const getState = () => {
    return state;
  };

  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = listener => {
    if (!listeners.includes(listener)) {
      listeners.push(listener);
    }
    return function unsubscribe() {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  dispatch({ type: "@@redux-init@@" });
  // 执行一次业务中不存在的 type, 目的是初始化 state
  return {
    getState,
    dispatch,
    subscribe,
  };
}
