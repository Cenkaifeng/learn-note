function createStore(initState, reducer) {
  let state = initState;
  const listeners = []; // 订阅事件的数组

  const getState = () => {
    return state;
  };

  const dispatch = action => {
    // immutable: 不可改变的，没有改变state 本身而是生成新的state
    // dispatch: 通过 reducer 生成新的 state 作用在界面面上
    const currentState = reducer(state, action);
    state = currentState;
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


// reducer
const myReducer = (data, action) => {
    switch(action.type) {
        case 'INCREMENT':
            // return {...data, data.test + 1};
        //...
    }
}

// combineReducer

export const combineReducer = (reducers) => {
    const keys = Object.keys(reducers)
    return function ( state = {}, action) {
        const nextState = {}
        keys.forEach((key) => {
            const reducer = reducers[key];
            const prev = state[key];
            const next = reducer(prev, action)
            nextState[key] = next
        })

        return nextState
    }
}