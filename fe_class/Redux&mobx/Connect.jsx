// react-redux 同时导出 Provider 与 connect
import { createContext, useContext, useState } from "react";

const ReduxContext = createContext();

const Provider = ReduxContext.Provider;

const connect =
  (mapStateToProps, mapDispatchToProps) => WrappedComponent => prop => {
    const [, forceUpdate] = useState([]);
    const { store } = useContext(ReduxContext); // 这里的参数一定与 Provider 是同一对象
    store.subscribe(() => forceUpdate([])); // 订阅，用于强制更新组件
    const props = {
      ...mapStateToProps(store.getState()),
      ...mapDispatchToProps(store.dispatch),
      prop: { ...prop },
    };

    return <WrappedComponent {...props} />;
  };

export { Provider, connect };
