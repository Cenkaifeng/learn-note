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

// hash表，记录所有的对象的引用关系
let map = new WeakMap();
const deepCopy = sourceObj => {
  // 如果不是对象则退出（可停止递归）
  if (typeof sourceObj !== "object") return;
  let existobj = null;
  existobj = map.get(sourceObj);
  //如果这个对象已经被记录则直接返回 解决循环引用问题
  if (existobj) {
    return existobj;
  }

  // 深拷贝初始值：对象/数组
  let newObj = sourceObj instanceof Array ? [] : {};

  // 使用 for-in 循环对象属性（包括原型链上的属性）
  for (let key in sourceObj) {
    // 只访问对象自身属性
    if (sourceObj.hasOwnProperty(key)) {
      // 当前属性还未存在于新对象中时
      if (!(key in newObj)) {
        if (sourceObj[key] instanceof Date) {
          // 判断日期类型
          newObj[key] = new Date(sourceObj[key].getTime());
        } else if (sourceObj[key] instanceof RegExp) {
          // 判断正则类型
          newObj[key] = new RegExp(sourceObj[key]);
        } else if (
          typeof sourceObj[key] === "object" &&
          sourceObj[key].nodeType === 1
        ) {
          // 判断 DOM 元素节点
          let domEle = document.getElementsByTagName(
            sourceObj[key].nodeName
          )[0];
          newObj[key] = domEle.cloneNode(true);
        } else {
          // 当元素属于对象（排除 Date、RegExp、DOM）类型时递归拷贝
          newObj[key] =
            typeof sourceObj[key] === "object"
              ? deepCopy(sourceObj[key])
              : sourceObj[key];
        }
      }
    }
  }

  return newObj;
};

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
