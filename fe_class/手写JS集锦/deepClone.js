// 编写一个深度克隆函数，满足以下需求（此题考察面较广，注意细节）

// deepClone 函数测试效果
const objA = {
  name: "jack",
  birthday: new Date(),
  pattern: /jack/g,
  body: document.body,
  others: [123, "coding", new Date(), /abc/gim],
};

const objB = deepClone(objA);
console.log(objA === objB); // 打印 false
console.log(objA, objB); // 对象内容一样

// 解答

// 深拷贝：对对象内部进行深拷贝，支持 Array、Date、RegExp、DOM

// hash表，记录所有的对象的引用关系, 原版是使用 new Map() 但是 WeakMap 的好处是可以自动gc
let map = new WeakMap();

const deepCopy = target => {
  // 如果不是对象则退出（可停止递归）
  if (typeof target !== "object") return;
  let existobj = null;
  existobj = map.get(target);
  //如果这个对象已经被记录则直接返回 解决循环引用问题
  // TODO：考虑到拷贝层级过深，拷贝复杂度上升，可以把拷贝过程提取到空闲时回调
  //递归的过程还需要额外添加一个事件，利用浏览器空闲时间进行递归，
  if (existobj) {
    return existobj;
  }

  // 深拷贝初始值：对象/数组
  let newObj = target instanceof Array ? [] : {};

  // 使用 for-in 循环对象属性（包括原型链上的属性）
  for (let key in target) {
    // 只访问对象自身属性
    if (target.hasOwnProperty(key)) {
      // 当前属性还未存在于新对象中时
      if (!(key in newObj)) {
        if (target[key] instanceof Date) {
          // 判断日期类型
          newObj[key] = new Date(target[key].getTime());
        } else if (target[key] instanceof RegExp) {
          // 判断正则类型
          newObj[key] = new RegExp(target[key]);
        } else if (
          typeof target[key] === "object" &&
          target[key].nodeType === 1
        ) {
          // 判断 DOM 元素节点
          let domEle = document.getElementsByTagName(target[key].nodeName)[0];
          newObj[key] = domEle.cloneNode(true);
        } else {
          // 当元素属于对象（排除 Date、RegExp、DOM）类型时递归拷贝
          newObj[key] =
            typeof target[key] === "object"
              ? deepCopy(target[key])
              : target[key];
        }
      }
    }
  }

  return newObj;
};
// https://juejin.cn/post/7017991655009566728
// 上述链接考虑了 Function Symbol

// demo2
function cloneDeep2(obj) {
  const keys = Object.keys(obj);
  return keys.reduce((memo, current) => {
    const value = obj[current];
    if(typeof value === 'object') {
      return {
        ...memo,
        [current]: cloneDeeps(obj[current])
      };
    }
    return {
      ...memo,
      [current]: obj[current]
    }
  })
}

// 浅拷贝

const user = {
  name: "Jervis",
  info: {
    father: "god",
    age: 26,
    email: "jerivscen2012@gmail.com",
  },
};

const copy = Object.assign({}, user);
copy.info.father = "fd";

console.log("original: ", user.info);
console.log("copy:", copy.info);
// 更新数组浅拷贝
arr.slice();
