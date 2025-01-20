
// 实现个发布订阅

const createStore = function (reducer, initState) {
// reducer 防止我们在处理数据更改的时候副作用比较多
    let state = initState;

    let listeners = []

    // 订阅
    function subscribe(handler) {
        listeners.push(handler)
    }

    // 更新订阅
    function dispatch(action) {
        const currentState = reducer(state, action)

        state = currentState

        listeners.forEach(handler => {
            handler()
        });
    }

    function getState() {
        return state;
    }

    return {
        subscribe,
        dispatch,
        getState
    }
}

// 把多个reducer组合
const combineReducer = (reducers) => {
    const keys = Object.keys(reducers);

    return function (state = {}, action) {
        const nextState = {}

        keys.forEach( key => {
            const reducer = reducers[keys]
            next = reducer(state[key], action)
            nextState[key] = next
        })
    }
}