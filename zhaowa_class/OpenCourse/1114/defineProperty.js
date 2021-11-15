// 来实现一个响应式函数？ 能对一个对象内的所有key添加响应式特性？

//
const rander = (key, val) => {
  console.log(`SET key=...`);
};

const reactive = obj => {};

const data = {
  a: 1,
  b: 2,
  c: {
    c1: {
      af: 999,
    },
    c2: 4,
  },
};

reactive(data);

data.a = 5; // SET key = 1 val = 5
data.b = 7; // SET key=b val =7
data.c.c2 = 4; //
data.c.c1.af = 121; // SET key =af val =121
