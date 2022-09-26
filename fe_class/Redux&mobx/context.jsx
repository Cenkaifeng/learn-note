import { createContext, useContext, useState } from "react";

const Context = createContext();
// 子组件通过 context 拿到上层数据
function Sub() {
  const ctx = useContext(Context); // 也可以使用 Consumer 来获取 context 对象
  return (
    <div>
      {ctx.count}
      <button onClick={ctx.increment}>++</button>
      <button onClick={ctx.decrement}>--</button>
    </div>
  );
}

// 父组件通过 Context.Provider 传递数据到下级、后代组件
export default function Parent() {
  const [count, setCount] = useState(0);
  const value = {
    count,
    increment() {
      setCount(c => c + 1);
    },
    decrement() {
      setCount(c => c - 1);
    },
  };
  return (
    <Context.Provider value={value}>
      <Sub />
    </Context.Provider>
  );
}
/**
 * Context 特点：一般比如组件优化 componentShouldUpdate 检查 props 有没有更新，
 * 但是 Context 不能使用这样的优化手段，必须保证子组件拿到变化之后的值
 */
